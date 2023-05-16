const { useState, createContext, useEffect } = require('react');

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        open: false,
        items: [],
    });

    useEffect(() => {
        if (sessionStorage.getItem('cart')) {
            setCart(JSON.parse(sessionStorage.getItem('cart')));
        }
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
