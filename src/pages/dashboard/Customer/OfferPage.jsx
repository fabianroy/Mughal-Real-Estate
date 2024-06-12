import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const OfferPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [offer, setOffer] = useState(null);

    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ['offerDetails', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/wishlist/user/${user.email}`);
            return data;
        }
    });

    useEffect(() => {
        if (wishlist.length > 0) {
            setOffer(wishlist[0]);
            reset(wishlist[0]);
        }
    }, [wishlist, reset]);

    const onSubmit = async (data) => {
        console.log(data);

        const newOffer = {
            propertyTitle: data.propertyTitle,
            location: data.location,
            agentName: data.agentName,
            agentEmail: data.agentEmail,
            priceRange: data.priceRange,
            name: data.customer,
            email: data.email,
            status: 'pending',
            date: new Date().toISOString(),
        };

        try {
            const offerRes = await axiosSecure.post('/offers', newOffer);
            const deleteRes = await axiosSecure.delete(`/wishlist/${offer._id}`)
            console.log(offerRes, deleteRes);
            navigate('/dashboard/mywishlist');
            Swal.fire({
                icon: 'success',
                title: 'Offer Made Successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error making offer:", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to make offer',
                text: error.response?.data?.message || 'Something went wrong'
            });
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-semibold">Add Item</h2>
            <div className="w-full m-4 md:m-4 md:w-[500px] md:mx-auto lg:my-10 shadow-lg p-6 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input
                            type="text"
                            defaultValue={offer?.propertyTitle || ''}
                            placeholder="Property Title"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('propertyTitle', { required: true })}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            defaultValue={offer?.location || ''}
                            placeholder="Location"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('location', { required: true })}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            defaultValue={offer?.agentName}
                            placeholder="Agent Name"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('agentName', { required: true })}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            defaultValue={offer?.agentEmail}
                            placeholder="Agent Email"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('agentEmail', { required: true })}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            defaultValue={offer?.priceRange}
                            placeholder="Price Range"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('priceRange', { required: true })}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            defaultValue={offer?.customer}
                            type="text"
                            placeholder="Customer Name"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('customer', { required: true })}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            defaultValue={offer?.email}
                            type="email"
                            placeholder="Customer Email"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('email', { required: true })}
                            readOnly
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-warning w-full mt-4">
                            Make Offer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OfferPage;
