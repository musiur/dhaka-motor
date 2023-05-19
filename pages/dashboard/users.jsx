import ButtonG from '@/components/ButtonG';
import DashboardNav from '@/components/DashboardNav';
import ImageG from '@/components/ImageG';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import Private from '@/layouts/Private';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);
    const FetchAllUsers = async () => {
        setLoading(true);

        try {
            const API = `${process.env.BASE_URL}/api/users?username=admin`;
            const response = await axios.get(API);
            if (response.status === 200) {
                console.log(response);
                setUsers(response.data.result);
                setMessage({
                    type: true,
                    message: 'Data fetch successful!',
                });
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 404) {
                setMessage({
                    type: false,
                    message: 'User not found!',
                });
            } else {
                setMessage({
                    type: false,
                    message: 'Something went wrong!',
                });
            }
        }

        setLoading(false);
    };
    const DeleteUser = async (username) => {
        setLoading(true);

        try {
            const API = `${process.env.BASE_URL}/api/users/delete?username=${username}`;
            const response = await axios.delete(API);
            if (response.status === 200) {
                console.log(response);
                setUsers([
                    ...users.filter((item) => item.username !== username),
                ]);
                setMessage({
                    type: false,
                    message: 'User deleted successful!',
                });
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 404) {
                setMessage({
                    type: false,
                    message: 'User not found!',
                });
            } else {
                setMessage({
                    type: false,
                    message: 'Something went wrong!',
                });
            }
        }

        setLoading(false);
    };
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/users');
    }, []);

    useEffect(() => {
        user && FetchAllUsers();
    }, [user]);
    console.log(users.length);
    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div className='dashboard__contents'>
                    <h1 className='mb-5 text-xl font-bold lg:text-3xl'>
                        Users
                    </h1>
                    <div className='flex flex-wrap items-center justify-start gap-4'>
                        {/* grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
                        {users.length
                            ? users.map((item) => {
                                  const { username, image } = item;
                                  return (
                                      <div
                                          item={username}
                                          className='rounded-xl border shadow-md hover:shadow-2xl'
                                      >
                                          <div className='h-[200px] w-full overflow-hidden rounded-xl'>
                                              <ImageG src={image} />
                                          </div>
                                          <p className='lg:text-md p-3 text-center text-sm font-semibold uppercase'>
                                              {username}
                                              <span className='text-sm font-normal lowercase text-gray-400'>
                                                  @{username}
                                              </span>
                                          </p>
                                          <div className='w-full border p-2'>
                                              <button
                                                  className='w-full rounded-lg bg-red-600 px-3 py-1 font-medium text-white'
                                                  onClick={() =>
                                                      DeleteUser(username)
                                                  }
                                              >
                                                  Delete
                                              </button>
                                          </div>
                                      </div>
                                  );
                              })
                            : 'No user found!'}
                    </div>
                </div>
            </div>
        </Private>
    );
};

export default Users;
