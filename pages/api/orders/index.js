import excuteQuery from "../../../lib/database";

export default async function handler(req, res) {
  console.log(req.query.username);
  try {
    if (!req.query.username) {
      res.status(401).send({
        message: "Bad request!",
      });
    } else {
      const result = await excuteQuery({
        query: "SELECT * FROM `orders`",
      });

      res.status(200).send({
        message: "Orders data fetched!",
        result,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
}