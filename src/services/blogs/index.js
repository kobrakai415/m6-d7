import { Router } from "express";
// import query from "../../utils/db/index.js";
import models from "../../db/sequelize.js"

const Blog = models.Blog
const BlogCategory = models.BlogCategory

const route = Router();

route.post("/:blogId/addCategory/:categoryId", async (req, res, next) => {

  try {
    const data = await BlogCategory.create({ ...req.body, blogId: req.params.blogId, categoryId: req.params.categoryId })

    data ? res.send(data) : res.send("Creating blog failed, try again!")

  } catch (error) {
    console.log(error)
  }
});

route.get("/", async (req, res, next) => {
  // try {
  //   const dbResponse = await query(
  //     `SELECT blog.author,blog.title,author.name,author.surname,author.avatar,author.id,author.email FROM blogs as blog INNER JOIN authors as author ON blog.author=author.id;  `
  //   );
  //   res.send(dbResponse);
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
  try {
    const data = await Blog.findAll({
      where: {},
      attributes: { exclude: ["createdAt", "updatedAt", "authorId"] },
      include: [
        { model: models.Author, attributes: { exclude: ["createdAt", "updatedAt"] } },
        { model: models.Comment, attributes: { exclude: ["createdAt", "updatedAt", "authorId", "blogId"] }, include: [{ model: models.Author, attributes: { exclude: ["createdAt", "updatedAt", "authorId"] } }] },
        { model: models.Category, attributes: {exclude: ["createdAt", "updatedAt"]} ,through: { attributes: [] }  }
      ]
    })

    data.length > 0 ? res.send(data) : res.send("No Data available!")

  } catch (error) {
    console.log(error)
  }
});

route.get("/:id", async (req, res, next) => {
  // try {
  //   const dbResponse = await query(
  //     `SELECT * FROM blogs WHERE id=${req.params.id}`
  //   );
  //   res
  //     .status(dbResponse ? 200 : 404)
  //     .send(dbResponse ? dbResponse : { error: "blog not found" });
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
  try {
    const data = await Blog.findByPk(req.params.id)
    res.send(data)

  } catch (error) {
    console.log(error)
  }
});

route.put("/:id", async (req, res, next) => {
  // try {
  //   const { title, category, cover, author, content, read_time_value, read_time_unit } = req.body;
  //   const dbResponse = await query(
  //     `UPDATE blogs SET title='${title}',category='${category}', cover='${cover}', author=${author}, content='${content}', read_time_value=${read_time_value}, read_time_unit='${read_time_unit}' WHERE id=${req.params.id} RETURNING *`
  //   );
  //   res.send(dbResponse);
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
  try {
    const data = await Blog.update(req.body, {
      where: { id: req.params.id },
      returning: true
    })


    res.send(data[1][0]);
  } catch (error) {
    console.log(error)
  }
});

route.post("/", async (req, res, next) => {
  // try {
  //   const { title, category, cover, author, content, read_time_value, read_time_unit } = req.body;
  //   const dbResponse = await query(
  //     `INSERT INTO blogs (title,category,cover,author,content,read_time_value,read_time_unit) VALUES('${title}', '${category}', '${cover}', ${author}, '${content}', ${read_time_value}, '${read_time_unit}') RETURNING *`
  //   );
  //   res.send(dbResponse);
  // } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }
  try {
    const data = await Blog.create(req.body)

    data ? res.send(data) : res.send("Creating blog failed, try again!")

  } catch (error) {
    console.log(error)
  }
});

route.delete("/:id", async (req, res, next) => {
  // try {
  //   const dbResponse = await query(
  //     `DELETE FROM blogs WHERE id=${req.params.id}`
  //   );
  //   res.send(dbResponse);
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
  try {
    const data = await Blog.destroy({
      where: { id: req.params.id }
    })

    data > 0 ? res.send("Deleted successfully") : res.send("")

  } catch (error) {
    console.log(error)
  }
});
export default route;
