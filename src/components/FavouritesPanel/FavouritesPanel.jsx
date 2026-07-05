import "./FavouritesPanel.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const FavouritesPanel = ({ favourites, onRemoveFavourite, onClearFavourites, onAddFavourite }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // Drag a card over the panel = highlight it
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Drop card onto panel = add to favourites
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const propertyId = e.dataTransfer.getData("propertyId");
    if (propertyId) onAddFavourite(propertyId);
  };

  // Drag a favourite item out = remove from favourites
  const handleItemDragStart = (e, propertyId) => {
    e.dataTransfer.setData("removeFavouriteId", propertyId);
  };

  return (
    <div
      className={`favourites-panel ${isDragOver ? 'favourites-panel--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="favourites-header">
        <h3>❤ Favourites</h3>
        <button
          type="button"
          onClick={onClearFavourites}
          disabled={favourites.length === 0}
          className="clear-btn"
        >
          Clear all
        </button>
      </div>

      {favourites.length === 0 ? (
        <p className="favourites-empty">
          Drag a property here or click ♡ to save it.
        </p>
      ) : (
        <ul className="favourites-list">
          {favourites.map((property) => (
            <li
              key={property.id}
              className="favourite-item"
              draggable
              onDragStart={(e) => handleItemDragStart(e, property.id)}
            >
              <img
                src={property.picture}
                alt={property.location}
                className="favourite-thumb"
              />
              <div className="favourite-info">
                <Link to={`/property/${property.id}`} className="favourite-link">
                  {property.location}
                </Link>
                <span className="favourite-price">£{property.price.toLocaleString()}</span>
              </div>
              {/* Remove button */}
              <button
                type="button"
                onClick={() => onRemoveFavourite(property.id)}
                aria-label="Remove from favourites"
                className="remove-btn"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesPanel;