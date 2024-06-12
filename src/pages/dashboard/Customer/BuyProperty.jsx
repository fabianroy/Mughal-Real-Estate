import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const BuyProperty = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers/user/${user.email}`);
            return res.data;
        }
    });

    const handleRemoveOrder = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this order!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/offers/${id}`)
                    .then(() => {
                        refetch();
                        Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
                    });
            }
        });
    }

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
                        <th>Action</th>
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
                                {
                                    property.status === 'Accepted' ?
                                        <td>
                                            <Link to={`/dashboard/payment/${property._id}`} state={{ amount: property.priceRange, agentEmail: property.agentEmail }} className='btn btn-success text-white'>
                                                Pay
                                            </Link>
                                        </td>
                                        :
                                        <td>
                                            <button onClick={() => handleRemoveOrder(property._id)} className='btn btn-error text-white'>
                                                <FaTrash />
                                            </button>
                                        </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default BuyProperty;
