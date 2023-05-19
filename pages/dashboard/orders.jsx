import DashboardNav from '@/components/DashboardNav';
import ImageG from '@/components/ImageG';
import { LoadingContext } from '@/contexts/LoadingProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import Private from '@/layouts/Private';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const Orders = () => {
    useEffect(() => {
        sessionStorage.setItem('from', '/dashboard/orders');
    }, []);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);

    const [orders, setOrders] = useState([]);

    const FetchAllOrders = async () => {
        setLoading(true);

        try {
            const API = `${process.env.BASE_URL}/api/orders?username=admin`;
            const response = await axios.get(API);
            if (response.status === 200) {
                setOrders(response.data.result);
                setMessage({
                    type: true,
                    message: 'Data fetch successful!',
                });
            }
        } catch (error) {
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
        FetchAllOrders();
    }, []);

    return (
        <Private>
            <div className='dashboardnav__container'>
                <DashboardNav />
                <div className='dashboard__contents'>
                    <h1 className='mb-5 text-xl font-bold lg:text-3xl'>
                        Orders
                    </h1>
                    <div className='overflow-x-scroll'>
                        {orders.length ? (
                            <table className='min-w-[600px]'>
                                <thead className='rounded-t-xl bg-blue-400 text-white'>
                                    <tr>
                                        {Object.keys(orders[0]).map((td, i) => {
                                            return (
                                                <th
                                                    key={i}
                                                    className='px-4 py-2 uppercase'
                                                >
                                                    {td}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                {Object.values(item).map(
                                                    (td, i) => {
                                                        let images = [];
                                                        if (i === 6) {
                                                            const temp =
                                                                JSON.parse(td);
                                                            images = temp.map(
                                                                (tempImg) =>
                                                                    tempImg.image
                                                            );
                                                        }

                                                        return (
                                                            <td
                                                                key={i}
                                                                className={`px-4 py-2 uppercase ${
                                                                    item.id %
                                                                        2 ===
                                                                    0
                                                                        ? 'bg-blue-50'
                                                                        : 'bg-white'
                                                                }`}
                                                            >
                                                                {i === 6 ? (
                                                                    <div className='flex w-full min-w-[350px] flex-wrap items-center justify-start gap-1'>
                                                                        {images.map(
                                                                            (
                                                                                image,
                                                                                i
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                        className='m-1 h-[100px] w-[100px] overflow-hidden rounded-lg bg-gray-50'
                                                                                    >
                                                                                        <ImageG
                                                                                            src={
                                                                                                image
                                                                                            }
                                                                                            alt=''
                                                                                        />
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </div>
                                                                ) : i === 0 ? (
                                                                    <div>
                                                                        {td == 1
                                                                            ? 'Yes'
                                                                            : 'No'}
                                                                    </div>
                                                                ) : (
                                                                    td
                                                                )}
                                                            </td>
                                                        );
                                                    }
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            'No orders found!'
                        )}
                    </div>
                </div>
            </div>
        </Private>
    );
};

export default Orders;
