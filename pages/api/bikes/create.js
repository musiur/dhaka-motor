import excuteQuery from "../../../lib/database";

export default async function handler(req, res) {
  try {
    if (!req.body.username) {
      res.status(401).send({
        message: "You are not authorized!",
      });
    } else {
      const values = [...req.body.bikes.map((item) => Object.values(item))];
      let query = `INSERT INTO bikes VALUES ?;`;
      const result = await excuteQuery({
        query, values: [values]
      });

      res.status(200).send({
        message: "Bike data added!",
        result,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
}