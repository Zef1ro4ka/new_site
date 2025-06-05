import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CityPage() {
  const { cityName } = useParams(); // Отримуємо назву міста з URL
  const [cityData, setCityData] = useState([]); // Стан для зберігання даних про місто (масив записів)
  const [currentPage, setCurrentPage] = useState(1); // Поточна сторінка для пагінації
  const rowsPerPage = 30; // Кількість записів на сторінці

  useEffect(() => {
    const dataFromSession = sessionStorage.getItem('cityData');
    if (dataFromSession) {
      try {
        const parsedData = JSON.parse(dataFromSession);
        if (Array.isArray(parsedData)) {
          // Створюємо новий масив і розвертаємо його перед встановленням у стан
          // Це гарантує, що ми не мутуємо оригінальний масив (хороша практика),
          // хоча JSON.parse сам по собі створює новий масив.
          setCityData([...parsedData].reverse()); 
        } else {
          console.error('Invalid data structure in sessionStorage: expected Array, got:', parsedData);
          setCityData([]);
        }
      } catch (error) {
        console.error('Failed to parse cityData from sessionStorage:', error);
        setCityData([]);
      }
    } else {
      console.warn('No cityData found in sessionStorage.');
      setCityData([]);
    }
  }, []) // Пустий масив залежностей, щоб useEffect викликався лише один раз при монтуванні компонента

  // Обчислення загальної кількості сторінок
  const totalPages = Math.ceil(cityData.length / rowsPerPage);
  // Обчислення індексу першого елемента на поточній сторінці
  const startIndex = (currentPage - 1) * rowsPerPage;
  // Отримання даних для поточної сторінки
  const paginatedData = cityData.slice(startIndex, startIndex + rowsPerPage);

  // Функція для відображення одного запису (одного кортежу з API)
  const renderDataRow = (row, index) => {
    // row - це кортеж, наприклад:
    // (5245, null, 'Васильків', 'вул. Соборна, 120', '063 155 03 39 Олег ', 'деталі...', 'дата...', 'статус...', 'Марина', null)

    const id = row[0]; // ID запису
    // const city = row[2]; // Місто - вже є в cityName, тому можна не дублювати
    const address = row[3]; // Адреса
    const phoneAndContact = row[4]; // Телефон та ім'я контакту
    const details = row[5]; // Детальний опис (може містити \n)
    const dates = row[6]; // Дати
    const status = row[7]; // Статус
    const manager = row[8]; // Менеджер

    // Використовуємо ID як ключ для елемента списку
    // Якщо ID може бути не унікальним або відсутнім, використовуйте (startIndex + index) або інший унікальний ідентифікатор
    return (
      <li key={id || `row-${startIndex + index}`} style={{ borderBottom: '1px solid #ccc', marginBottom: '15px', paddingBottom: '15px' }}>
        <p><strong>ID:</strong> {id !== null && id !== undefined ? id : 'N/A'}</p>
        <p><strong>Адреса:</strong> {address || 'N/A'}</p>
        <p><strong>Телефон/Контакт:</strong> {phoneAndContact || 'N/A'}</p>
        <p><strong>Деталі:</strong></p>
        <pre style={{ whiteSpace: 'pre-wrap', margin: '0', fontFamily: 'inherit' }}>{details || 'N/A'}</pre>
        <p><strong>Дати:</strong> {dates || 'N/A'}</p>
        <p><strong>Статус:</strong> {status || 'N/A'}</p>
        <p><strong>Менеджер:</strong> {manager || 'N/A'}</p>
        {/* Можна додати інші поля, наприклад, row[1] або row[9], якщо вони містять корисну інформацію */}
        {/* <p><strong>Поле 1:</strong> {row[1] !== null && row[1] !== undefined ? row[1] : 'N/A'}</p> */}
        {/* <p><strong>Поле 9:</strong> {row[9] !== null && row[9] !== undefined ? row[9] : 'N/A'}</p> */}
      </li>
    );
  };

  return (
    <div>
      <h2>Дані для міста: {cityName}</h2>

      {cityData.length === 0 ? (
        <p>Завантаження або немає даних для відображення...</p>
      ) : paginatedData.length === 0 && currentPage > 1 ? ( // Якщо перейшли на сторінку, де немає даних (наприклад, після видалення)
        <p>Немає даних на цій сторінці. Спробуйте повернутися на попередню.</p>
      ) : (
        <>
          <ul>
            {paginatedData.map((row, index) => renderDataRow(row, index))}
          </ul>

          {totalPages > 1 && ( // Показувати пагінацію, тільки якщо сторінок більше однієї
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                ⏮ Перша
              </button>
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                ◀ Назад
              </button>
              <span style={{ margin: '0 10px' }}>
                Сторінка {currentPage} з {totalPages}
              </span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                Вперед ▶
              </button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
                Остання ⏭
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CityPage;