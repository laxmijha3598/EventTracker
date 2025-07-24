import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('Morning');

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

  const handleBookClick = (event) => {
    setSelectedEvent(event); // show booking options before booking
  };

  const confirmBooking = () => {
    const booking = {
      ...selectedEvent,
      date: selectedDate,
      time: selectedTime,
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
          <button onClick={() => handleBookClick(event)}>Book FREE Event</button>
        </div>
      ))}

      {selectedEvent && (
        <div>
          <h2>Select Date and Time</h2>
          <p onClick={() => setSelectedDate('Today')}>Today</p>
          <p onClick={() => setSelectedTime('Morning')}>Morning</p>
          <p onClick={() => setSelectedTime('Afternoon')}>Afternoon</p>
          <p onClick={() => setSelectedTime('Evening')}>Evening</p>
          <button onClick={confirmBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
