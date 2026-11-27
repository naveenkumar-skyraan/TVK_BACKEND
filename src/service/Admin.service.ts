import mongoose, { Schema } from "mongoose";
import { ResponseBuilder, type ResponseFormate } from "../helper/ResponseFormate.js";
import constituencySchema from "../model/constituency.schema.js";
import districtSchema from "../model/district.schema.js";
import membersSchema, { InactiveSchema } from "../model/members.schema.js";
import panjayathSchema from "../model/panjayath.schema.js";
import villageSchema from "../model/village.schema.js";
import { WardSchema } from "../model/ward.schema.js";
import { BoothSchema } from "../model/booth.schema.js";
import { EducationQualificationSchema } from "../model/educationqualification.schema.js";
import { WorkSchema } from "../model/work.schema.js";
import { ReligionSchema } from "../model/religion.schema.js";
import { CasteSchema } from "../model/caste.schema.js";
import { UserSchema } from "../model/user.schema.js";

export class AdminService{

//  async dristricList():Promise<ResponseFormate>{
//         try {
//             const data = await districtSchema.find()
//             if(!data){
//                 return ResponseBuilder.Success(0,"No Data Found",[])
//             }
//             return ResponseBuilder.Success(1,"The Panjayth list",data)
//         } catch (error:any) {
//             return ResponseBuilder.Failure(0,"Error in Service layer",[error.message])
//         }
// }
// async constituencyList(dristricId?: string): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         if (dristricId) {
//             if (!mongoose.Types.ObjectId.isValid(dristricId)) {
//                 return ResponseBuilder.Success(0,"Invalid District ID",[]);
//             }

//             query.districtId = new mongoose.Types.ObjectId(dristricId);
//         }

//         const data = await constituencySchema.find(query);
//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Constituency Found",[]);
//         }
//         return ResponseBuilder.Success(1,"The Constituency list",data);
//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async panjaythList(constituencyId?: string): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         if (constituencyId) {
//             if (!mongoose.Types.ObjectId.isValid(constituencyId)) {
//                 return ResponseBuilder.Success(0,"Invalid Constituency ID",[]);
//             }

//             query.constituencyId = new mongoose.Types.ObjectId(constituencyId);
//         }

//         const data = await panjayathSchema.find(query);

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Panjayth Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Panjayth list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async villageList(panjaythId?: string): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         if (panjaythId) {
//             if (!mongoose.Types.ObjectId.isValid(panjaythId)) {
//                 return ResponseBuilder.Success(0,"Invalid Panjayth ID",[]);
//             }

//             query.panjaythId = new mongoose.Types.ObjectId(panjaythId);
//         }

//         const data = await villageSchema.find(query);

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Village Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Village list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async memberList(page: number = 1,limit: number = 10): Promise<any> {
//     try {
//         page = Number(page);
//         limit = Number(limit);

//         const skip = (page - 1) * limit;

//         const [data, total] = await Promise.all([
//             membersSchema
//                 .find()
//                 .skip(skip)
//                 .limit(limit),

//             membersSchema.countDocuments()
//         ]);

//         const totalPages = Math.ceil(total / limit);
//         const hasNext = page < totalPages;

//         if (data.length === 0) {
//             return {
//                 status: 0,
//                 message: "No Data Found",
//                 total,
//                 page,
//                 limit,
//                 totalPages,
//                 hasNext: false,
//                 data: []
//             };
//         }

//         return {
//             status: 1,
//             message: "The Member list",
//             total,
//             page,
//             limit,
//             totalPages,
//             hasNext,
//             data
//         };

//     } catch (error: any) {
//         return {
//             status: 0,
//             message: "Error in Service layer",
//             data: [error.message]
//         };
//     }
// }
// async wardList(villageId?: string): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         if (villageId) {
//             if (!mongoose.Types.ObjectId.isValid(villageId)) {
//                 return ResponseBuilder.Success(0,"Invalid Village ID",[]);
//             }

//             query.villageId = new mongoose.Types.ObjectId(villageId);
//         }

//         const data = await WardSchema.find(query);

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Ward Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Ward list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async boothList(wardId?: string): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };
//         // wardId வந்தால் மட்டும் filter
//         if (wardId) {
//             if (!mongoose.Types.ObjectId.isValid(wardId)) {
//                 return ResponseBuilder.Success(0,"Invalid Ward ID",[]);
//             }

//             query.wardId = new mongoose.Types.ObjectId(wardId);
//         }

//         const data = await BoothSchema.find(query);

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Booth Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Booth list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async educationList(): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         const data = await EducationQualificationSchema.find();

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Education Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Education list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async workList(): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         const data = await WorkSchema.find();

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Education Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Education list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async religionList(): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         const data = await ReligionSchema.find();

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Education Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Education list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async castList(): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         const data = await CasteSchema.find();

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Education Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Education list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }
// async inactiveList(): Promise<ResponseFormate> {
//     try {
//         const query: any = {
//             s_delete: 0
//         };

//         const data = await InactiveSchema.find();

//         if (data.length === 0) {
//             return ResponseBuilder.Success(0,"No Education Found",[]);
//         }

//         return ResponseBuilder.Success(1,"The Education list",data);

//     } catch (error: any) {
//         return ResponseBuilder.Failure(0,"Error in Service layer",[error.message]);
//     }
// }



async dristricList(search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query: any = {
            s_delete: 0
        };

        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        const [data, total] = await Promise.all([
            districtSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            districtSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No District Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The District list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async constituencyList(districtId?: string,search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query: any = {
            s_delete: 0
        };

        if (districtId) {
            if (!mongoose.Types.ObjectId.isValid(districtId)) {
                return ResponseBuilder.Success(
                    0,
                    "Invalid District ID",
                    []
                );
            }

            query.districtId =
                new mongoose.Types.ObjectId(districtId);
        }

        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        const [data, total] = await Promise.all([
            constituencySchema
                .find(query)
                .skip(offset)
                .limit(limit),

            constituencySchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Constituency Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Constituency list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async panjaythList(constituencyId?: string,search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query: any = {
            s_delete: 0
        };

        if (constituencyId) {
            if (!mongoose.Types.ObjectId.isValid(constituencyId)) {
                return ResponseBuilder.Success(
                    0,
                    "Invalid Constituency ID",
                    []
                );
            }

            query.constituencyId =
                new mongoose.Types.ObjectId(constituencyId);
        }

        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        const [data, total] = await Promise.all([
            panjayathSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            panjayathSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Panjayth Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Panjayth list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async villageList(panjaythId?: string,search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query: any = {
            s_delete: 0
        };

        if (panjaythId) {
            if (!mongoose.Types.ObjectId.isValid(panjaythId)) {
                return ResponseBuilder.Success(
                    0,
                    "Invalid Panjayth ID",
                    []
                );
            }

            query.panjaythId =
                new mongoose.Types.ObjectId(panjaythId);
        }

        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        const [data, total] = await Promise.all([
            villageSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            villageSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Village Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Village list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async memberList(limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query = {
            s_delete: 0
        };

        const [data, total] = await Promise.all([
            membersSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            membersSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Member Found",
                [{
                    total,
                    limit,
                    offset,
                    data: []
                }]
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Member list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async wardList(villageId?: string,search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query: any = {
            s_delete: 0
        };

        if (villageId) {
            if (!mongoose.Types.ObjectId.isValid(villageId)) {
                return ResponseBuilder.Success(
                    0,
                    "Invalid Village ID",
                    []
                );
            }

            query.villageId =
                new mongoose.Types.ObjectId(villageId);
        }

        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        const [data, total] = await Promise.all([
            WardSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            WardSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Ward Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Ward list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}

async boothList(wardId?: string,search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query: any = {
            s_delete: 0
        };

        if (wardId) {
            if (!mongoose.Types.ObjectId.isValid(wardId)) {
                return ResponseBuilder.Success(
                    0,
                    "Invalid Ward ID",
                    []
                );
            }

            query.wardId =
                new mongoose.Types.ObjectId(wardId);
        }

        if (search) {
            query.$or = [
                {
                    boothNumber: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    boothName: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    boothLocation: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const [data, total] = await Promise.all([
            BoothSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            BoothSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Booth Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Booth list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async educationList(search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query:any = {
            s_delete: 0
        };


        if (search) {
    query.name = {
        $regex: search,
        $options: "i"
    };
}
        const [data, total] = await Promise.all([
            EducationQualificationSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            EducationQualificationSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Education Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Education list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async workList(search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query:any = {
            s_delete: 0
        };
        if (search) {
    query.name = {
        $regex: search,
        $options: "i"
    };
}

        const [data, total] = await Promise.all([
            WorkSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            WorkSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Work Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Work list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async religionList(search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query:any = {
            s_delete: 0
        };

        if (search) {
    query.name = {
        $regex: search,
        $options: "i"
    };
}
        const [data, total] = await Promise.all([
            ReligionSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            ReligionSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Religion Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Religion list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async castCursorList(
    searchTerm: string = "",
    cursor?: string,
    limit: number = 10,
): Promise<ResponseFormate> {
    try {
        // Dropdown requests are intentionally capped at 10 records per call.
        const pageLimit = Math.min(
            Math.max(Math.trunc(Number(limit) || 10), 1),
            10,
        );

        const query: any = {
            s_delete: 0,
        };

        const normalizedSearch = String(searchTerm ?? "")
            .trim()
            .normalize("NFKC")
            .replace(/\s+/g, " ");

        if (normalizedSearch) {
            const escapedSearch = normalizedSearch.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&",
            );

            const normalizedEscapedSearch = normalizedSearch
                .toLowerCase()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            // Search is applied to the complete active caste collection BEFORE pagination.
            query.$or = [
                { name: { $regex: escapedSearch, $options: "i" } },
                { normalizedName: { $regex: normalizedEscapedSearch, $options: "i" } },
                { referenceId: { $regex: escapedSearch, $options: "i" } },
            ];
        }

        if (cursor) {
            if (!mongoose.Types.ObjectId.isValid(cursor)) {
                return ResponseBuilder.Failure(0, "Invalid caste cursor", []);
            }

            query._id = {
                $gt: new mongoose.Types.ObjectId(cursor),
            };
        }

        // Fetch one extra record to determine whether another page exists.
        // No countDocuments query is issued for dropdown searches.
        const records = await CasteSchema.find(query)
            .select("_id name normalizedName referenceId")
            .sort({ _id: 1 })
            .limit(pageLimit + 1)
            .lean();

        const hasMore = records.length > pageLimit;
        const items = hasMore ? records.slice(0, pageLimit) : records;
        const nextCursor = hasMore && items.length
            ? items[items.length - 1]._id.toString()
            : null;

        return ResponseBuilder.Success(
            1,
            items.length ? "The Caste list" : "No Caste Found",
            [
                {
                    limit: pageLimit,
                    searchTerm: normalizedSearch,
                    nextCursor,
                    hasMore,
                    data: items,
                },
            ],
        );
    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message],
        );
    }
}

async castList(search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query:any = {
            s_delete: 0
        };

        if (search) {
    query.name = {
        $regex: search,
        $options: "i"
    };
}
        const [data, total] = await Promise.all([
            CasteSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            CasteSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Caste Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Caste list",
           [ {
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


async inactiveList(search?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query:any = {
            s_delete: 0
        };
        if (search) {
    query.name = {
        $regex: search,
        $options: "i"
    };
}

        const [data, total] = await Promise.all([
            InactiveSchema
                .find(query)
                .skip(offset)
                .limit(limit),

            InactiveSchema.countDocuments(query)
        ]);

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Inactive Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The Inactive list",
            [{
                total,
                limit,
                offset,
                data
            }]
        );

    } catch (error: any) {
        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}

async getUser(search?: string,role?: string,limit: number = 10,offset: number = 0): Promise<ResponseFormate> {
    try {
        limit = Number(limit);
        offset = Number(offset);

        const query: any = {
            s_delete: 0
        };

        // Search filter
        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Role filter
        if (role === "Admin") {
            query.role = "Admin";
        } else if (role === "User") {
            query.role = "User";
        }

        const [data, total] = await Promise.all([
            UserSchema
                .find(query)
                .select("mobile name role userRole image panjaythIds accountAccessPrivilege accountAccessModule ")
                .skip(offset)
                .limit(limit)
                .lean(),

            UserSchema.countDocuments(query)
        ]);

        const formattedData = data.map(user => ({
            ...user,
            panjaythIds: user.panjaythIds?.map(id => id.toString()).join(",") || ""
        }));

        if (data.length === 0) {
            return ResponseBuilder.Success(
                0,
                "No Users Found",
                []
            );
        }

        return ResponseBuilder.Success(
            1,
            "The User list",
            [{
                total,
                limit,
                offset,
                data: formattedData
            }]
        );

    } catch (error: any) {
        console.error("Get users error:", error);

        return ResponseBuilder.Failure(
            0,
            "Error in Service layer",
            [error.message]
        );
    }
}


}
    /*
    district
    constituency
    panjayth
    village
    memberlist
    ward
    booth
    education
    work
    religion
    cast
    inactive 
     */


