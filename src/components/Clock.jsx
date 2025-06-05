import React, { useEffect, useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // оновлення щосекунди
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // очищення таймера при виході з компонента
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (date) =>
    date.toLocaleTimeString('uk-UA', { hour12: false }); // hh:mm:ss
  const formatDate = (date) =>
    date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div className="clockStyle">
        <p style={{marginLeft: '30px'}}>{formatTime(time)}</p> {formatDate(time)}
    </div>
  );
};

export default Clock;
