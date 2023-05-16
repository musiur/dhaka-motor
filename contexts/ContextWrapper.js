import CartProvider from './CartProvider';
import LoadingProvider from './LoadingProvider';
import MessageProvider from './MessageProvider';
import UserProvider from './UserProvider';

const ContextWrapper = ({ children }) => {
    return (
        <LoadingProvider>
            <MessageProvider>
                <UserProvider>
                    <CartProvider>{children}</CartProvider>
                </UserProvider>
            </MessageProvider>
        </LoadingProvider>
    );
};

export default ContextWrapper;
