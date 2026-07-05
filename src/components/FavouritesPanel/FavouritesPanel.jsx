import "./FavouritesPanel.css";
import { Link } from "react-router-dom";

const FavouritesPanel = ({ favourites, onRemoveFavourite, onClearFavourites }) => {
  return (
    <div className="favourites-panel">
      <div className="favourites-header">
        <h3>Favourites</h3>

        <button
          type="button"
          onClick={onClearFavourites}
          disabled={favourites.length === 0}
        >
          Clear
        </button>
      </div>

      {favourites.length === 0 ? (
        <p className="favourites-empty">
          No favourites yet. Click ♡ on a property to add one.
        </p>
      ) : (
        <ul className="favourites-list">
          {favourites.map((property) => (
            <li key={property.id} className="favourite-item">
              <Link to={`/property/${property.id}`}>
                {property.location}
              </Link>

              <button
                type="button"
                onClick={() => onRemoveFavourite(property.id)}
                aria-label="Remove from favourites"
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
