import './App.css'
import PropertyList from './components/PropertyList'
import propertiesData from './data/properties.json'

function App() {
  return (
    <div className="App">
      <h1>Property Finder</h1>
      <PropertyList properties={propertiesData.properties} />
    </div>
  )
}

export default App