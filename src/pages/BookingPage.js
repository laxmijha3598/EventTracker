
import React, { useEffect, useState } from 'react';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((booking, index) => (
        <div key={index}>
          <h3>{booking.eventName}</h3>
          <p>{booking.address}</p>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.time}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingPage;