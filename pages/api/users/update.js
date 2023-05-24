import excuteQuery from '../../../lib/database';

export default async function handler(req, res) {
    try {
        if (!req.body.username) {
            res.status(401).send({
                message: 'Bad request!',
            });
        } else {
            let query = `UPDATE users set username = "${req.body.username}",password = "${req.body.password}", mobile = "${req.body.mobile}",email = "${req.body.email}",address = "${req.body.address}",role = "${req.body.role}",image = "${req.body.image}",date = "${req.body.date}" where username = "${req.body.username}"`;

            const result = await excuteQuery({
                query,
            });

            res.status(200).send({
                message: 'Users data updated!',
                result,
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Something went wrong!',
        });
    }
}
