import ButtonG from '@/components/ButtonG';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import { Input } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';

const ResetPassword = () => {
    const { setUser } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const { setMessage } = useContext(MessageContext);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState(formData);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleOnSubmit = () => {
        setErrors(validator(formData));
    };

    const validator = (data) => {
        let obj = {};
        if (!data.username.trim()) {
            obj.username = 'Username is required!';
        }

        if (!data.password.trim()) {
            obj.password = 'Password is required!';
        }
        return obj;
    };

    const FetchForgetPasswordAPI = async () => {
        setLoading(true);

        setTimeout(() => {
            setUser(true);
            setMessage({
                type: true,
                message: 'Email sent to you!',
            });
        }, 5000);
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            FetchForgetPasswordAPI();
        } 
    }, [errors]);
    return (
        <div className='form__container'>
            <form>
                <h3>Forget password</h3>
                <p>We will send you an email to find your account</p>
                <Input
                    labelPlaceholder={
                        errors.username ? errors.username : 'Username'
                    }
                    bordered
                    color='primary'
                    shadow={false}
                    onChange={handleOnChange}
                    name='username'
                    status={errors.username ? 'error' : 'primary'}
                />
                <Input.Password
                    labelPlaceholder={
                        errors.password ? errors.password : 'New password'
                    }
                    bordered
                    color={errors.password ? 'error' : 'primary'}
                    shadow={false}
                    onChange={handleOnChange}
                    name='password'
                    status={errors.password ? 'error' : 'primary'}
                />

                <ButtonG
                    color='primary'
                    text='Find account'
                    func={handleOnSubmit}
                />
            </form>
        </div>
    );
};

export default ResetPassword;
