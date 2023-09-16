
//Componente React que busca uma lista de assuntos por meio do GET para uma API 

import { useEffect, useState } from 'react';

const SubjectsList = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Faça uma chamada GET para a sua API
    fetch('/api/subjects')
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error('Erro ao buscar assuntos:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Assuntos</h1>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.SubjectID}>{subject.SubjectName}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectsList;
