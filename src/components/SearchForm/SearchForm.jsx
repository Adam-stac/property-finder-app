import './SearchForm.css';
import { useState } from 'react';
import DropdownList from 'react-widgets/DropdownList';
import NumberPicker from 'react-widgets/NumberPicker';
import DatePicker from 'react-widgets/DatePicker';

const propertyTypes = ['Any Type', 'House', 'Flat', 'Bungalow', 'Maisonette'];
const minBedroomOptions = ['Any', '1', '2', '3', '4', '5+'];
const maxBedroomOptions = ['Any', '1', '2', '3', '4', '5+'];

const SearchForm = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    addedFrom: '',
    addedTo: ''
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
      addedFrom: '',
      addedTo: ''
    });
    onSearch({});
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Properties</h2>

      {/* Property Type — DropdownList widget */}
      <div className="form-group">
        <label>Property Type</label>
        <DropdownList
          data={propertyTypes}
          value={searchCriteria.type === '' ? 'Any Type' : searchCriteria.type}
          onChange={(value) => handleChange('type', value === 'Any Type' ? '' : value)}
        />
      </div>

      {/* Price Range — NumberPicker widgets */}
      <div className="form-group">
        <label>Price Range (£)</label>
        <div className="range-inputs">
          <NumberPicker
            placeholder="Min Price"
            value={searchCriteria.minPrice === '' ? null : Number(searchCriteria.minPrice)}
            onChange={(value) => handleChange('minPrice', value === null ? '' : value)}
            min={0}
            step={10000}
          />
          <span>to</span>
          <NumberPicker
            placeholder="Max Price"
            value={searchCriteria.maxPrice === '' ? null : Number(searchCriteria.maxPrice)}
            onChange={(value) => handleChange('maxPrice', value === null ? '' : value)}
            min={0}
            step={10000}
          />
        </div>
      </div>

      {/* Bedrooms — DropdownList widgets */}
      <div className="form-group">
        <label>Bedrooms</label>
        <div className="range-inputs">
          <DropdownList
            data={minBedroomOptions}
            value={searchCriteria.minBedrooms === '' ? 'Any' : searchCriteria.minBedrooms}
            onChange={(value) => handleChange('minBedrooms', value === 'Any' ? '' : value)}
          />
          <span>to</span>
          <DropdownList
            data={maxBedroomOptions}
            value={searchCriteria.maxBedrooms === '' ? 'Any' : searchCriteria.maxBedrooms}
            onChange={(value) => handleChange('maxBedrooms', value === 'Any' ? '' : value)}
          />
        </div>
      </div>

      {/* Date Added — DatePicker widgets */}
      <div className="form-group">
        <label>Date Added</label>
        <div className="range-inputs">
          <DatePicker
            placeholder="From date"
            value={searchCriteria.addedFrom ? new Date(searchCriteria.addedFrom) : null}
            onChange={(date) => handleChange('addedFrom', date ? date.toISOString().split('T')[0] : '')}
          />
          <span>to</span>
          <DatePicker
            placeholder="To date"
            value={searchCriteria.addedTo ? new Date(searchCriteria.addedTo) : null}
            onChange={(date) => handleChange('addedTo', date ? date.toISOString().split('T')[0] : '')}
          />
        </div>
      </div>

      {/* Postcode — plain input, no suitable widget for free text */}
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