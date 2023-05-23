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

// {
//     id: 1,
//     description: '',
//     warranty: 1,
//     name: '',
//     images: [],
//     price: '',
//     thumbnail: '',
// }

const UpdateBike = ({ setUpdateForm, bikes, setBikes, toUpdate }) => {
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);
    let defaultData = bikes.filter((item) => item.id === toUpdate)[0];
    defaultData = { ...defaultData, images: JSON.parse(defaultData.images) };
    const [formData, setFormData] = useState(defaultData);
    const [errors, setErrors] = useState({});

    console.log(formData);

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

    const UpdateBikeInformation = async () => {
        setLoading(true);
        try {
            console.log(typeof formData.thumbnail);
            const data = {
                id: toUpdate,
                description: formData.description,
                warranty: 1,
                name: formData.name,
                images: JSON.stringify(formData.images),
                price: parseInt(formData.price),
                thumbnail: formData.thumbnail,
            };
            console.log({ data });
            const API = `${process.env.BASE_URL}/api/bikes/update`;
            const response = await axios.post(API, data);
            // console.log(response);
            if (response.status === 200) {
                setMessage({
                    type: true,
                    message: 'Bike data update successful!',
                });
                setBikes([
                    ...bikes.map((item) => {
                        if (item.id === toUpdate) {
                            item = data.bikes[0];
                        }
                    }),
                ]);
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
            UpdateBikeInformation();
        }
    }, [errors]);
    return (
        <div className='fixed left-0 top-0 z-[100] flex h-[100vh] w-full items-center justify-center overflow-y-scroll bg-[#ffffff50] py-10'>
            <div className='relative mx-3 mt-[670px] min-h-[200px] w-[600px] min-w-[300px] rounded-2xl p-4 shadow-xl backdrop-blur-2xl md:mt-[300px]'>
                <FontAwesomeIcon
                    icon={faTimes}
                    className='absolute right-0 top-0 m-2 cursor-pointer text-gray-400 hover:text-red-400'
                    onClick={() => setUpdateForm(false)}
                />
                <h2 className='mb-4 text-center text-lg font-semibold lg:text-xl'>
                    Update bike information
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

                    {/* multi images  */}
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
                        label={errors.name ? errors.name : 'Name'}
                        bordered
                        color='primary'
                        shadow={false}
                        onChange={handleOnChange}
                        name='name'
                        status={errors.name ? 'error' : 'primary'}
                        value={formData?.name}
                    />

                    <Input
                        label={errors.price ? errors.price : 'Price'}
                        bordered
                        type='number'
                        color='primary'
                        shadow={false}
                        onChange={handleOnChange}
                        name='price'
                        status={errors.price ? 'error' : 'primary'}
                        value={formData?.price}
                    />

                    <Textarea
                        label={
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
                        value={formData?.description}
                    />

                    <ButtonG
                        color='primary'
                        text='Update'
                        func={handleOnSubmit}
                    />
                </form>
            </div>
        </div>
    );
};

export default UpdateBike;
