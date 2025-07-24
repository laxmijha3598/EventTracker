import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://eventdata.onrender.com/states')
      .then(res => res.json())
      .then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetch(`https://eventdata.onrender.com/cities/${selectedState}`)
        .then(res => res.json())
        .then(setCities);
    }
  }, [selectedState]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div id="state">
          <label>State:</label>
          <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
            <option value="">Select State</option>
            {states.map(state => <option key={state}>{state}</option>)}
          </select>
        </div>

        <div id="city">
          <label>City:</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select City</option>
            {cities.map(city => <option key={city}>{city}</option>)}
          </select>
        </div>

        <button type="submit" id="searchBtn">Search</button>
      </form>
    </div>
  );
};

export default HomePage;
