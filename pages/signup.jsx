import ButtonG from '@/components/ButtonG';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import { Input } from '@nextui-org/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

const SignUp = () => {
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

    const FetchSignInAPI = async () => {
        setLoading(true);
        console.log(formData);

        setTimeout(() => {
            setUser(true);
            setMessage({
                type: true,
                message: 'Sign up successful!',
            });
        }, 5000);
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            FetchSignInAPI();
        } else {
            console.log(errors);
        }
    }, [errors]);
    return (
        <div className='form__container'>
            <form>
                <h3>Welcome to DhakaMotors</h3>
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
                        errors.password ? errors.password : 'Password'
                    }
                    bordered
                    color={errors.password ? 'error' : 'primary'}
                    shadow={false}
                    onChange={handleOnChange}
                    name='password'
                    status={errors.password ? 'error' : 'primary'}
                />

                <ButtonG color='primary' text='Sign up' func={handleOnSubmit} />

                <Link href='/signin' className='text-center'>
                    Already have account? Sign in
                </Link>
            </form>
        </div>
    );
};

export default SignUp;