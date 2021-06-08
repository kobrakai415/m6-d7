import { Router } from "express";
import query from "../../utils/db/index.js";

const route = Router();

route.get("/", async (req, res, next) => {
  try {
    const dbResponse = await query(
      "SELECT * FROM authors ORDER BY created_at DESC"
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const dbResponse = await query(
      `SELECT * FROM authors WHERE id=${req.params.id}`
    );
    res
      .status(dbResponse ? 200 : 404)
      .send(dbResponse ? dbResponse : { error: "student not found" });
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const { name, surname, avatar, email, DOB } = req.body;
    const dbResponse = await query(
      `UPDATE authors SET name='${name}',surname='${surname}', avatar='${avatar}', email='${email}', DOB='${DOB}' WHERE id=${req.params.id} RETURNING *`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.post("/", async (req, res, next) => {
  try {
    const { name, surname, avatar, email, DOB } = req.body;
    const dbResponse = await query(
      `INSERT INTO authors (name,surname,avatar,email,DOB) VALUES('${name}', '${surname}', '${avatar}', '${email}'. DOB='${DOB}') RETURNING *`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error: error.messemail });
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const dbResponse = await query(
      `DELETE FROM authors WHERE id=${req.params.id}`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});
export default route;
