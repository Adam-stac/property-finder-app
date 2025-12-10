import './PropertyList.css';
import PropertyCard from '../PropertyCard/PropertyCard';

const PropertyList = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;