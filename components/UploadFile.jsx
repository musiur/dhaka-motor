import { PopContext } from 'context/PopProvider';
import { useContext, useEffect, useState } from 'react';

const UploadFile = ({ func, name, defaultValue }) => {
    const { setMessage } = useContext(PopContext);
    const [fileToUpload, setFileToUpload] = useState({
        myFile: defaultValue ? defaultValue : '',
        fileExtension: '',
    });
    const fileExtensions = [
        '.jpg',
        '.jpeg',
        '.png',
        '.webp',
        '.pdf',
        '.ppt',
        '.pptx',
        '.gif',
        '.doc',
        '.docx',
        '.html',
        '.htm',
        '.odt',
        '.ods',
        '.xls',
        '.xlsx',
        '.txt',
        '.exe',
        '.zip',
        '.rar',
    ];

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if (file.size < 10 * 1024 * 1024) {
            const base64 = await convertToBase64(file);
            setFileToUpload({
                ...fileToUpload,
                myFile: base64,
                fileExtension: file.name,
            });
        } else {
            setMessage({
                type: false,
                message: `File size can't be more than 10 MB!`,
            });
        }
    };

    const removeFile = (e) => {
        e.preventDefault();
        setFileToUpload({ ...fileToUpload, myFile: '', fileExtension: '' });
        setFileName('Upload picture');
    };

    const FindExtension = () => {
        let foundedExtension = '.pdf';
        for (let i = 0; i < fileExtensions.length; i++) {
            if (fileToUpload.fileExtension.includes(fileExtensions[i])) {
                foundedExtension = fileExtensions[i];
                break;
            }
        }

        return foundedExtension;
    };

    useEffect(() => {
        func({
            target: {
                name: name,
                value: fileToUpload.myFile,
                extension: FindExtension(),
            },
        });
    }, [fileToUpload]);
    return (
        <div className='rounded-md border bg-white p-2'>
            <div className='relative mt-5 rounded-md border px-3 py-1'>
                {fileToUpload.myFile || defaultValue
                    ? `Giveway-resources`
                    : 'Upload file'}
                <input
                    type='file'
                    label='Image'
                    name='myFile'
                    id='file-upload'
                    accept='.jpeg, .png, .jpg, .webp, .pdf, .zip, .rar'
                    onChange={handleFileUpload}
                    className='absolute left-0 top-0 h-full w-full cursor-pointer border opacity-0'
                />
            </div>
            {fileToUpload.myFile || defaultValue ? (
                <button
                    onClick={(e) => removeFile(e)}
                    className='my-3 rounded-md bg-red-600 px-2 py-[3px] text-white'
                >
                    Remove File
                </button>
            ) : null}
        </div>
    );
};

export default UploadFile;

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
