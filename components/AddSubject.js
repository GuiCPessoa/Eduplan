// Componente React que cria um formulário para adicionar um novo assunto

import { useState } from 'react';

const AddSubject = () => {
  const [subjectData, setSubjectData] = useState({
    SubjectName: '',
    Importance: '',
    Difficulty: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubjectData({ ...subjectData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //chamada POST para API para adicionar um novo assunto
    fetch('/api/subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subjectData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Erro ao criar um assunto:', error));
  };

  return (
    <div>
      <h1>Adicionar Assunto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="SubjectName"
          placeholder="Nome do Assunto"
          value={subjectData.SubjectName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Importance"
          placeholder="Importância"
          value={subjectData.Importance}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="Difficulty"
          placeholder="Dificuldade"
          value={subjectData.Difficulty}
          onChange={handleInputChange}
        />
        <button type="submit">Adicionar Assunto</button>
      </form>
    </div>
  );
};

export default AddSubject;
