
import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from "react-bootstrap/CardDeck"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import ReactGA from "react-ga";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] =useState([])
  const [searchCountries, setSearchCountries]=useState("");
  useEffect(() => {
    ReactGA.initialize('UA-167569797-1');
    ReactGA.pageview('/');
    axios 
    .all([
    axios.get("https://corona.lmao.ninja/v2/all"),
    axios.get("https://corona.lmao.ninja/v2/countries")
  ])
    .then(responseArr => {
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  const filterCountries = results.filter(item => {
    return searchCountries !== "" ? item.country.includes(searchCountries) : item;
  }); 
  const countries = filterCountries.map((data, i) => {
    return (
      <Card 
      key={i}
      bg="light"
      text="dark"
      className="text-center"
      style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
      <Card.Body>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases {data.cases}</Card.Text>
      <Card.Text>Active PER 1 MLN {data.activePerOneMillion}</Card.Text>
      <Card.Text>Deaths {data.deaths}</Card.Text>
      <Card.Text>Recovered {data.recovered}</Card.Text>
      <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
      <Card.Text>Today's cases {data.todayCases}</Card.Text>
      <Card.Text>Tests {data.tests}</Card.Text>
      <Card.Text>Deaths Per 1 MLN {data.deathsPerOneMillion}</Card.Text>
      <Card.Text>Active {data.active}</Card.Text>
      <Card.Text>Critical {data.critical}</Card.Text>
      <Card.Text>Population {data.population}</Card.Text>
      <Card.Text>Critical Per 1 MLN {data.criticalPerOneMillion}</Card.Text>
      <Card.Text>Recovered Per 1 MLN {data.recoveredPerOneMillion}</Card.Text>
      </Card.Body> 
      </Card>
       );
  });
var queries =[{
  columns: 2,
  query: 'min-width:500px'
}, {
  columns:3,
  query: 'min-width: 1000px'
}];
  return (
  <div>
   <br />
      <h2 style={{ textAlign:"center"}}>COVID-19 LIVE STATS</h2>
     <CardDeck>
     
  <Card bg="secondary" text="white" className="text-center" style={{ margin: "10px" }}>
    <Card.Body>
      <Card.Title>||WORLD|| CASES</Card.Title>
      <Card.Text>
        {latest.cases}
        </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  
  <Card bg="danger" text="white" className="text-center" style={{ margin: "10px" }}>
    <Card.Body>
      <Card.Title>||WORLD|| DEATHS</Card.Title>
      <Card.Text>
        {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  
  <Card bg="secondary" text="white" className="text-center" style={{ margin: "10px" }}>
    <Card.Body>
      <Card.Title>||WORLD|| ACTIVE</Card.Title>
      <Card.Text>
        {latest.active}
        </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="secondary" text="white" className="text-center" style={{ margin: "10px" }}>
    <Card.Body>
      <Card.Title>||WORLD|| CRITICAL</Card.Title>
      <Card.Text>
        {latest.critical}
        </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  
  <Card bg="secondary" text="white" className="text-center" style={{ margin: "10px" }}>
    <Card.Body>
      <Card.Title> AFFECTED COUNTRIES</Card.Title>
      <Card.Text>
        {latest.affectedCountries}
        </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
 
</CardDeck>
<br />
<Form>
  <Form.Group controlId="formGroupSearch">
  
    <Form.Control type="text" placeholder="SEARCH A COUNTRY"
    onChange={e => setSearchCountries(e.target.value)} />
  </Form.Group>
</Form>
<Columns queries={queries}>
{countries}
</Columns>
    </div>
   );
}

export default App;
