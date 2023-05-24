import ButtonG from '@/components/ButtonG';
import DashboardNav from '@/components/DashboardNav';
import ImageG from '@/components/ImageG';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import Private from '@/layouts/Private';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from '@nextui-org/react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const Profile = () => {
    const { user } = useContext(UserContext);
    const [updateModal, setUpdateModal] = useState(false);
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/profile');
    }, []);
    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div className='dashboard__contents'>
                    {user ? (
                        <div>
                            <div className='relative h-[150px] w-[150px] overflow-hidden rounded-xl'>
                                <FontAwesomeIcon
                                    icon={faUserEdit}
                                    className='absolute right-0 top-0 z-[100] m-2 cursor-pointer rounded-md border p-1 text-gray-200 shadow-lg hover:border-blue-200 hover:text-blue-200 hover:shadow-xl'
                                    onClick={() => setUpdateModal(true)}
                                />
                                <ImageG src={user.image} />
                            </div>
                            <h2 className='mt-2 text-xl font-bold uppercase lg:text-2xl'>
                                {user.username}{' '}
                                <span className='text-md font-normal lowercase text-gray-300'>
                                    @{user.username}
                                </span>
                            </h2>
                            <p className='text-gray-400'>
                                {user.email} || {user.mobile}
                            </p>
                            <p className='text-gray-400'>{user.address}</p>
                            <div></div>
                        </div>
                    ) : (
                        'No data found'
                    )}
                </div>
                {updateModal ? (
                    <UpdateProfile setUpdateModal={setUpdateModal} />
                ) : null}
            </div>
        </Private>
    );
};

export default Profile;

const UpdateProfile = ({ setUpdateModal }) => {
    const { user, setUser } = useContext(UserContext);
    const { setLoading } = useContext(LoadingContext);
    const { setMessage } = useContext(MessageContext);

    const [formData, setFormData] = useState(user);
    const [errors, setErrors] = useState({});
    const [edited, setEdited] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setEdited(true);
    };

    const handleOnSubmit = () => {
        setErrors(validator(formData));
    };

    const validator = (data) => {
        let obj = {};

        if (!data.email.trim()) {
            obj.email = 'Email is required';
        }
        return obj;
    };

    const FetchUpdateProfile = async () => {
        setLoading(true);
        try {
            const API = `${process.env.BASE_URL}/api/users/update`;
            const response = await axios.put(API, formData);
            if (response.status === 200) {
                setMessage({
                    type: true,
                    message: 'Updated successfully!',
                });
                setUser({ ...user, ...formData });
                setLoading(false);
            }
        } catch (error) {
            setMessage({
                type: false,
                message: 'Something went wrong!',
            });
            setLoading(false);
        }
        setEdited(false);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && edited) {
            FetchUpdateProfile();
        }
    }, [errors]);
    return (
        <div className='fixed right-0 top-0 z-[205] flex h-[100vh] w-full items-center justify-center bg-[#ffffff50] p-2'>
            <div className='relative min-h-[200px] min-w-[300px] rounded-xl p-5 shadow-2xl backdrop-blur-lg'>
                <FontAwesomeIcon
                    icon={faTimes}
                    className='absolute right-0 top-0 m-2 cursor-pointer text-gray-400 hover:text-red-400'
                    onClick={() => setUpdateModal(false)}
                />
                <h1 className='text-center text-xl font-bold'>
                    Update profile
                </h1>
                <form className='grid grid-cols-1 gap-10 pt-10'>
                    <Input
                        labelPlaceholder={errors.email ? errors.email : 'Email'}
                        bordered
                        color='primary'
                        shadow={false}
                        onChange={handleOnChange}
                        name='email'
                        status={errors.email ? 'error' : 'primary'}
                        value={formData?.email}
                    />

                    <ButtonG
                        color='primary'
                        text='Update information'
                        func={handleOnSubmit}
                    />
                </form>
            </div>
        </div>
    );
};
