import './PropertyCard.css';
import { Link } from "react-router-dom";


const PropertyCard = ({ property }) => {
  const description = property.shortDescription;
  
  return (
    <Link to={`/property/${property.id}`} className="property-link">
      <div className="property-card">
        <img 
          src={property.picture} 
          alt={`Property in ${property.location}`}
          className="property-image"
        />

        <div className="property-price">
          £{property.price.toLocaleString()}
        </div>

        <p className="property-description">
          {description}
        </p>
        
        <div className="property-details">
          <span className="property-type">{property.type}</span>
          <span className="property-bedrooms">{property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
          <span className="property-location">{property.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;