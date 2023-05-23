import excuteQuery from "../../../lib/database";

export default async function handler(req, res) {
  try {
    if (!req.body.username) {
      res.status(401).send({
        message: "You are not authorized!",
      });
    } else {
      const values = [...Object.values(req.body)];
      console.log(values);
      let query = `UPDATE orders set payment = "${req.body.payment}",id = ${req.body.id},username = "${req.body.username}",price = ${req.body.price},date = "${req.body.date}",bikes = "${req.body.bikes}" where id = ${req.body.id}`;
      const result = await excuteQuery({
        query,
      });

      res.status(200).send({
        message: "Orders data updated!",
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