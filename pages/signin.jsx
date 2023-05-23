import ButtonG from '@/components/ButtonG';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import Public from '@/layouts/Public';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const SignIn = () => {
    const { setUser } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const { setMessage } = useContext(MessageContext);
    const Router = useRouter();

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

        try {
            const API = `${process.env.BASE_URL}/api/auth/signin`;
            const response = await axios.post(API, { users: [formData] });
            if (response.status === 200) {
                setUser(response.data.result);
                setMessage({
                    type: true,
                    message: 'Sign in successful!',
                });
                sessionStorage.setItem(
                    'user',
                    JSON.stringify(response.data.result)
                );
                const fromPathname = sessionStorage.getItem('from');
                Router.push(fromPathname ? fromPathname : '/dashboard/profile');
            }
        } catch (error) {
            if (error?.response?.status === 404) {
                setMessage({
                    type: false,
                    message: 'User not found!',
                });
            } else if (error?.response?.status === 401) {
                setMessage({
                    type: false,
                    message: 'Password not matched!',
                });
            } else {
                setMessage({
                    type: false,
                    message: 'Something went wrong!',
                });
            }
        }

        setLoading(false);
    };
    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            FetchSignInAPI();
        }
    }, [errors]);
    return (
        <Public>
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

                    <Link href='/forget-password' className='text-right'>
                        Forget password?
                    </Link>

                    <ButtonG
                        color='primary'
                        text='Sign in'
                        func={handleOnSubmit}
                    />

                    <Link href='/signup' className='text-center'>
                        Don't have account? Create a new
                    </Link>
                </form>
            </div>
        </Public>
    );
};

export default SignIn;
