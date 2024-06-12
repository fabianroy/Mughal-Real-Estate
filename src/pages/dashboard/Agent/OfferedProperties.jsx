import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const OfferedProperties = () => {

    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/offers/agent/${user.email}`);
            return res.data;
        }
    });

    const handleAccept = async (id) => {
        axiosSecure.patch(`/offers/${id}`, { status: 'Accepted' })
            .then(res => {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Accepted',
                    text: res.data.message
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'An error occurred'
                });
            });
    }

    const handleReject = async (id) => {
        axiosSecure.patch(`/offers/${id}`, { status: 'Rejected' })
            .then(res => {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Rejected',
                    text: res.data.message
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'An error occurred'
                });
            });
    }



    return (
        <div>
            <h2 className="text-3xl text-center font-semibold mb-10">Offered Properties</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Property Title</th>
                        <th>Price</th>
                        <th>Buyer</th>
                        <th>Buyer Email</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Accept</th>
                        <th>Reject</th>
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
                                <td>{property.name}</td>
                                <td>{property.email}</td>
                                <td>{property.date}</td>
                                <td>{property.status}</td>
                                <td><button className='btn btn-success text-white' onClick={() => handleAccept(property._id)}>Accept</button></td>
                                <td><button className='btn btn-error text-white' onClick={() => handleReject(property._id)}>Reject</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default OfferedProperties;