import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

const PropertyCard = ({ item }) => {

    const { _id, propertyTitle, location, priceRange, status, image, agentName, } = item;

    return (
        <div>
            <div className="card bordered shadow-lg w-96">
                <figure>
                    <img className="w-full h-60" src={image} alt={propertyTitle} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{propertyTitle}</h2>
                    <p className="font-semibold">{location}</p>
                    <p>Price: BDT {priceRange}</p>
                    <p>Status: {status}</p>
                    <p>Agent: {agentName}</p>
                    <Link to={`/propertydetails/${_id}`} className="btn btn-info mt-4">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;

PropertyCard.propTypes = {
    item: PropTypes.object
}