// 'useClient';

import DashboardNav from '@/components/DashboardNav';
import Private from '@/layouts/Private';
import { useEffect } from 'react';

const Sells = () => {
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/sells');
    }, []);
    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div>sells</div>
            </div>
        </Private>
    );
};

export default Sells;
