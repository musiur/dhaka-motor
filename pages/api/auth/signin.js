import excuteQuery from '../../../lib/database';

export default async function handler(req, res) {
    try {
        const users = await excuteQuery({
            query: `SELECT * FROM users where username="${req.body.users[0].username}"`,
        });

        if (users.length) {

            if(users[0].password === req.body.users[0].password){
                res.status(200).send({
                    message: 'Users data added!',
                    result: users[0],
                });
            }else{
                res.status(409).send({
                    message: 'Password not matched!',
                });
            }

            
            
        } else {
            res.status(404).send({
                message: 'User not found!',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Something went wrong!',
        });
    }
}
