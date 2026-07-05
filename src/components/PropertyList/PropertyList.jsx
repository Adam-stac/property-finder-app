import './PropertyList.css';
import PropertyCard from '../PropertyCard/PropertyCard';

const PropertyList = ({ properties, onAddFavourite, isFavourite, onRemoveFavourite }) => {

  // Dropping a favourite item onto the results list removes it
  const handleDrop = (e) => {
    e.preventDefault();
    const removeId = e.dataTransfer.getData("removeFavouriteId");
    if (removeId) onRemoveFavourite(removeId);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="property-list"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
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