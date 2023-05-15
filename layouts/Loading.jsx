/**
 * @description
 * Z-index: 201
 * @copyright
 * Musiur Alam Opu
 *
 */

import { LoadingContext } from '@/contexts/LoadingProvider';
import { Loading as Loader } from '@nextui-org/react';
import { useContext, useEffect } from 'react';

const Loading = ({ children }) => {
    const { loading, setLoading } = useContext(LoadingContext);

    useEffect(() => {
        setTimeout(() => {
            setLoading(null);
        }, 5000);
    }, [loading]);

    return (
        <>
            {loading ? (
                <div className='loading__container'>
                    <Loader size='xl' className='loading__container_loader' />
                </div>
            ) : null}
            {children}
        </>
    );
};

export default Loading;
