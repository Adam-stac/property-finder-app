// Extracts the postcode area (e.g. "BR5") from a location string.
export function getPostcodeArea(location) {
  const match = (location || '').match(/([A-Z]{1,2}\d)/);
  return match ? match[1] : '';
}

// Returns properties matching all supplied criteria.
// Any criterion left blank is ignored, so 1-5 filters work together.
export function filterProperties(properties, criteria = {}) {
  return properties.filter((property) => {
    if (criteria.type && property.type !== criteria.type) return false;
    if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
    if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;
    if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) return false;
    if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) return false;
    if (criteria.addedFrom && property.added < criteria.addedFrom) return false;
    if (criteria.addedTo && property.added > criteria.addedTo) return false;
    if (criteria.postcode) {
      const area = getPostcodeArea(property.location);
      if (!area.startsWith(criteria.postcode.toUpperCase())) return false;
    }
    return true;
  });
}