import express from "express";
import blogsRoute from "./services/blogs/index.js";
import authorsRoute from "./services/authors/index.js";
import commentsRoute from "./services/comments/index.js"
import categoriesRoute from "./services/category/index.js"
import db from "./db/sequelize.js"

const { PORT } = process.env || 3001;

const app = express();

app.use(express.json());

app.use("/authors", authorsRoute);
app.use("/blogs", blogsRoute);
app.use("/comments", commentsRoute);
app.use("/categories", categoriesRoute);

db.sequel.sync({force: false}).then(() => {

    app.listen(PORT, () => console.log("server is running on port ", PORT));
    
    app.on("error", (err) => console.log("server is not running ", err));

}).catch((e) => {
    console.log(e)
})    

