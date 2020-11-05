import React,{useState,useEffect} from 'react';
import './App.css';
import Table from "./Components/Table/Table";
import {Divider,FormControl,Select,MenuItem,Card,CardContent, Typography} from '@material-ui/core';
import InfoBox from "./Components/InfoBox/InfoBox";
import Map from './Components/Map/Map';
import { sortData } from "./utils";
import LineGraph from './Components/LineGraph/LineGraph';
function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  const [countryInfo,setCountryInfo] = useState('');
    const [mapCountries, setMapCountries] = useState([]);
  const [tableData,setTableData] = useState([]);
  const [center, setCenter] = useState({ lat: 14.2350, lng:11.9253 });
  const [zoom,setZoom] = useState(3);
  const [cases,setCases] = useState('cases');
  useEffect(() =>  { //  انا ممكن اعمل حاجه احسن اني ف الفانكشن بتاعه  التغيير انا احط التغيير وبس وممكن احط هنا ان ال يوز افيكت تتغير بتغيير ال قيمه وبس يعني 
      const fetchData = async () => {
          await fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
      }
     fetchData();
     setCountry('worldwide')
  },[])
  useEffect(() => {
      const getCountryData = async () => {
          await fetch("https://disease.sh/v3/covid-19/countries") 
          .then(response => response.json())
          .then(data => {
            const countries = data.map(country => (
              {
                name : country.country,
                value : country.countryInfo.iso2
              }
            ));
            const sortedData = sortData(data);
            setTableData(sortedData);
            setMapCountries(data);
            setCountries(countries);
          })
      }
      getCountryData();
  },[countries]);
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        console.log(data);
        setCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoom(4);
      });
  };
  return (
    <div className="App">
      <div className='app__left'>
        <div className='app__header'>
        <h1>COVID-19 Tracker</h1>
        <FormControl className='app__dropdown'>
        <Select onChange={onCountryChange} variant='outlined' value={country}>
           <MenuItem  value = 'worldwide'>Worldwide</MenuItem>
          {
            countries.map(
              country => (
              <MenuItem  value = {country.value}>{country.name}</MenuItem>
              )
            )
          }
        </Select>
      </FormControl>
      
      </div>
      <div className='app__status'> 
          <InfoBox isRed active = {cases === 'cases'} onClick = {(e) => {setCases('cases')}} title='Coronavirus Cases'  cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox active = {cases === 'recovered'} onClick={(e) => setCases("recovered")} title='Recovered'  cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox isRed active = {cases === 'deaths'} onClick = {(e) => {setCases('deaths')}} title='Deaths'  cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>
      <Map
          casesType={cases}
          countries={mapCountries}
          center={center}
          zoom={zoom}
        />
      </div>

      <Card className="app__right">
          <CardContent>
             <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {cases}</h3>
            <LineGraph className='app__graph' casesType={cases} />
          </div>
          </CardContent>
      </Card>
    </div>
  );
}

export default App;
