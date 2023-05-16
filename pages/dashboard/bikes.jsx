import DashboardNav from '@/components/DashboardNav';
import Private from '@/layouts/Private';
import { useEffect } from 'react';

const Bikes = () => {
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/bikes');
    }, []);
    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div>Bikes</div>
            </div>
        </Private>
    );
};

export default Bikes;
