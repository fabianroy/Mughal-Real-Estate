// ManageProperties.jsx

import useProperties from "../../../hooks/useProperties";
import useAxios from "../../../hooks/useAxios";

const ManageProperties = () => {
    const [property, refetch] = useProperties();
    const axiosSecure = useAxios();


    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await axiosSecure.patch(`/properties/${id}/status`, { status });
            if (response.status === 200) {
                refetch(); //
            }
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-evenly my-4">
                <h2 className="text-3xl font-semibold">All Properties</h2>
                <h2 className="text-3xl font-semibold">Total Properties : {property.length} </h2>
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
                                <th>Agent</th>
                                <th>Email</th>
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
                                        <div className="font-semibold">{item.agentName}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{item.agentEmail}</div>
                                    </td>
                                    <td>
                                        <div className="font-semibold">{item.status}</div>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-success text-white"
                                            onClick={() => handleStatusUpdate(item._id, 'Verified')}
                                        >
                                            Verify
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-error text-white"
                                            onClick={() => handleStatusUpdate(item._id, 'Rejected')}
                                        >
                                            Reject
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

export default ManageProperties;
