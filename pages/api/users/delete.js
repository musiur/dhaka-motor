// DELETE FROM table_name WHERE condition;

import excuteQuery from "../../../lib/database";

export default async function handler(req, res) {
  try {
    if (!req.query.username) {
      res.status(401).send({
        message: "Bad request!",
      });
    } else {
      let query = `DELETE FROM users WHERE username="${req.query.username}"`;
      const result = await excuteQuery({
        query
      });

      res.status(200).send({
        message: "Users data deleted!",
        result,
      });
    }
  } catch (error) {
    console.log(error)
    res.status(200).send({
      message: "Something went wrong!",
    });
  }
}