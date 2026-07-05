import './PropertyList.css';
import PropertyCard from '../PropertyCard/PropertyCard';

const PropertyList = ({ properties, onAddFavourite, isFavourite }) => {
  return (
    <div className="property-list">
      {properties.map(property => (
        <PropertyCard 
          key={property.id}
          property={property}
          onAddFavourite={onAddFavourite}
          isFavourite={isFavourite}
        />
      ))}
    </div>
  );
};

export default PropertyList;