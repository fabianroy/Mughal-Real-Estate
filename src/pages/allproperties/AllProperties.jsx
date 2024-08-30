import useProperties from "../../hooks/useProperties";
import PropertyCard from "./PropertyCard";

const AllProperties = () => {

    const [property] = useProperties();

    return (
        <div>
            <h2 className="text-2xl font-semibold text-center mb-10">All Properties</h2>
            <div className="w-fit grid grid-cols-1 md:grid-cols-3 gap-4 my-8 mx-auto">
                {
                    property.map(item => <PropertyCard key={item.id} item={item}></PropertyCard>)
                }
            </div>
        </div>
    );
};

export default AllProperties;