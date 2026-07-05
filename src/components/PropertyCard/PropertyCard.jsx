import './PropertyCard.css';
import { Link } from "react-router-dom";


const PropertyCard = ({ property, onAddFavourite, isFavourite }) => {
  const description = property.shortDescription;
  const favourited = isFavourite(property.id);

  const handleFavClick = (e) => {
    // Prevent the Link from navigating when clicking the button
    e.preventDefault();
    onAddFavourite(property.id);
  };

   // Store property ID in drag event
  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", property.id);
  };
  
  return (
    <Link to={`/property/${property.id}`} className="property-link">
      <div
        className="property-card"
        draggable
        onDragStart={handleDragStart}
      >
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

        <button
          className={`fav-btn ${favourited ? 'fav-btn--active' : ''}`}
          onClick={handleFavClick}
          aria-label={favourited ? 'Remove from favourites' : 'Add to favourites'}
          type="button"
        >
          {favourited ? '♥' : '♡'}
        </button>
      </div>
    </Link>
  );
};

export default PropertyCard;