import { Router } from "express";

import query from "../../utils/db/index.js";

const route = Router();

route.get("/", async (req, res, next) => {
  try {
    const dbResponse = await query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const dbResponse = await query(
      `SELECT * FROM blogs WHERE id=${req.params.id}`
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
    const { title, category, cover, author, content, read_time_value, read_time_unit } = req.body;
    const dbResponse = await query(
      `UPDATE blogs SET title='${title}',category='${category}', cover='${cover}', author=${author}, content='${content}', read_time_value=${read_time_value}, read_time_unit='${read_time_unit}' WHERE id=${req.params.id} RETURNING *`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});

route.post("/", async (req, res, next) => {
  try {
    const { title, category, cover, author, content, read_time_value, read_time_unit } = req.body;
    const dbResponse = await query(
      `INSERT INTO blogs (title,category,cover,author,content,read_time_value,read_time_unit) VALUES('${title}', '${category}', '${cover}', ${author}, content='${content}', read_time_value=${read_time_value}, read_time_unit='${read_time_unit}') RETURNING *`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const dbResponse = await query(
      `DELETE FROM blogs WHERE id=${req.params.id}`
    );
    res.send(dbResponse);
  } catch (error) {
    res.status(500).send({ error });
  }
});
export default route;
