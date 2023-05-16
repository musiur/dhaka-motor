import DashboardNav from '@/components/DashboardNav';
import Private from '@/layouts/Private';
import { useEffect } from 'react';

const Users = () => {
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/users');
    }, []);
    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div>Users</div>
            </div>
        </Private>
    );
};

export default Users;
