// DELETE FROM table_name WHERE condition;

import excuteQuery from "../../../lib/database";

export default async function handler(req, res) {
  try {
    if (!req.query.username) {
      res.status(401).send({
        message: "You are not authorized!",
      });
    } else {
      let query = `DELETE FROM orders WHERE id=${req.query.id}`;
      const result = await excuteQuery({
        query
      });

      res.status(200).send({
        message: "Order data deleted!",
        result,
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
}