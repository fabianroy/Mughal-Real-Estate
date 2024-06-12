import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../../hooks/usePublicAxios";
import { FaTrash } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const ManageReviews = () => {
    const axiosPublic = usePublicAxios();
    const axiosSecure = useAxios();

    const { data: reviews, refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`https://mughal-server.vercel.app/reviews`);
            return data;
        }
    });

    const handleRemoveReview = review => {
        Swal.fire({
            title: `Are you sure to remove this review?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then(res => {
            if (res.isConfirmed) {
                axiosSecure.delete(`/reviews/${review._id}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: `Review removed`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => {
                        console.error("Error deleting review:", error);
                        Swal.fire({
                            icon: "error",
                            title: `Failed to remove review`,
                            text: error.response?.data?.message || "Something went wrong"
                        });
                    });
            }
        });
    };

    return (
        <div>
            <h2 className="text-3xl text-center font-semibold mb-10">Manage Reviews</h2>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Property ID</th>
                        <th>Review Title</th>
                        <th>Review</th>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews && reviews.map((review, index) => (
                        <tr key={review._id}>
                            <td>{index + 1}</td>
                            <td>{review.propertyId}</td>
                            <td>{review.reviewTitle}</td>
                            <td>{review.review}</td>
                            <td>{review.customer}</td>
                            <td>{review.email}</td>
                            <td>{review.date}</td>
                            <td>
                                <button onClick={() => handleRemoveReview(review)} className="btn btn-error text-white"><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageReviews;
