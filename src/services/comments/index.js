import { Router } from "express";
// import query from "../../utils/db/index.js";
import models from "../../db/sequelize.js"

const Comment = models.Comment

const route = Router();

route.get("/", async (req, res, next) => {
  
  try {
    const data = await Comment.findAll({include: models.Author})

    data.length > 0 ? res.send(data) : res.send("No Data available!")

  } catch (error) {
    console.log(error)
  }
});

route.get("/:id", async (req, res, next) => {
  
  try {
    const data = await Comment.findByPk(req.params.id)
    data ? res.send(data) : res.send("Comment not found, check ID!") 

  } catch (error) {
    console.log(error)
  }
});

route.put("/:id", async (req, res, next) => {
  
  try {
    const data = await Comment.update(req.body, {
      where: {id: req.params.id},
      returning: true
     })

   
     res.send(data[1][0]);
  } catch (error) {
    console.log(error)
  }
});

route.post("/", async (req, res, next) => {

  try {
    const data = await Comment.create(req.body)

    data ? res.send(data) : res.send("Creating Comment failed, try again!")
    
  } catch (error) {
    console.log(error)
  }
});

route.delete("/:id", async (req, res, next) => {
 
  try {
    const data = await Comment.destroy({
      where: {id: req.params.id}
    })
    
    data > 0 ? res.send("Deleted successfully") : res.send("")
    
  } catch (error) {
    console.log(error)
  }
});
export default route;
