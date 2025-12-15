import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import propertiesData from "../../data/properties.json";
import "./PropertyDetail.css";

const PropertyDetail = () => {
  const { id } = useParams();

  // Find property by ID (e.g. "prop4")
  const property = propertiesData.properties.find(p => p.id === id);

  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <div className="property-detail">

      <div className="detail-image-wrapper">
        <img
          src={property.picture}
          alt={`Property in ${property.location}`}
          className="detail-main-image"
        />
      </div>

      <div className="detail-thumbnails">
        {property.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className="thumbnail-image"
          />
        ))}
      </div>

      <div className="detail-summary">
        <h2>£{property.price.toLocaleString()}</h2>
        <p>{property.type} · {property.bedrooms} bedrooms</p>
        <p>{property.location}</p>
      </div>

      <Tabs className="detail-tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p className="detail-description">
            {property.description}
          </p>
        </TabPanel>

        <TabPanel>
          <iframe
            title="Property location"
            src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
            loading="lazy"
            className="map-frame"
          />
        </TabPanel>
      </Tabs>

    </div>
  );
};

export default PropertyDetail;
