import express from 'express';
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connecDB from "./config/connectDB";
import cors from 'cors';



require('dotenv').config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000', // cho phép nguồn gốc cụ thể
    credentials: true, // cho phép gửi cookie
};
app.use(cors(corsOptions));
app.use(express.json());

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

connecDB();

let port = process.env.PORT || 8686;
//pORT == underfined => port =6969
app.listen(port, () => {
    //callback
    console.log("Backend nodejs is runing on the port :" + port);
})