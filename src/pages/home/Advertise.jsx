import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../hooks/usePublicAxios";
import { Link } from "react-router-dom";

const Advertise = () => {

    const publicAxios = usePublicAxios();

    const { data: add = [] } = useQuery({
        queryKey: "advertise",
        queryFn: async () => {
            const response = await publicAxios.get("/properties");
            return response.data;
        },

    })

    return (
        <div>
            <h2 className="my-10 text-center text-2xl font-semibold">Explore Our Premium Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {add.map((ad) => (
                    <div key={ad._id} className="card bordered">
                        <figure>
                            <img className="w-full h-52" src={ad.image} alt={ad.title} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{ad.propertyTitle}</h2>
                            <p className="font-semibold mb-2">{ad.location}</p>
                            <p className="mb-4 font-semibold">BDT: {ad.priceRange}</p>
                            <p className="mb-4">Status: {ad.status}</p>
                            <Link to={`/propertydetails/${ad._id}`} className="btn btn-info">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Advertise;