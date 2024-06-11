import { useForm } from "react-hook-form";
import { FaBuilding } from "react-icons/fa";
import usePublicAxios from "../../../hooks/usePublicAxios";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {

    const { register, handleSubmit } = useForm();
    const axiosPublic = usePublicAxios();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const { user } = useAuth();

    const onSubmit = async data => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const menuItem = {
                propertyTitle: data.propertyTitle,
                location: data.location,
                agentName: data.agentName,
                agentEmail: data.agentEmail,
                priceRange: data.priceRange,
                image: res.data.data.display_url,
                status: 'pending'
            };
            const propertyRes = await axiosSecure.post('/properties', menuItem);
            console.log(propertyRes.data);
            if (propertyRes.data.insertedId) {
                navigate('/dashboard/myaddedproperties');
                Swal.fire({
                    icon: 'success',
                    title: 'Property Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div>
            <h2 className="text-3xl text-center font-semibold">Add Item</h2>
            <div className="w-full m-4 md:m-4 md:w-[500px] md:mx-auto lg:my-10 shadow-lg p-6 rounded-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Property Title"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('propertyTitle', { required: true })}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Location"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('location', { required: true })}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Agent Name"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('agentName', { required: true })}
                            defaultValue={user.displayName}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Agent Email"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('agentEmail', { required: true })}
                            defaultValue={user.email}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Price Range"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('priceRange', { required: true })}
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            className="file-input file-input-bordered file-input-warning w-full"
                            {...register('image', { required: true })}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-warning w-full mt-4">
                            <FaBuilding /> Add Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;