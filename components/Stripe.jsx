import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { CartContext } from '@/contexts/CartProvider';
import { MessageContext } from '@/contexts/MessageProvider';
import { UserContext } from '@/contexts/UserProvider';
import { LoadingContext } from '@/contexts/LoadingProvider';
import axios from 'axios';
import { useRouter } from 'next/router';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cart, setCart } = useContext(CartContext);
    const { setMessage } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);
    const Router = useRouter();

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

    const calculateId = () => {
        if (!orders.length) {
            return 1;
        }
        const IDs = orders.map((item) => item.id);
        let max = IDs[0];
        for (let i = 0; i < IDs.length; i++) {
            if (max < IDs[i]) {
                max = IDs[i];
            }
        }

        return max + 1;
    };

    const CalculatePrice = (total, price) => {
        return total + price;
    };

    const DoOrder = async (data) => {
        setLoading(true);

        try {
            const API = `${process.env.BASE_URL}/api/orders/create`;
            const response = await axios.post(API, data);
            if (response.status === 200) {
                setMessage({
                    type: true,
                    message: 'Order completed successful!',
                });
                setCart({ type: false, items: [] });
                sessionStorage.removeItem('cart');
                Router.push('/dashboard/orders');
            }
        } catch (error) {
            setMessage({
                type: false,
                message: 'Something went wrong!',
            });
        }

        setLoading(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setMessage({
                type: false,
                message: 'Something went wrong!',
            });
        } else {
            const date = new Date();
            const data = {
                orders: [
                    {
                        payment: true,
                        id: orders.length ? calculateId() : 1,
                        username: user.username,
                        price: cart.items
                            .map((item) => item.price)
                            .reduce(CalculatePrice),
                        date: date.toLocaleDateString(),
                        insurance: 1,
                        bikes: JSON.stringify(cart.items),
                    },
                ],
            };
            DoOrder(data);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='mx-auto my-5 max-w-[500px] rounded-xl border p-3 shadow-xl lg:p-5'
        >
            <CardElement className='rounded-lg border p-3' />
            <button
                type='submit'
                disabled={!stripe || !elements}
                className='mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-white'
            >
                Pay
            </button>
        </form>
    );
};

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Stripe = () => {
    return (
        <Elements stripe={stripePromise}>
            <h3 className='mt-10 text-center text-xl font-bold text-blue-600 lg:text-2xl'>
                Pay with Stripe
            </h3>
            <CheckoutForm />
        </Elements>
    );
};
export default Stripe;
