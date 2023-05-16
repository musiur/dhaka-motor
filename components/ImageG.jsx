const { default: Image } = require('next/image');

const ImageG = ({ src, priority }) => {
    return (
        <div className='relative h-[100%] w-[100%]'>
            <Image
                src={src}
                alt='motorbike'
                fill
                className='next__image'
                priority={priority}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
        </div>
    );
};

export default ImageG;
