import express from "express"
import dotenv from "dotenv"
import swaggerui from 'swagger-ui-express'
import swaggerFile from "./config/swagger-output.json" with {type:"json"}
import routerMembers from "./router/member.Router.js"
import { db } from "./db/db.js"
import routerWard from "./router/ward.Router.js"
import routerBooth from "./router/booth.Router.js"
import routerUser from "./router/user.Router.js"
import routerConstituency from "./router/constituency.Router.js";
import districtRouter from "./router/district.router.js";
import routerDistrict from "./router/district.router.js";
import routerPanjayth from "./router/panjayth.router.js";
import routerVillage from "./router/village.Router.js";
import { AuthClass } from "./middleware/auth.middleware.js";
import cors from 'cors'
import routerAdmin from "./router/admin.Router.js";
dotenv.config()
const app = express()
const port = process.env.PORT

db()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/swagger",swaggerui.serve,swaggerui.setup(swaggerFile))
app.use("/member",routerMembers)
app.use("/ward",routerWard)
app.use("/booth",routerBooth)
app.use("/user",routerUser)
app.use("/constituency",routerConstituency)
app.use("/district",routerDistrict)
app.use("/panjayth",routerPanjayth)
app.use('/village',routerVillage)
app.use('/admin',routerAdmin)
app.use("/",express.static("uploads"))


app.listen(port,()=>{
  console.log(`Server is on port http://localhost:${port}`)
})