import './App.css';
import { useState } from 'react';
import PropertyList from './components/PropertyList';
import SearchForm from './components/SearchForm';
import propertiesData from './data/properties.json';


function App() {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);

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
    <div className="App">
      <header className="App-header">
        <h1>Property Finder</h1>
      </header>
      
      <main>
        <SearchForm onSearch={handleSearch} />
        <PropertyList properties={filteredProperties} />
      </main>
    </div>
  );
}

export default App;