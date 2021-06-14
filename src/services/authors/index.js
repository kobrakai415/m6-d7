import { Router } from "express";
// import query from "../../utils/db/index.js";
import models from "../../db/sequelize.js"

const Author = models.Author
const Blog = models.Blog
const Comment = models.Comment

const route = Router();

route.get("/", async (req, res, next) => {
  // try {
  //   const dbResponse = await query(
  //     "SELECT * FROM authors ORDER BY created_at DESC"
  //   );
  //   res.send(dbResponse);
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
  try {
    const data = await Author.findAll({include: [Blog, {model: Comment, include: Blog} ]});
    data.length > 0 ? res.send(data) : res.send("No Data available!")
  } catch (e) {
    console.log(e);
  }

});

route.get("/blogs", async (req, res, next) => {
  try {
    const data = await Author.findAll({
      include: 
        {model: Blog}
      
    })

    res.send(data)
  } catch (error) {
    console.log(error)
  }

})

route.get("/:id", async (req, res, next) => {
  // try {
  //   const dbResponse = await query(
  //     `SELECT * FROM authors WHERE id=${req.params.id}`
  //   );
  //   res
  //     .status(dbResponse ? 200 : 404)
  //     .send(dbResponse ? dbResponse : { error: "author not found" });
  // } catch (error) {
  //   res.status(500).send({ error });
  // }

  try {
    const data = await Author.findByPk(req.params.id);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

route.put("/:id", async (req, res, next) => {
  // try {
  //   const { name, surname, avatar, email } = req.body;
  //   const dbResponse = await query(
  //     `UPDATE authors SET name='${name}',surname='${surname}', avatar='${avatar}', email='${email}' WHERE id=${req.params.id} RETURNING *`
  //   );
  //   res.send(dbResponse);
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
  try {
    const data = await Author.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.send(data[1][0]);
  } catch (e) {
    console.log(e);
  }
});

route.post("/", async (req, res, next) => {
  // try {
  //   const { name, surname, avatar, email } = req.body;
  //   const dbResponse = await query(
  //     `INSERT INTO authors (name,surname,avatar,email) VALUES('${name}', '${surname}', '${avatar}', '${email}') RETURNING *`
  //   );
  //   res.send(dbResponse);
  // } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }

  try {
    const data = await Author.create(req.body)
    data ? res.send(data) : res.send("Error creating author, try again!")
  } catch (e) {
    console.log(e);
  }

});

route.delete("/:id", async (req, res, next) => {
  // try {
  //   const dbResponse = await query(
  //     `DELETE FROM authors WHERE id=${req.params.id}`
  //   );
  //   res.send(dbResponse);
  // } catch (error) {
  //   res.status(500).send({ error });
  // }
  try {
    const data = await Author.destroy({where: {id: req.params.id}})
    data > 0 ? res.send("deleted successfully!") : res.send("Not found, check your ID!")
  } catch (error) {
    console.log(error)
  }  
});
export default route;
