import excuteQuery from '../../../lib/database';

export default async function handler(req, res) {
    try {
        const users = await excuteQuery({
            query: `SELECT * FROM users where username="${req.body.users[0].username}"`,
        });

        if (!users.length) {
            const values = [
                ...req.body.users.map((item) => Object.values(item)),
            ];

            let query = `INSERT INTO users VALUES ?;`;
            const result = await excuteQuery({
                query,
                values: [values],
            });

            res.status(200).send({
                message: 'Users data added!',
                result,
            });
        } else {
            res.status(409).send({
                message: 'User already exists!',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Something went wrong!',
        });
    }
}
