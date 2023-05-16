import { UserContext } from '@/contexts/UserProvider';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const Private = ({ children }) => {
    const { user } = useContext(UserContext);
    const Router = useRouter();

    useEffect(() => {
        if (!user) {
            Router.push('/signin');
        }
    }, [user]);

    return <div>{user ? children : null}</div>;
};

export default Private;
