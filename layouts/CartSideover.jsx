import { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '@/contexts/CartProvider';
import ImageG from '@/components/ImageG';
import ButtonG from '@/components/ButtonG';
import { useRouter } from 'next/router';

const CartSideover = ({ children }) => {
    const { cart, setCart } = useContext(CartContext);
    const Router = useRouter();

    const CloseCart = () => {
        setCart({
            open: false,
            items: [...cart.items],
        });
    };

    useEffect(() => {
        CloseCart();
    }, [Router]);

    const removeFromCart = (id) => {
        const toSet = {
            ...cart,
            items: [...cart.items.filter((item) => item.id !== id)],
        };
        setCart(toSet);

        sessionStorage.setItem('cart', JSON.stringify(toSet), 5);
    };

    return (
        <div>
            {cart.open ? (
                <div className='cart__container'>
                    <FontAwesomeIcon
                        icon={faClose}
                        onClick={CloseCart}
                        className='cart__container__close_icon'
                    />
                    <div className='cart__items__container'>
                        {cart.items.length ? (
                            cart.items.map((item) => {
                                const { id, title, price, image } = item;
                                return (
                                    <div key={id} className='cart__item '>
                                        <div>
                                            <ImageG src={image} />
                                        </div>
                                        <div>
                                            <p>{title}</p>
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
                    <ButtonG
                        text='Checkout'
                        color='primary'
                        func={() => Router.push('/checkout')}
                    />
                </div>
            ) : null}
            {children}
        </div>
    );
};

export default CartSideover;
