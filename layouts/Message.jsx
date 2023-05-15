import { MessageContext } from '@/contexts/MessageProvider';
import { useContext } from 'react';

const Message = ({ children }) => {
    const { message, setMessage } = useContext(MessageContext);
    console.log({ message });
    return (
        <div>
            <div>Message</div>
            {children}
        </div>
    );
};

export default Message;
