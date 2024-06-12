import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const MyAddedItems = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();

    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/properties/agent/${user.email}`);
            return data;
        }
    });

    const handleRemoveItem = (item) => {
        Swal.fire({
            title: `Are you sure to remove ${item.propertyTitle}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/properties/${item._id}`)
                    .then(() => {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Your property has been deleted.',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire(
                            'Error!',
                            'Something went wrong.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div>
            <div className="flex items-center justify-evenly my-4">
                <h2 className="text-3xl font-semibold">My Added Properties</h2>
                <h2 className="text-3xl font-semibold">Total Added Properties: {properties.length}</h2>
            </div>

            <div className="my-12">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Photo</th>
                                <th>Property Title</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Update</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{item.propertyTitle}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{item.location}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold text-orange-600">BDT {item.priceRange}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{item.status}</div>
                                    </td>
                                    <td>
                                        <Link to={`/dashboard/updateProperty/${item._id}`} className="btn btn-warning text-white" disabled={item.status === "Verified" || item.status === "Rejected"}>
                                            <FaEdit />
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveItem(item)} className="btn btn-error text-white" disabled={item.status === "Verified"}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyAddedItems;

