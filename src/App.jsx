import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from 'react';
import PropertyList from './components/PropertyList/PropertyList';
import SearchForm from './components/SearchForm/SearchForm';
import PropertyDetail from './components/PropertyDetail/PropertyDetail';
import FavouritesPanel from './components/FavouritesPanel/FavouritesPanel';
import propertiesData from './data/properties.json';


function App() {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);

  // ✅ NEW: favourites stored as IDs (prevents duplicates easily)
  const [favouriteIds, setFavouriteIds] = useState(() => {
    const saved = localStorage.getItem("favouriteIds");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ NEW: persist favourites client-side
  useEffect(() => {
    localStorage.setItem("favouriteIds", JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  // ✅ NEW: build favourite property objects from ids
  const favouriteProperties = useMemo(() => {
    return favouriteIds
      .map((id) => propertiesData.properties.find((p) => p.id === id))
      .filter(Boolean);
  }, [favouriteIds]);

  // ✅ NEW: add/remove/clear + duplicate prevention
  const addToFavourites = (propertyId) => {
    setFavouriteIds((prev) => (prev.includes(propertyId) ? prev : [...prev, propertyId]));
  };

  const removeFromFavourites = (propertyId) => {
    setFavouriteIds((prev) => prev.filter((id) => id !== propertyId));
  };

  const clearFavourites = () => setFavouriteIds([]);

  const isFavourite = (propertyId) => favouriteIds.includes(propertyId);

  const handleSearch = (searchCriteria) => {
  console.log('Search criteria:', searchCriteria);
  
  const filtered = propertiesData.properties.filter(property => {
    //Property type filter
    if (searchCriteria.type && property.type !== searchCriteria.type) {
      return false;
    }
    
    //Price range filter
    if (searchCriteria.minPrice && property.price < parseInt(searchCriteria.minPrice)) {
      return false;
    }
    if (searchCriteria.maxPrice && property.price > parseInt(searchCriteria.maxPrice)) {
      return false;
    }
    
    //Bedrooms filter
    if (searchCriteria.minBedrooms && property.bedrooms < parseInt(searchCriteria.minBedrooms)) {
      return false;
    }
    if (searchCriteria.maxBedrooms && property.bedrooms > parseInt(searchCriteria.maxBedrooms)) {
      return false;
    }

    //Date filter
    if (searchCriteria.addedFrom && property.added < searchCriteria.addedFrom) {
      return false;
    }

    if (searchCriteria.addedTo && property.added > searchCriteria.addedTo) {
      return false;
    }

    //Postcode filter 
    if (searchCriteria.postcode) {
      //postcode area (e.g., "BR5" from "Petts Wood, Orpington BR5")
      const postcodeMatch = property.location.match(/([A-Z]{1,2}\d)/);
      const propertyPostcodeArea = postcodeMatch ? postcodeMatch[1] : '';
      
      if (!propertyPostcodeArea.startsWith(searchCriteria.postcode.toUpperCase())) {
        return false;
      }
    }
    
    //If all filters pass include the property
    return true;
  });
  
  setFilteredProperties(filtered);
};

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Property Finder</h1>
        </header>

        <main className="main-container">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                <div className="sidebar-stack">
                  <SearchForm onSearch={handleSearch} />
                  <FavouritesPanel
                    favourites={favouriteProperties}
                    onRemoveFavourite={removeFromFavourites}
                    onClearFavourites={clearFavourites}
                  />
                </div>
                <PropertyList properties={filteredProperties} />
                </>
              } 
            />
            <Route 
              path="/property/:id" 
              element={<PropertyDetail />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
 
  );
}

export default App;