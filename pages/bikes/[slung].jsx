import ButtonG from '@/components/ButtonG';
import ImageG from '@/components/ImageG';
import { CartContext } from '@/contexts/CartProvider';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const Bike = () => {
    const Router = useRouter();
    const pathname = parseInt(Router.query.slung);
    const { cart, setCart } = useContext(CartContext);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);

    const BikeDetails = {
        id: pathname,
        image: 'https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/hero-card/3-up/freewheeler-hc-3-up.jpg?impolicy=myresize&rw=400',
        title: 'Freewheeler',
        description:
            'Hot-rod attitude on three wheels, the 2023 Freewheeler delivers aggressive style, confidence and performance.',
        link: '/bikes/2',
        price: 17999,
        images: [
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
        ],
    };

    const [bikes, setBikes] = useState(BikeDetails);

    const addToCart = () => {
        const AddBike = () => {
            const toSet = { ...cart, items: [...cart.items, bikes] };
            setCart(toSet);
            setMessage({
                type: true,
                message: 'New bike added to cart!',
            });

            sessionStorage.setItem('cart', JSON.stringify(toSet), 5);
        };
        if (cart.items.length) {
            if (
                cart.items.filter((item) => item.id === bikes.id).length
            ) {
                setMessage({
                    type: false,
                    message: 'Already added!',
                });
            } else {
                AddBike();
            }
        } else {
            AddBike();
        }
    };

    const removeFromCart = () => {
        const toSet = {
            ...cart,
            items: [...cart.items.filter((item) => item.id !== bikes.id)],
        };
        setCart(toSet);

        sessionStorage.setItem('cart', JSON.stringify(toSet), 5);
    };

    const FetchAllBikes = async () => {
        setLoading(true);
        try {
            const API = `${process.env.BASE_URL}/api/bikes?username=admin`;
            const response = await axios.get(API);
            if (response.status === 200) {
                if (response.data.result.length) {
                    setMessage({
                        type: true,
                        message: 'Bike data fetch successful!',
                    });
                    const bike = response.data.result.filter(
                        (item) => item.id === pathname
                    )[0];
                    const toSet = {
                        id: bike.id,
                        images: JSON.parse(bike.images),
                        price: bike.price,
                        thumbnail: bike.thumbnail,
                        warranty: bike.warranty,
                        name: bike.name,
                        description: bike.description,
                    };
                    setBikes(toSet);
                } else {
                    setMessage({
                        type: false,
                        message: 'No bike data found!',
                    });
                }
            }
        } catch (error) {
            setMessage({
                type: false,
                message: 'Something went wrong!',
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        FetchAllBikes();
    }, []);


    return (
        <div>
            <div className='bike__container'>
                <div className='bike__container__1st_section text-center text-white'>
                    <h2 className='mx-auto w-full  md:w-[80%] md:text-2xl lg:w-[60%]'>
                        Esse cupidatat deserunt aute non anim est culpa quis
                        elit
                    </h2>
                    <p className='text-5xl font-bold xl:text-7xl'>
                        ${bikes.price}
                    </p>
                    <p className='p-3 md:p-5 lg:p-10'>
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
                    <div className='grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-3'>
                        <ImageG
                            src={bikes.thumbnail}
                            className='col-span-1'
                        />
                        <div className='col-span-2 grid grid-cols-1 gap-5'>
                            <h2>
                                {bikes.name}
                            </h2>
                            <p>
                               {bikes.description}
                            </p>
                            <div className='flex items-center gap-4'>
                                <ButtonG
                                    color='gray50'
                                    flat
                                    text={
                                        cart.items.filter(
                                            (item) => item.id === BikeDetails.id
                                        ).length
                                            ? 'Remove from cart'
                                            : 'Add to cart'
                                    }
                                    func={
                                        cart.items.filter(
                                            (item) => item.id === BikeDetails.id
                                        ).length
                                            ? removeFromCart
                                            : addToCart
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {bikes.images.map((image, index) => {
                        return <ImageG src={image} key={index} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Bike;
