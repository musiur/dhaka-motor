import ButtonG from '@/components/ButtonG';
import UploadImage from '@/components/UploadImage';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const SignUp = () => {
    const { setUser } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const { setMessage } = useContext(MessageContext);

    const Router = useRouter();

    const date = new Date();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        mobile: '',
        address: '',
        role: 1,
        image: '',
        date: date.toLocaleDateString(),
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

        if (!data.mobile.trim()) {
            obj.mobile = 'Mobile is required!';
        }

        if (!data.address.trim()) {
            obj.address = 'Address is required!';
        }

        if (!data.image.trim()) {
            obj.image = 'Image is required!';
        }
        return obj;
    };

    const FetchSignInAPI = async () => {
        setLoading(true);

        try {
            const API = `${process.env.BASE_URL}/api/auth/signup`;
            const response = await axios.post(API, { users: [formData] });
            if (response.status === 200) {
                setUser(response.data.result[0]);
                setMessage({
                    type: true,
                    message: 'Sign up successful!',
                });
                Router.push('/signin');
            }
        } catch (error) {
            if (error.response.status === 409) {
                setMessage({
                    type: false,
                    message: 'User already exists!',
                });
            } else if (error.response.status === 404) {
                setMessage({
                    type: false,
                    message: 'User not found!',
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
        <div className='form__container'>
            <form>
                <h3>Welcome to DhakaMotors</h3>
                {errors.image ? (
                    <span className='px-3 py-[3px] text-red-600'>
                        {errors.image}
                    </span>
                ) : null}
                {formData.image ? (
                    <UploadImage
                        func={handleOnChange}
                        name='image'
                        label='Upload your banner'
                        defaultValue={formData?.image}
                    />
                ) : null}
                {formData.image === '' ? (
                    <UploadImage
                        func={handleOnChange}
                        name='image'
                        label='Upload your banner'
                        defaultValue={formData?.image}
                    />
                ) : null}

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
                    type='email'
                />
                <Input
                    labelPlaceholder={errors.mobile ? errors.mobile : 'Mobile'}
                    bordered
                    color='primary'
                    shadow={false}
                    onChange={handleOnChange}
                    name='mobile'
                    status={errors.mobile ? 'error' : 'primary'}
                    type='number'
                />
                <Input
                    labelPlaceholder={
                        errors.address ? errors.address : 'Address'
                    }
                    bordered
                    color='primary'
                    shadow={false}
                    onChange={handleOnChange}
                    name='address'
                    status={errors.address ? 'error' : 'primary'}
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
