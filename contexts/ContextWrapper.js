import LoadingProvider from './LoadingProvider';
import MessageProvider from './MessageProvider';
import UserProvider from './UserProvider';

const ContextWrapper = ({ children }) => {
    return (
        <LoadingProvider>
            <MessageProvider>
                <UserProvider>{children}</UserProvider>
            </MessageProvider>
        </LoadingProvider>
    );
};

export default ContextWrapper;
