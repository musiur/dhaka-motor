import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, Textarea } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import ButtonG from './ButtonG';
import UploadImage from './UploadImage';
import UploadMultiImage from './UploadMultiImage';
import { MessageContext } from '@/contexts/MessageProvider';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { UserContext } from '@/contexts/UserProvider';
import axios from 'axios';

const AddBike = ({ setAddForm, bikes, setBikes }) => {
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        id: 1,
        description: '',
        warranty: 1,
        name: '',
        images: [],
        price: '',
        thumbnail: '',
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
        if (!data.description.trim()) {
            obj.description = 'Description is required!';
        }
        if (!data.name.trim()) {
            obj.name = 'Name is required!';
        }
        if (!data.price.trim()) {
            obj.price = 'Price is required!';
        }
        return obj;
    };

    const AddBikeToDB = async () => {
        setLoading(true);
        try {
            const calculateId = () => {
                if (!bikes.length) {
                    return 1;
                }
                const IDs = bikes.map((item) => item.id);
                let max = IDs[0];
                for (let i = 0; i < IDs.length; i++) {
                    if (max < IDs[i]) {
                        max = IDs[i];
                    }
                }

                return max + 1;
            };
            const { username } = user;
            const data = {
                username,
                bikes: [
                    {
                        id: bikes.length ? calculateId() : 1,
                        description: formData.description,
                        warranty: 1,
                        name: formData.name,
                        images: JSON.stringify(formData.images),
                        price: formData.price,
                        thumbnail: formData.thumbnail,
                    },
                ],
            };
            const API = `${process.env.BASE_URL}/api/bikes/create`;
            const response = await axios.post(API, data);
            console.log(response);
            if (response.status === 200) {
                setMessage({
                    type: true,
                    message: 'Bike data created successful!',
                });
                setBikes([...bikes, data.bikes[0]]);
            }
        } catch (error) {
            console.log(error);
            setMessage({
                type: false,
                message: 'Something went wrong!',
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            AddBikeToDB();
        }
    }, [errors]);
    return (
        <div className='fixed left-0 top-0 z-[500] flex h-[100vh] w-full items-center justify-center overflow-y-scroll bg-[#ffffff50] py-10'>
            <div className='relative mx-3 mt-[670px] min-h-[200px] w-[600px] min-w-[300px] rounded-2xl p-4 shadow-xl backdrop-blur-2xl md:mt-[300px] lg:mt-[200px]'>
                <FontAwesomeIcon
                    icon={faTimes}
                    className='absolute right-0 top-0 m-2 cursor-pointer text-gray-400 hover:text-red-400'
                    onClick={() => setAddForm(false)}
                />
                <h2 className='mb-4 text-center text-lg font-semibold lg:text-xl'>
                    New bike information
                </h2>

                <form className='grid grid-cols-1 gap-10 pt-5'>
                    {errors.thumbnail ? (
                        <span className='px-3 py-[3px] text-red-600'>
                            {errors.thumbnail}
                        </span>
                    ) : null}
                    {formData.thumbnail ? (
                        <UploadImage
                            func={handleOnChange}
                            name='thumbnail'
                            label='Upload your banner'
                            defaultValue={formData?.thumbnail}
                        />
                    ) : null}
                    {formData.thumbnail === '' ? (
                        <UploadImage
                            func={handleOnChange}
                            name='thumbnail'
                            label='Upload your banner'
                            defaultValue={formData?.thumbnail}
                        />
                    ) : null}
                    {errors.images ? (
                        <span className='px-3 py-[3px] text-red-600'>
                            {errors.images}
                        </span>
                    ) : null}
                    {formData.images ? (
                        <UploadMultiImage
                            func={handleOnChange}
                            name='images'
                            label='Upload your banner'
                            defaultValue={formData?.images}
                        />
                    ) : null}
                    {formData.images === '' ? (
                        <UploadMultiImage
                            func={handleOnChange}
                            name='images'
                            label='Upload your banner'
                            defaultValue={formData?.images}
                        />
                    ) : null}

                    <Input
                        labelPlaceholder={errors.name ? errors.name : 'Name'}
                        bordered
                        color='primary'
                        shadow={false}
                        onChange={handleOnChange}
                        name='name'
                        status={errors.name ? 'error' : 'primary'}
                    />

                    <Input
                        labelPlaceholder={errors.price ? errors.price : 'Price'}
                        bordered
                        type='number'
                        color='primary'
                        shadow={false}
                        onChange={handleOnChange}
                        name='price'
                        status={errors.price ? 'error' : 'primary'}
                    />

                    <Textarea
                        labelPlaceholder={
                            errors.description
                                ? errors.description
                                : 'Description'
                        }
                        bordered
                        color='primary'
                        shadow={false}
                        onChange={handleOnChange}
                        name='description'
                        status={errors.description ? 'error' : 'primary'}
                    />

                    <ButtonG color='primary' text='Add' func={handleOnSubmit} />
                </form>
            </div>
        </div>
    );
};

export default AddBike;
