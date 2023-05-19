import DashboardNav from '@/components/DashboardNav';
import ImageG from '@/components/ImageG';
import { UserContext } from '@/contexts/UserProvider';
import Private from '@/layouts/Private';
import { useContext, useEffect } from 'react';

const Profile = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/profile');
    }, []);
    console.log(user);
    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div className="dashboard__contents">
                {user ? (
                    <div>
                        <div className='h-[150px] w-[150px] overflow-hidden rounded-xl'>
                            <ImageG src={user.image} />
                        </div>
                        <h2 className='text-xl font-bold uppercase lg:text-2xl mt-2'>   
                            {user.username} <span className="lowercase text-md text-gray-300 font-normal">@{user.username}</span>
                        </h2>
                        <p className="text-gray-400">{user.email} || {user.mobile}</p>
                        <p className="text-gray-400">{user.address}</p>
                        <div></div>
                    </div>
                ) : (
                    'No data found'
                )}
                </div>
            </div>
        </Private>
    );
};

export default Profile;
