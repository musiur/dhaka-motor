import ImageG from '@/components/ImageG';
import { useRouter } from 'next/router';

const Bike = () => {
    const Router = useRouter();
    const pathname = Router.query.slung;
    console.log(pathname);

    const BikeDetails = {
        id: 2,
        image: 'https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/hero-card/3-up/freewheeler-hc-3-up.jpg?impolicy=myresize&rw=400',
        title: 'Freewheeler',
        description:
            'Hot-rod attitude on three wheels, the 2023 Freewheeler delivers aggressive style, confidence and performance.',
        link: '/bikes/2',
    };

    const images = [
        {
            id: 0,
            image: 'https://www.yamahamotorsports.com/media/images_products/2023-yzf-r1/1200px/23-YAM-YZFR1N1L-US-DPBSE-DET-9256-01.JPG.webp',
        },
        {
            id: 1,
            image: 'https://www.yamahamotorsports.com/media/images_products/2023-yzf-r1/1200px/23-YAM-YZFR1N1L-US-DPBSE-DET-9252-01.JPG.webp',
        },
        {
            id: 2,
            image: 'https://www.yamahamotorsports.com/media/images_products/2023-yzf-r1/1200px/23-YAM-YZFR1N1L-US-DPBSE-DET-9253-01.JPG.webp',
        },
        {
            id: 3,
            image: 'https://www.yamahamotorsports.com/media/images_products/2023-yzf-r1/1200px/23-YAM-YZFR1N1L-US-DPBSE-DET-9254-01.JPG.webp',
        },
        {
            id: 4,
            image: 'https://www.yamahamotorsports.com/media/images_products/2023-yzf-r1/1200px/23-YAM-YZFR1N1L-US-DPBSE-DET-9255-01.JPG.webp',
        },
        {
            id: 5,
            image: 'https://www.yamahamotorsports.com/media/images_products/2023-yzf-r1/1200px/23-YAM-YZFR1N1L-US-DPBSE-DET-9255-01.JPG.webp',
        },
    ];

    return (
        <div>
            <div className='bike__container'>
                <div className='bike__container__1st_section text-center text-white'>
                    <h2 className='mx-auto w-full  md:w-[80%] md:text-2xl lg:w-[60%]'>
                        Esse cupidatat deserunt aute non anim est culpa quis
                        elit
                    </h2>
                    <p>
                        Dolor esse ad sint est quis cupidatat nostrud. Dolore
                        nulla non duis ipsum ullamco. Ad ipsum et eiusmod magna
                        laborum et pariatur exercitation ex occaecat ipsum.
                        Velit in ad ipsum eu labore Lorem incididunt eu nostrud
                        reprehenderit est id. Est laboris id occaecat culpa ad
                        adipisicing commodo ut est laborum velit nisi commodo.
                        Consectetur ut irure pariatur aliqua et amet velit sint
                        anim reprehenderit eu cillum. Ea laborum enim ea minim
                        nisi laborum nulla.
                    </p>
                </div>

                <div className='section container'>
                    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
                        <ImageG src={BikeDetails.image} />
                        <div className='col-span-2'>
                            <h2>
                                Esse cupidatat deserunt aute non anim est culpa
                                quis elit
                            </h2>
                            <p>
                                Dolor esse ad sint est quis cupidatat nostrud.
                                Dolore nulla non duis ipsum ullamco. Ad ipsum et
                                eiusmod magna laborum et pariatur exercitation
                                ex occaecat ipsum. Velit in ad ipsum eu labore
                                Lorem incididunt eu nostrud reprehenderit est
                                id. Est laboris id occaecat culpa ad adipisicing
                                commodo ut est laborum velit nisi commodo.
                                Consectetur ut irure pariatur aliqua et amet
                                velit sint anim reprehenderit eu cillum. Ea
                                laborum enim ea minim nisi laborum nulla.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {images.map((image) => {
                        return <ImageG src={image.image} key={image.id} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Bike;
