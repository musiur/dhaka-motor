import ImageG from '@/components/ImageG';

const Home = () => {
    return (
        <div className='section container'>
            <div className='grid grid-cols-1 gap-10'>
                <div className='mx-auto grid w-full grid-cols-1 gap-3 text-center md:w-[90%] lg:w-[70%] xl:w-[40%]'>
                    <h1 className='text-xl font-bold lg:text-2xl xl:text-4xl'>
                        Welcome to DhakaMotor
                    </h1>
                    <p className='text-gray-600'>
                        Qui velit minim veniam eu cupidatat magna duis consequat
                        et eiusmod in cupidatat do eu. Elit deserunt nostrud sit
                        Lorem velit dolore id incididunt ipsum ex id ut. Sunt
                        proident sit non Lorem cillum fugiat. Ex mollit occaecat
                        et ipsum id aute do tempor aliquip adipisicing
                        exercitation ut.
                    </p>
                </div>
                <div className='mx-auto w-full sm:w-[70%] lg:w-[60%]'>
                    <ImageG src='https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-card/eghk-mc.jpg?impolicy=myresize&rw=700' />
                </div>
            </div>
        </div>
    );
};

export default Home;
