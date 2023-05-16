const { useState, createContext } = require('react');

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({
        open: false,
        items: []
    });

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
