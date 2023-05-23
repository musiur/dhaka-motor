import excuteQuery from "../../../lib/database";

export default async function handler(req, res) {
  try {
    const values = [...req.body.orders.map((item) => Object.values(item))];
    let query = `INSERT INTO orders VALUES ?;`;
    const result = await excuteQuery({
      query, values: [values]
    });
    
    res.status(200).send({
      message: "Orders data added!",
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong!",
    });
  }
}