import { PopContext } from 'context/PopProvider';
import { useContext, useEffect, useState } from 'react';

const UploadImage = ({ type, func, name, defaultValue }) => {
    const { setMessage } = useContext(PopContext);
    // console.log({ defaultValue })
    const [postImage, setPostImage] = useState({
        myFile: defaultValue ? defaultValue : '',
    });
    const [imageName, setImageName] = useState('Upload picture');

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if (file.size < 5 * 1024 * 1024) {
            const base64 = await convertToBase64(file);
            setPostImage({ ...postImage, myFile: base64 });
            setImageName(file.name);
        } else {
            setMessage({
                type: false,
                message: `File size can't be more than 5 MB!`,
            });
        }
    };

    const removeImage = (e) => {
        e.preventDefault();
        setPostImage({ ...postImage, myFile: '' });
        setImageName('Upload picture');
    };

    useEffect(() => {
        func({
            target: {
                name: name,
                value: postImage.myFile,
            },
        });
    }, [postImage]);

    const imageStyle = `${
        type === 'profile'
            ? 'w-[100px] h-[100px] rounded-full '
            : ' w-[200px] h-auto rounded-md'
    } border-2 border-blue-200`;
    return (
        <div className='rounded-md border bg-white p-2'>
            {postImage.myFile ? (
                <img src={postImage.myFile} alt='' className={imageStyle} />
            ) : null}
            <div className='relative mt-5 rounded-md border px-3 py-1'>
                {imageName !== 'Upload picture' ? (
                    <span className='font-medium'>Uploaded Picture:</span>
                ) : null}{' '}
                {imageName}
                <input
                    type='file'
                    label='Image'
                    name='myFile'
                    id='file-upload'
                    accept='.jpeg, .png, .jpg, .webp'
                    onChange={handleFileUpload}
                    className='absolute left-0 top-0 h-full w-full cursor-pointer border opacity-0'
                />
            </div>
            {postImage.File || defaultValue ? (
                <button
                    onClick={(e) => removeImage(e)}
                    className='my-3 rounded-md bg-red-600 px-2 py-[3px] text-white'
                >
                    Remove Image
                </button>
            ) : null}
        </div>
    );
};

export default UploadImage;

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
