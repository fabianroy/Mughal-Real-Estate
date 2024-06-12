import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const PropertyBought = () => {

    const { user } = useAuth();
    const axiosSecure = useAxios();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/user/${user.email}`);
            return res.data;
        }
    });

    return (
        <div>
            <h2 className="text-3xl text-center font-semibold mb-10">Property Bought</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Payment ID</th>
                        <th>Transaction ID</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payments?.map((payment, index) => (
                            <tr key={payment._id}>
                                <td>{index + 1}</td>
                                <td>{payment._id}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.date}</td>
                                <td>{payment.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PropertyBought;