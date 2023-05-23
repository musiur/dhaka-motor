import ImageG from '@/components/ImageG';
import Stripe from '@/components/Stripe';
import { CartContext } from '@/contexts/CartProvider';
import Private from '@/layouts/Private';
import { useContext, useEffect } from 'react';

const Checkout = () => {
    const { cart, setCart } = useContext(CartContext);

    useEffect(() => {
        sessionStorage.setItem('from', '/checkout');
    }, []);

    const removeFromCart = (id) => {
        const toSet = {
            ...cart,
            items: [...cart.items.filter((item) => item.id !== id)],
        };
        setCart(toSet);

        sessionStorage.setItem('cart', JSON.stringify(toSet), 5);
    };

    return (
        <Private>
            <div className='section container'>
                <div>
                    <h1 className='pb-10 text-center text-xl font-bold md:text-2xl lg:text-3xl xl:text-4xl'>
                        Checkout all your products
                    </h1>
                    <div className='flex flex-wrap items-center justify-center gap-5 pb-20'>
                        {cart.items.length ? (
                            cart.items.map((item) => {
                                const { id, name, price, thumbnail } = item;
                                return (
                                    <div key={id} className='max-w-[200px]'>
                                        <div>
                                            <ImageG src={thumbnail} />
                                        </div>
                                        <div>
                                            <p className='font-bold'>{name}</p>
                                            <p>${price}</p>
                                            <button
                                                onClick={() =>
                                                    removeFromCart(id)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>No item added!</div>
                        )}
                    </div>
                    {cart.items.length ? <Stripe/> : null}
                </div>
            </div>
        </Private>
    );
};

export default Checkout;
