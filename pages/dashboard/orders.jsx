import DashboardNav from '@/components/DashboardNav';
import Private from '@/layouts/Private';
import { useEffect } from 'react';

const Orders = () => {
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/orders');
    }, []);
    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div>orders</div>
            </div>
        </Private>
    );
};

export default Orders;
