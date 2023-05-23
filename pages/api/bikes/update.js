import excuteQuery from '../../../lib/database';

export default async function handler(req, res) {
    try {
        if (!req.body.id) {
            res.status(401).send({
                message: 'You are not authorized!',
            });
        } else {
            let query = `UPDATE bikes set id = ${req.body.id},description = "${req.body.description}",warranty = ${req.body.warranty},name = "${req.body.name}",images = "${req.body.images}",price = ${req.body.price},thumbnail = "${req.body.thumbnail}" where id=${req.body.id}`;
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
