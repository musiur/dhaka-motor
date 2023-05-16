import DashboardNav from '@/components/DashboardNav';
import { useEffect } from 'react';

const Dashboard = () => {
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard');
    }, []);
    return (
        <div className='dashboardnav__container'>
            <DashboardNav />
        </div>
    );
};

export default Dashboard;
