import ImageG from '@/components/ImageG';
import { CartContext } from '@/contexts/CartProvider';
import Private from '@/layouts/Private';
import { useContext, useEffect } from 'react';

const Checkout = () => {
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        sessionStorage.setItem('from', '/checkout');
    }, []);
    return (
        <Private>
            <div className='section container'>
                <div>
                    <h1 className='pb-10 text-center text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl'>
                        Checkout
                    </h1>
                    <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6'>
                        {cart.items.length ? (
                            cart.items.map((item) => {
                                const { id, title, price, image } = item;
                                return (
                                    <div key={id} className=''>
                                        <div>
                                            <ImageG src={image} />
                                        </div>
                                        <div>
                                            <p className='font-bold'>{title}</p>
                                            <p>${price}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>No item added!</div>
                        )}
                    </div>
                </div>
            </div>
        </Private>
    );
};

export default Checkout;
