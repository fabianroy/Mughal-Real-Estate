import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyWishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxios();

    const { data: wishlist, refetch } = useQuery({
        queryKey: ['wishlist', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/user/${user.email}`);
            return data;
        }
    });

    const handleDeleteWishlist = (item) => {
        Swal.fire({
            title: `Are you sure to remove this item from wishlist?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then(res => {
            if (res.isConfirmed) {
                axiosSecure.delete(`/wishlist/${item._id}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: `Item removed from wishlist`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => {
                        console.error("Error deleting item from wishlist:", error);
                        Swal.fire({
                            icon: "error",
                            title: `Failed to remove item from wishlist`,
                            text: error.response?.data?.message || "Something went wrong"
                        });
                    });
            }
        });
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-semibold mb-10">My Wishlist</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Property ID</th>
                        <th>Property Title</th>
                        <th>Price</th>
                        <th>Agent</th>
                        <th>Offer</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlist?.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td className="mask mask-squircle w-12 h-12"><img className="avatar" src={item.image} alt="" /></td>
                            <td>{item.propertyId}</td>
                            <td>{item.propertyTitle}</td>
                            <td>BDT {item.priceRange}</td>
                            <td>{item.agentName}</td>
                            <td>
                                <Link to={`/dashboard/makeoffer/${item._id}`} className="btn btn-info text-white">Make An Offer</Link>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteWishlist(item)} className="btn btn-error text-white"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyWishlist;
