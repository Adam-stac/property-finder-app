import './App.css';
import { useState } from 'react';
import PropertyList from './components/PropertyList';
import SearchForm from './components/searchForm';
import propertiesData from './data/properties.json';


function App() {
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);

  const handleSearch = (searchCriteria) => {
    console.log('Search criteria:', searchCriteria);
    setFilteredProperties(propertiesData.properties);
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