import React, {useState} from 'react';
import '../styles/MapDisplay.css';
import { render } from '@testing-library/react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import * as data from '../data/Facilities_Installation_Point_vw.json';


function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  //null because nothing selected initially

    return (
    
    <GoogleMap defaultZoom = {4} defaultCenter = {{lat: 42.997570, lng: -81.276710}}>

    {data.features.map((i) => 
    (<Marker key = {i.properties.OBJECTID} 
              position={{
            lat: i.geometry.coordinates[1],
            lng: i.geometry.coordinates[0]
          }}

          onClick={() => {
            setSelectedPark(i);
          }}
          >

          </Marker>
    ))}

    {selectedPark && ( //is selectedPark is true, return whatever is after &&
      <InfoWindow        
      position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          >
          <div>
          <h2>{selectedPark.properties.name_e</h2>

          </div>
          </InfoWindow>
    )}

    </GoogleMap>

    )
}

const MapWrapped = withScriptjs(withGoogleMap(Map));



class MapDisplay extends React.Component{
    constructor(){
        super();
    }

    render(){

  
    return(
        <>

<div className='map-con'>

<div className='map-header'>
<h1>eMap</h1>
</div>

<div className='map-details'>

<p>Find a relaxing spot near you.</p>


<a href='https://www.google.ca/maps/@43.4735855,-80.544195,13z' target='_blank'>
<img src='https://i.pinimg.com/originals/68/1b/64/681b649fbe64ce4760d399689d98cf16.png'></img>
</a>
<div style={{ width: "50vw", height: "50vh", margin: "auto", marginBottom: "10vh" }}>
<MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
 </div>

</div>


        </>
    )
}
}




export default MapDisplay;