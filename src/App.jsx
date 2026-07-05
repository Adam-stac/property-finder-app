import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useState } from 'react';
import PropertyList from './components/PropertyList/PropertyList';
import SearchForm from './components/SearchForm/SearchForm';
import PropertyDetail from './components/PropertyDetail/PropertyDetail';
import FavouritesPanel from './components/FavouritesPanel/FavouritesPanel';
import propertiesData from './data/properties.json';
import { filterProperties } from './utils/search';


function App() {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);

  // Favourites stored as IDs (prevents duplicates easily)
  const [favouriteIds, setFavouriteIds] = useState(() => {
    const saved = localStorage.getItem("favouriteIds");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist favourites client-side
  useEffect(() => {
    localStorage.setItem("favouriteIds", JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  // Build favourite property objects from ids
  const favouriteProperties = useMemo(() => {
    return favouriteIds
      .map((id) => propertiesData.properties.find((p) => p.id === id))
      .filter(Boolean);
  }, [favouriteIds]);

  // Add/remove/clear + duplicate prevention
  const addToFavourites = (propertyId) => {
    setFavouriteIds((prev) => (prev.includes(propertyId) ? prev : [...prev, propertyId]));
  };

  const removeFromFavourites = (propertyId) => {
    setFavouriteIds((prev) => prev.filter((id) => id !== propertyId));
  };

  const clearFavourites = () => setFavouriteIds([]);

  const isFavourite = (propertyId) => favouriteIds.includes(propertyId);

  // Run the search using the extracted pure filter function
  const handleSearch = (searchCriteria) => {
    setFilteredProperties(filterProperties(propertiesData.properties, searchCriteria));
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
                    onAddFavourite={addToFavourites}
                  />
                </div>
                <PropertyList 
                  properties={filteredProperties}
                  onAddFavourite={addToFavourites}
                  isFavourite={isFavourite}
                  onRemoveFavourite={removeFromFavourites}
                />
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