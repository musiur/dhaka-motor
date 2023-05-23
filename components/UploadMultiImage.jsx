import { MessageContext } from '@/contexts/MessageProvider';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';

const UploadMultiImage = ({ func, name, defaultValue }) => {
    const { setMessage } = useContext(MessageContext);
    // console.log({ defaultValue })
    const [postImage, setPostImage] = useState({
        myFile: defaultValue ? defaultValue : [],
    });
    const [imageName, setImageName] = useState('Upload picture');

    const handleFileUpload = async (e) => {
        let files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];

            if (file.size < 5 * 1024 * 1024) {
                const base64 = await convertToBase64(file);
                files.push(base64);
            } else {
                setMessage({
                    type: false,
                    message: `File size can't be more than 5 MB! Removed ${
                        i + 1
                    }th picture`,
                });
            }
        }
        setPostImage({ ...postImage, myFile: [...postImage.myFile, ...files] });
    };

    useEffect(() => {
        func({
            target: {
                name: name,
                value: postImage.myFile,
            },
        });
    }, [postImage]);

    // console.log(postImage);
    return (
        <div className='rounded-md border bg-white p-2'>
            {postImage.myFile.length ? (
                <div className='flex flex-wrap items-center justify-start gap-1'>
                    {postImage.myFile.map((item, index) => {
                        return (
                            <div key={index} className='relative'>
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className='absolute right-0 top-0 m-1 cursor-pointer text-gray-400 hover:text-red-400'
                                    onClick={() => {
                                        setPostImage({
                                            ...postImage,
                                            myFile: [
                                                ...postImage.myFile.filter(
                                                    (image) => image !== item
                                                ),
                                            ],
                                        });
                                    }}
                                />
                                <img
                                    src={item}
                                    alt=''
                                    className='h-[100px] w-[100px] rounded-md'
                                />
                            </div>
                        );
                    })}
                </div>
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
                    multiple={true}
                    onChange={handleFileUpload}
                    className='absolute left-0 top-0 h-full w-full cursor-pointer border opacity-0'
                />
            </div>
        </div>
    );
};

export default UploadMultiImage;

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
