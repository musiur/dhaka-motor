import Footer from '@/components/Footer';
import NavigationBar from '@/components/NavigationBar';
import Loading from './Loading';
import Message from './Message';
import ContextWrapper from '@/contexts/ContextWrapper';
import CartSideover from './CartSideover';

const Layout = ({ children }) => {
    return (
        <ContextWrapper>
            <Message>
                <Loading>
                    <CartSideover>
                        <NavigationBar />
                        {children}
                        <Footer />
                    </CartSideover>
                </Loading>
            </Message>
        </ContextWrapper>
    );
};

export default Layout;
