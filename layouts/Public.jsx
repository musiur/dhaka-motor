import { UserContext } from '@/contexts/UserProvider';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const Public = ({ children }) => {
    const { user } = useContext(UserContext);
    const Router = useRouter();

    useEffect(() => {
        if (user) {
            Router.push('/dashboard/profile');
        }
    }, [user]);

    return <div>{!user ? children : null}</div>;
};

export default Public;
