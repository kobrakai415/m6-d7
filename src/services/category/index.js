import { Router } from "express";
// import query from "../../utils/db/index.js";
import models from "../../db/sequelize.js"

const Category = models.Category

const route = Router();

route.get("/", async (req, res, next) => {
  
  try {
    const data = await Category.findAll()

    data.length > 0 ? res.send(data) : res.send("No Data available!")

  } catch (error) {
    console.log(error)
  }
});

route.get("/:id", async (req, res, next) => {
  
  try {
    const data = await Category.findByPk(req.params.id)
    res.send(data) 

  } catch (error) {
    console.log(error)
  }
});

route.put("/:id", async (req, res, next) => {
  
  try {
    const data = await Category.update(req.body, {
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
    const data = await Category.create(req.body)

    data ? res.send(data) : res.send("Creating Category failed, try again!")
    
  } catch (error) {
    console.log(error)
  }
});

route.post("/:id/", async (req, res, next) => {

  try {
    const data = await Category.create(req.body)

    data ? res.send(data) : res.send("Creating Category failed, try again!")
    
  } catch (error) {
    console.log(error)
  }
});


route.delete("/:id", async (req, res, next) => {
 
  try {
    const data = await Category.destroy({
      where: {id: req.params.id}
    })
    
    data > 0 ? res.send("Deleted successfully") : res.send("")
    
  } catch (error) {
    console.log(error)
  }
});
export default route;
