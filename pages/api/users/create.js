import excuteQuery from '../../../lib/database';

export default async function handler(req, res) {
    try {
        const values = [...req.body.users.map((item) => Object.values(item))];
        console.log(values);
        let query = `INSERT INTO users VALUES ?;`;
        const result = await excuteQuery({
            query,
            values: [values],
        });

        res.status(200).send({
            message: 'Users data added!',
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(200).send({
            message: 'Something went wrong!',
        });
    }
}
