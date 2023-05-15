import { createContext, useState } from 'react';

export const MessageContext = createContext(null);

const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export default MessageProvider;
