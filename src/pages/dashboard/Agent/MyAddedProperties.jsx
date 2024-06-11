import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import useProperties from "../../../hooks/useProperties";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyAddedItems = () => {

    const [property, refetch] = useProperties();
    const axiosSecure = useAxios();

    const handleRemoveItem = item => {
        Swal.fire({
            title: `Are you sure to remove ${item.propertyTitle}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        })
            .then(res => {
                if (res.isConfirmed) {
                    axiosSecure.delete(`/properties/${item._id}`)
                        .then(() => {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })
                        .catch(error => {
                            console.error(error);
                            Swal.fire(
                                'Error!',
                                'Something went wrong',
                                'error'
                            )
                        });
                }
            });
    }


    return (
        <div>
            <div className="flex items-center justify-evenly my-4">
                <h2 className="text-3xl font-semibold">My Added Properties</h2>
                <h2 className="text-3xl font-semibold">Total Added Properties : {property.length} </h2>
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
                            {property.map((item, index) => (
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
                                        <Link to={`/dashboard/updateProperty/${item._id}`} className="btn btn-warning text-white">
                                            <FaEdit></FaEdit>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleRemoveItem(item)} className="btn btn-error text-white">
                                            <FaTrash></FaTrash>
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