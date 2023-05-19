import excuteQuery from "../../../lib/database";

export default async function handler(req, res) {
  console.log(req.query.username);
  try {
    if (!req.query.username) {
      res.status(401).send({
        message: "You are not authorized!",
      });
    } else {
      const result = await excuteQuery({
        query: "SELECT * FROM `users`",
      });

      res.status(200).send({
        message: "Users data fetched!",
        result,
      });
    }
  } catch (error) {
    res.status(200).send({
      message: "Something went wrong!",
    });
  }
}