import { MessageContext } from '@/contexts/MessageProvider';
import { useContext, useEffect } from 'react';

const Message = ({ children }) => {
    const { message, setMessage } = useContext(MessageContext);

    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }, [message]);

    return (
        <>
            {message ? (
                <div
                    className={`message__container ${
                        message.type
                            ? 'message__container_success'
                            : 'message__container_error'
                    }`}
                >
                    {message.message}
                </div>
            ) : null}
            {children}
        </>
    );
};

export default Message;
