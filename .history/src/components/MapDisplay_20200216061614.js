import React, {useState} from 'react';
import '../styles/MapDisplay.css';
import { render } from '@testing-library/react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import * as data from '../data/Facilities_Installation_Point_vw.json';
import mapStyles from '../mapStyles'
import yeet from '../assets/cookie.png'
import nigga from '../assets/relax.png'
import axios from 'axios'

{/*start google maps stuff*/}

export class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedPark: '',
      userSelected: '',
      currentLatLng: {
        lat: 0,
        lng: 0
      },
    };
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                console.log(position.coords);
                this.setState(prevState => ({
                    currentLatLng: {
                        ...prevState.currentLatLng,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                }))
            }
        )
        console.log(this.state.currentLatLng.lat)
    } 
}



  componentDidMount() {
    this.getGeoLocation();
  }
  

  //const [selectedPark, setSelectedPark] = useState(null);
  //null because nothing selected initially

  render(){
    return (
  

    <GoogleMap defaultZoom = {10} defaultCenter = {{lat: 43.783900, lng: -79.186290}} defaultOptions={{styles: mapStyles}}
    defaultOptions={{styles: mapStyles}}
    >

    {data.features.map((i) => 
    (<Marker key = {i.properties.OBJECTID} 
              position={{
            lat: i.geometry.coordinates[1],
            lng: i.geometry.coordinates[0]
          }}

          //opacity 

          icon ={{
            url: {yeet}, /* lol plz */
            scaledSize: new window.google.maps.Size(100, 100)
          }}

          onClick={() => {
            this.setState({selectedPark: i})
          }}

          >

          </Marker>
    ))}

    {this.state.selectedPark && ( //is selectedPark is true, return whatever is after &&
      <InfoWindow        
      position={{
            lat: this.state.selectedPark.geometry.coordinates[1],
            lng: this.state.selectedPark.geometry.coordinates[0]
          }}
          onCloseClick={() => {
            this.setState({selectedPark: null});
          }}
          >
          <div className = 'marker-div'> 
          <h2>{this.state.selectedPark.properties.name_e}</h2>
          <p>{this.state.selectedPark.properties.Facility_Type_Installation}</p>
          <p>Safety rating: {this.state.selectedPark.properties.Safety_rating}</p>
          
          { this.state.selectedPark.properties.Safety_rating > 66 ?
          (<img src = {yeet}></img>) 
          : this.state.selectedPark.properties.Safety_rating > 33 ?
          (<img src={nigga}></img>) 
          : (<img src=''></img>)
          }

          </div>
          </InfoWindow>
    )}

    <Marker key = {2} 
              position={{
            lat: this.state.currentLatLng.lat,
            lng: this.state.currentLatLng.lng,
          }}
          icon ={{
            imagePath: {yeet}, /* lol plz */
            scaledSize: new window.google.maps.Size(100, 100)
          }}
          onClick={() => {
            this.setState({userSelected: 'You are here'})
          }}
          
          >
{console.log(this.state.currentLatLng.lat)}
{console.log(this.state.currentLatLng.lng)}
          </Marker>



              {this.state.userSelected && ( //is selectedPark is true, return whatever is after &&
      <InfoWindow        
      position={{
            lat: this.state.currentLatLng.lat,
            lng: this.state.currentLatLng.lng,
          }}
          onCloseClick={() => {
            this.setState({userSelected: null});
          }}
          >
          <div className = 'marker-div'> 
          <h4>{this.state.userSelected}</h4>
          
          </div>
          </InfoWindow>
    )}

    

    

    </GoogleMap>

    )
}  //render method ends here
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

{/*end google maps stuff*/}

function sendData(){
  

    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText)
    })
    // open the request with the verb and the url
    xhr.open('POST', 'https://valley.alishanpiyarali.repl.co/alert')
    // send the request
    xhr.send('14168203706,' + '43.783900' + "," + '-79.186290') 
}




// Start testing data //

function getData() {
  // create a new XMLHttpRequest
  var xhr = new XMLHttpRequest()

  // get a callback when the server responds
  xhr.addEventListener('load', () => {
    // update the state of the component with the result here

  })
  // open the request with the verb and the url
  xhr.open('POST', 'https://valley.alishanpiyarali.repl.co/locations')
  // send the request
  xhr.send()
  console.log('success')
  console.log(xhr.responseURL);


}

//End testing data










class MapDisplay extends React.Component{
    constructor(){
        super();
    }

    render(){

  
    return(
        <>

<div className='map-con'>

<div className='map-header'>
<h1>myMap</h1>
</div>

<div className='map-details'>

<p>Your virtual companion.</p>

{/*inject google maps below */}

{/* width: "80vw", height: "50vh", margin: "auto", marginBottom: "10vh" */}
<div className = 'map-div' style={{ width: "90vw", height: "70vh", margin: "auto", marginBottom: "10vh" }}>
<MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
 {/*inject google maps above */}  

  <button onClick={sendData} className='emergencyButton'>Emergency</button> 

  {/* delete below button */}
  <button onClick={getData} className='emergencyButton'>Emergency</button> 


 </div>


</div>


        </>
    )
}
}




export default MapDisplay;