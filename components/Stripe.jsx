import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        console.log({ error, paymentMethod });
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
