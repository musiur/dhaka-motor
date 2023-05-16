const { default: Image } = require('next/image');

const ImageG = ({ src }) => {
    return (
        <div className='relative h-[100%] w-[100%]'>
            <Image
                src={src}
                alt='motorbike'
                fill
                className='next__image rounded-xl'
            />
        </div>
    );
};

export default ImageG;
