import './SearchForm.css';
import { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    addedFrom: "",
    addedTo: ""
  });

  const handleChange = (field, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  const handleReset = () => {
    setSearchCriteria({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateAdded: ''
    });
    onSearch({}); 
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Properties</h2>
      
      <div className="form-group">
        <label>Property Type</label>
        <select 
          value={searchCriteria.type} 
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value="">Any Type</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="Bungalow">Bungalow</option>
          <option value="Maisonette">Maisonette</option>
        </select>
      </div>

      <div className="form-group">
        <label>Price Range</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min Price"
            value={searchCriteria.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max Price"
            value={searchCriteria.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Bedrooms</label>
        <div className="range-inputs">
          <select
            value={searchCriteria.minBedrooms}
            onChange={(e) => handleChange('minBedrooms', e.target.value)}
          >
            <option value="">Min</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
          <span>to</span>
          <select
            value={searchCriteria.maxBedrooms}
            onChange={(e) => handleChange('maxBedrooms', e.target.value)}
          >
            <option value="">Max</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>

     <div className="form-group">
      <label>Date Added</label>
      <div className="range-inputs">
        <input 
          type="date"
          value={searchCriteria.addedFrom}
          onChange={(e) => handleChange("addedFrom", e.target.value)}
        />
        <span>to</span>
        <input 
          type="date"
          value={searchCriteria.addedTo}
          onChange={(e) => handleChange("addedTo", e.target.value)}
        />
      </div>
     </div>


      <div className="form-group">
      <label>Postcode Area</label>
      <input
          type="text"
          placeholder="e.g., BR1, NW1"
          value={searchCriteria.postcode}
          onChange={(e) => handleChange('postcode', e.target.value.toUpperCase())}
        />
      </div>


      <div className="form-buttons">
        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
};

export default SearchForm;