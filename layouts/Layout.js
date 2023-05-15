import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Loading from './Loading';
import Message from './Message';
import ContextWrapper from '@/contexts/ContextWrapper';

const Layout = ({ children }) => {
    return (
        <ContextWrapper>
            <Message>
                <Loading>
                    <Navbar />
                    {children}
                    <Footer />
                </Loading>
            </Message>
        </ContextWrapper>
    );
};

export default Layout;
