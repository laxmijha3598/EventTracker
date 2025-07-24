import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const state = query.get('state') || '';
  const city = query.get('city') || '';

  useEffect(() => {
    if (state && city) {
      fetch(`https://eventdata.onrender.com/events?state=${state}&city=${city}`)
        .then(res => res.json())
        .then(setEvents);
    }
  }, [state, city]);

  const handleBook = (event) => {
    const booking = {
      ...event,
      date: new Date().toLocaleDateString(),
      time: 'Morning',
    };

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...existing, booking]));
    navigate('/my-bookings');
  };

  return (
    <div>
      <h1>{events.length} events available in {city}</h1>
      {events.map((event, index) => (
        <div key={index}>
          <h3>{event.eventName}</h3>
          <p>{event.address}</p>
          <p>Rating: {event.rating}</p>
          <button onClick={() => handleBook(event)}>Book FREE Event</button>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
