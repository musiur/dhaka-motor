import ButtonG from '@/components/ButtonG';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import { Input } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';

const ForgetPassword = () => {
    const { setUser } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const { setMessage } = useContext(MessageContext);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
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

        if (!data.email.trim()) {
            obj.email = 'Email is required!';
        }
        return obj;
    };

    const FetchForgetPasswordAPI = async () => {
        setLoading(true);

        setTimeout(() => {
            setUser(true);
            setMessage({
                type: true,
                message: 'Successfully password reseted!',
            });
        }, 5000);
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            FetchForgetPasswordAPI();
        } else {
        }
    }, [errors]);
    return (
        <div className='form__container'>
            <form>
                <h3>Reset password</h3>
                <p>Reset your password with new strong password</p>
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
                <Input
                    labelPlaceholder={errors.email ? errors.email : 'Email'}
                    bordered
                    color='primary'
                    shadow={false}
                    onChange={handleOnChange}
                    name='email'
                    status={errors.email ? 'error' : 'primary'}
                />

                <ButtonG color='primary' text='Find account' func={handleOnSubmit} />
            </form>
        </div>
    );
};

export default ForgetPassword;
