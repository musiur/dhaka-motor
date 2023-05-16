import DashboardNav from '@/components/DashboardNav';
import Private from '@/layouts/Private';
import { useEffect } from 'react';

const Profile = () => {
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/profile');
    }, []);
    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div>profile</div>
            </div>
        </Private>
    );
};

export default Profile;
