import express from "express";
const app = express();

import cors from 'cors';
import morgan from "morgan";
import habits from "../routes/habits";
import days from "../routes/days";
import helmet from "helmet";

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use("/habit", habits);
app.use("/day", days);


app.all("*", (req: express.Request, res: express.Response) => {
    res.status(404);
    res.send("<h1>ERROR 404: Page not found.</h1><h4>return to <a href='/'>homepage</a></h4>");
})

app.listen(5000, () => {
    console.log("app running on port 5000, link:\nhttp://localhost:5000");
})