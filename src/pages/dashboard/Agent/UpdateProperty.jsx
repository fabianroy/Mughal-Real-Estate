import { useForm } from "react-hook-form";
import { FaBuilding } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProperty = () => {

    const { register, handleSubmit } = useForm();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const item = useLoaderData();

    const { _id, propertyTitle, location, agentName, agentEmail, priceRange } = item;

    const onSubmit = async (data) => {
        console.log(data);

        const updatedProperty = {
            propertyTitle: data.propertyTitle,
            location: data.location,
            agentName: data.agentName,
            agentEmail: data.agentEmail,
            priceRange: data.priceRange,
            status: 'pending',
        };

        const propertyRes = await axiosSecure.put(`/properties/${_id}`, updatedProperty);
        if (propertyRes.data.modifiedCount > 0) {
            navigate('/dashboard/myaddedproperties');
            Swal.fire({
                icon: 'success',
                title: 'Property Updated Successfully',
                showConfirmButton: false,
                timer: 1500
            });
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
                            defaultValue={propertyTitle}
                            placeholder="Property Title"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('propertyTitle', { required: true })}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            defaultValue={location}
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
                            defaultValue={agentName}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Agent Email"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('agentEmail', { required: true })}
                            defaultValue={agentEmail}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            defaultValue={priceRange}
                            placeholder="Price Range"
                            className="input input-bordered border-yellow-500 w-full"
                            {...register('priceRange', { required: true })}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-warning w-full mt-4">
                            <FaBuilding /> Update Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProperty;