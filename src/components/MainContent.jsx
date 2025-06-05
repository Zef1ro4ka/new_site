import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function MainContent() {
  const [visibleCities, setVisibleCities] = useState([
    'Васильків','Барахти','Крушинка','Зелений Бір', 'Бориси'
  ]);
  const [showMore, setShowMore] = useState(false);
  const additionalCities = ['Червоне', 'Кулибаба', "Безп'ятне", 'Залізне']
  const navigate = useNavigate();

  const handleCityClick = async (city) => {
    try {
      const response = await fetch('http://localhost:8000/api/city', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city })
        
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      sessionStorage.setItem('cityData', JSON.stringify(data));
      
      navigate(`/city/${city}`);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  const handleShowMore = () => {
    setVisibleCities([...visibleCities, ...additionalCities]);
    setShowMore(true);
  }

  return (
      <main>
        <div className="city-buttons">
          {visibleCities.map((city) =>(
            <button key={city} className='city' onClick={() => handleCityClick(city)}>{city}</button>
          ))}
          {!showMore && (
            <button className='city' onClick={handleShowMore}>Більше</button>
          )}
        </div>
      </main>
  );
}

export default MainContent;
