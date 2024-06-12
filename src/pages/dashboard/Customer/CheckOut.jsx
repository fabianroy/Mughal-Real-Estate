import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import PropTypes from 'prop-types';

const CheckOut = ({ amount, agentEmail }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const axiosSecure = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: amount })
            .then(res => {
                console.log(res.data.clientSecret); 
                setClientSecret(res.data.clientSecret);
            })
            .catch(error => {
                console.error('Error fetching client secret:', error);
            });
    }, [axiosSecure, amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                },
            }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            console.log('[PaymentIntent]', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                // now save the payment to the database
                const payment = {
                    transactionId: paymentIntent.id,
                    name: user.displayName,
                    email: user.email,
                    amount: amount,
                    agent: agentEmail,
                    date: new Date().toDateString(),
                    status: "Paid",
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    text: `Your payment was successful. Your transaction ID is ${paymentIntent.id}`,
                    confirmButtonText: 'Okay'
                });
                navigate('/');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="border p-4 rounded-md"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}>
            </CardElement>
            <div className="w-fit mx-auto mt-8">
                <button disabled={!stripe || !clientSecret} className="btn px-12 btn-success text-white" type="submit">
                    Pay
                </button>
            </div>
            <div className="mt-20 text-center">
                {
                    transactionId && <p className="text-green-600 text-xl font-semibold">Payment Successful. Transaction ID: {transactionId}</p>
                }
                {
                    error && <p className="text-red-600 text-xl font-semibold">{error}</p>
                }
            </div>
        </form>
    );
};

export default CheckOut;

CheckOut.propTypes = {
    amount: PropTypes.number,
    agentEmail: PropTypes.string
}