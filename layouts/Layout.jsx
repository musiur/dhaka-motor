import Footer from '@/components/Footer';
import NavigationBar from '@/components/NavigationBar';
import Loading from './Loading';
import Message from './Message';
import ContextWrapper from '@/contexts/ContextWrapper';

const Layout = ({ children }) => {
    return (
        <ContextWrapper>
            <Message>
                <Loading>
                    <NavigationBar />
                    {children}
                    <Footer />
                </Loading>
            </Message>
        </ContextWrapper>
    );
};

export default Layout;
