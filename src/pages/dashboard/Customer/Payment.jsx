import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);
console.log(stripePromise);
import CheckOut from './CheckOut';

const Payment = () => {
    const location = useLocation();
    const { amount } = location.state;

    return (
        <div>
            <div className="flex justify-between items-center mb-16">
                <h2 className="text-2xl font-semibold">Amount : BDT {amount}</h2>
                <h2 className="text-2xl font-bold italic text-blue-600">Pay with Stripe</h2>
            </div>
            <div className="md:w-[400px] mx-auto my-40">
                <Elements stripe={stripePromise}>
                    <CheckOut amount={amount} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
