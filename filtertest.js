import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  // Предположим, у вас есть два списка
  const initialList = [
    { id: 1, category: 1, name: 'Объект 1' },
    { id: 2, category: 2, name: 'Объект 2' },
    { id: 3, category: 1, name: 'Объект 3' },
    // ... другие объекты
  ];

  const categoryNumbers = [1, 2]; // список номеров категорий

  const [filteredObjects, setFilteredObjects] = useState([]);

  useEffect(() => {
    // Функция для фильтрации списка объектов по номерам категорий
    const filterObjectsByCategory = () => {
      const filtered = initialList.filter(obj => !categoryNumbers.includes(obj.category));
      setFilteredObjects(filtered);
    };

    // Вызываем функцию при монтировании компонента
    filterObjectsByCategory();
  }, []); // Пустой массив зависимостей гарантирует выполнение useEffect только при монтировании компонента

  return (
    <div>
      <h2>Отфильтрованные объекты:</h2>
      <ul>
        {filteredObjects.map(obj => (
          <li key={obj.id}>{obj.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
