import express from "express";
import blogsRoute from "./services/blogs/index.js";
import authorsRoute from "./services/authors/index.js";
import db from "./utils/db/sequelize.js"

const { PORT } = process.env || 3001;

const app = express();

app.use(express.json());

app.use("/authors", authorsRoute);
app.use("/blogs", blogsRoute);

db.sequel.sync({force: true}).then(() => {

    app.listen(PORT, () => console.log("server is running on port ", PORT));
    
    app.on("error", (err) => console.log("server is not running ", err));

}).catch((e) => {
    console.log(e)
})    

