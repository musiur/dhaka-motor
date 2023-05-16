import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '@/contexts/CartProvider';

const CartSideover = ({ children }) => {
    const { cart, setCart } = useContext(CartContext);

    const CloseCart = () => {
        setCart({
            open: false,
            items: [...cart.items],
        });
    };

    console.log(cart);

    return (
        <div>
            {cart.open ? (
                <div className='cart__container'>
                    <FontAwesomeIcon icon={faClose} onClick={CloseCart} className="cart__container__close_icon"/>
                    <p>
                        Nulla cupidatat id irure amet in consectetur eu velit
                        magna. Proident dolore laborum labore mollit nisi
                        deserunt proident ut occaecat qui. Cupidatat tempor id
                        consequat nisi aliquip ullamco nostrud esse deserunt
                        Lorem eiusmod esse culpa. Commodo culpa ut laboris
                        exercitation qui elit Lorem enim do incididunt. Et
                        occaecat mollit voluptate duis amet. Aliquip sint aliqua
                        veniam velit proident qui deserunt anim incididunt sunt
                        magna et. Tempor exercitation consequat et eiusmod
                        eiusmod exercitation est occaecat esse.
                    </p>
                </div>
            ) : null}
            {children}
        </div>
    );
};

export default CartSideover;
