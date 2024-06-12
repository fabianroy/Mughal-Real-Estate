import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import usePublicAxios from "../../hooks/usePublicAxios";
import useAuth from "../../hooks/useAuth";

const PropertyDetails = () => {
    const property = useLoaderData();
    const { _id, propertyTitle, location, priceRange, status, image, agentName, agentEmail } = property;

    const axiosSecure = useAxios();
    const axiosPublic = usePublicAxios();
    const { user } = useAuth();

    const queryClient = useQueryClient();

    const { data: reviews, isLoading, error } = useQuery({
        queryKey: ['reviews', _id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`https://mughal-server.vercel.app/reviews/${_id}`);
            return data;
        }
    });

    const handleReview = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Add A Review',
            html: `
                <input type="text" id="reviewTitle" class="swal2-input" placeholder="Review Title">
                <textarea id="review" class="swal2-textarea" placeholder="Review"></textarea>
            `,
            showCancelButton: true,
            confirmButtonText: 'Add Review',
            preConfirm: () => {
                const reviewTitle = Swal.getPopup().querySelector('#reviewTitle').value;
                const review = Swal.getPopup().querySelector('#review').value;
                if (!reviewTitle || !review) {
                    Swal.showValidationMessage(`Please enter both title and review`);
                    return;
                }
                return axiosSecure.post(`https://mughal-server.vercel.app/reviews`, {
                    reviewTitle,
                    review,
                    propertyId: _id,
                    customer: user.displayName,
                    email: user.email,
                    date: new Date().toISOString()
                }).then(() => {
                    Swal.fire('Review Added', '', 'success');
                    queryClient.invalidateQueries(['reviews', _id]);
                }).catch(() => {
                    Swal.fire('Failed to add review', '', 'error');
                });
            }
        });
    };

    const handleAddToWishlist = () => {
        axiosSecure.post(`https://mughal-server.vercel.app/wishlist`, {
            propertyId: _id,
            customer: user.displayName,
            email: user.email,
            propertyTitle,
            location,
            priceRange,
            status,
            image,
            agentName,
            agentEmail,
        }).then(() => {
            Swal.fire('Added to Wishlist', '', 'success');
        }).catch(() => {
            Swal.fire('Failed to add to Wishlist', '', 'error');
        });
    };


    return (
        <div className="my-10">
            <div className="w-auto bordered shadow-lg flex flex-col lg:flex-row">
                <figure className="flex-1">
                    <img className="w-full" src={image} alt={propertyTitle} />
                </figure>
                <div className="p-10 flex-1">
                    <h2 className="text-3xl font-semibold">{propertyTitle}</h2>
                    <p className="text-lg font-semibold mt-4">{location}</p>
                    <hr className="my-6" />
                    <p className="font-semibold text-orange-600">Price: BDT {priceRange}</p>
                    <p className="font-semibold mt-2">Agent: {agentName}</p>
                    <p className="font-semibold mt-2">Agent Email: {agentEmail}</p>
                    <p className="font-semibold mt-2">Status: {status}</p>
                    <div className="mt-6 flex gap-4">
                        <button onClick={handleAddToWishlist} className="btn btn-accent">Add To Wishlist</button>
                        <button onClick={handleReview} className="btn btn-warning">Add A Review</button>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mt-10">Reviews ({reviews?.length})</h2>
                {isLoading && <p>Loading reviews...</p>}
                {error && <p>Error loading reviews</p>}
                {reviews && reviews.length === 0 && <p>No reviews yet</p>}
                {reviews && reviews.map((item, index) => (
                    <div key={item._id} className="border-b-2 border-gray-300 my-4 p-4">
                        <h3 className="font-semibold"><span>{index + 1}</span>. {item.reviewTitle}</h3>
                        <p>{item.review}</p>
                        <p className="text-sm mt-2">By {item.customer}</p>
                        <p className="text-sm">Date: {new Date(item.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PropertyDetails;
