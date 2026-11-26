import { createRequire } from "node:module";
import { ResponseBuilder, type ResponseFormate } from "../helper/ResponseFormate.js";
import { CasteSchema } from "../model/caste.schema.js";

const require = createRequire(import.meta.url);

type CasteUploadEntry = {
  name: string;
  normalizedName: string;
  referenceId: string;
};

const normalizeHeader = (value: unknown): string =>
  String(value ?? "").replace(/^\uFEFF/, "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");

const normalizeName = (value: string): string =>
  value.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();

const parseCsv = (content: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let insideQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index];

    if (character === '"') {
      if (insideQuotes && content[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (character === "," && !insideQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !insideQuotes) {
      if (character === "\r" && content[index + 1] === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += character;
  }

  if (insideQuotes) throw new Error("The CSV file contains an unclosed quoted value");
  row.push(value);
  if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  return rows;
};

const readRows = (buffer: Buffer, extension: string): unknown[][] => {
  if (extension === ".csv") {
    const content = buffer.toString("utf8").replace(/^\uFEFF/, "");
    return parseCsv(content);
  }

  let xlsx: any;
  try {
    xlsx = require("xlsx");
  } catch {
    throw new Error("Excel upload requires the xlsx package. Run npm install xlsx and restart the API.");
  }

  const workbook = xlsx.read(buffer, { type: "buffer", cellDates: false });
  const firstSheetName = workbook.SheetNames?.[0];
  if (!firstSheetName) throw new Error("The Excel file does not contain a worksheet");

  return xlsx.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
    header: 1,
    raw: false,
    defval: "",
  }) as unknown[][];
};

const extractUploadRows = (rows: unknown[][]): {
  entries: CasteUploadEntry[];
  totalRows: number;
  skippedBlankRows: number;
} => {
  if (rows.length < 2) {
    throw new Error("The upload file must contain a header row and at least one caste row");
  }

  const headers = rows[0].map(normalizeHeader);
  const referenceIdIndex = headers.findIndex((header) => ["referenceid", "id", "sourceid"].includes(header));
  const casteNameIndex = headers.findIndex((header) => ["castename", "caste", "name"].includes(header));

  if (referenceIdIndex === -1 || casteNameIndex === -1) {
    throw new Error("The file must contain ID/referenceId and CASTE NAME/casteName columns");
  }

  const entries: CasteUploadEntry[] = [];
  const invalidRows: string[] = [];
  let totalRows = 0;
  let skippedBlankRows = 0;

  for (let index = 1; index < rows.length; index += 1) {
    const row = rows[index] ?? [];
    const referenceId = String(row[referenceIdIndex] ?? "").trim();
    const casteName = String(row[casteNameIndex] ?? "").normalize("NFKC").trim().replace(/\s+/g, " ");

    if (!referenceId && !casteName) {
      skippedBlankRows += 1;
      continue;
    }

    totalRows += 1;

    if (!referenceId || !casteName) {
      invalidRows.push(`Row ${index + 1}: ID/referenceId and caste name are both required`);
      continue;
    }

    if (referenceId.length > 50) {
      invalidRows.push(`Row ${index + 1}: ID/referenceId cannot exceed 50 characters`);
      continue;
    }

    entries.push({
      name: casteName,
      normalizedName: normalizeName(casteName),
      referenceId,
    });
  }

  if (invalidRows.length) {
    throw new Error(`The file contains ${invalidRows.length} invalid row(s): ${invalidRows.slice(0, 20).join("; ")}`);
  }

  if (!entries.length) throw new Error("No valid caste records were found in the file");

  return {
    entries,
    totalRows,
    skippedBlankRows,
  };
};

export class CasteBulkUploadService {
  async bulkUpload(buffer: Buffer, originalName: string): Promise<ResponseFormate> {
    try {
      const extension = originalName.toLowerCase().match(/\.(csv|xlsx|xls)$/)?.[0];
      if (!extension) return ResponseBuilder.Failure(0, "Unsupported file format", []);

      const rows = readRows(buffer, extension);
      const parsed = extractUploadRows(rows);

      // Every valid input row is inserted as a separate caste record.
      // Repeated caste names and repeated reference IDs are intentionally allowed.
      const insertedCastes = await CasteSchema.insertMany(
        parsed.entries.map((entry) => ({
          name: entry.name,
          normalizedName: entry.normalizedName,
          referenceId: entry.referenceId,
          s_delete: 0,
        })),
      );

      return ResponseBuilder.Success(1, "Caste file uploaded successfully", [{
        totalRows: parsed.totalRows,
        uploadedRows: insertedCastes.length,
        inserted: insertedCastes.length,
        blankRowsSkipped: parsed.skippedBlankRows,
      }]);
    } catch (error: any) {
      return ResponseBuilder.Failure(0, error.message || "Caste bulk upload failed", []);
    }
  }
}
