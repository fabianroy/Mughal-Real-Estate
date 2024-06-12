import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router-dom';

const PropertyBought = () => {

    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers/user/${user.email}`);
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
                        <th>Order ID</th>
                        <th>Property Title</th>
                        <th>Price</th>
                        <th>Agent</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        properties?.map((property, index) => (
                            <tr key={property._id}>
                                <td>{index + 1}</td>
                                <td>{property._id}</td>
                                <td>{property.propertyTitle}</td>
                                <td>BDT {property.priceRange}</td>
                                <td>{property.agentName}</td>
                                <td>{property.date}</td>
                                <td>{property.status}</td>
                                <td><Link className='btn btn-success text-white'><button disabled={property.status === 'accepted'}>Pay</button></Link></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PropertyBought;