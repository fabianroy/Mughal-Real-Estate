import { useLoaderData } from "react-router-dom";

const PropertyDetails = () => {

    const property = useLoaderData();

    const { propertyTitle, location, priceRange, status, image, agentName, ahentEmail} = property;

    return (
        <div>
            
        </div>
    );
};

export default PropertyDetails;