// pages/page3.js

import React, { useState, useEffect } from 'react';
import styles from '../../styles/Page3.module.css'; // Importe o arquivo CSS Module

const Page3 = () => {
  const [subjectData, setSubjectData] = useState({
    SubjectName: '',
    Importance: '',
    Difficulty: '',
  });

  const [subjectList, setSubjectList] = useState([]);
  const [error, setError] = useState(null);

  // Função para lidar com a adição de um novo assunto
  const handleAddSubject = async () => {
    if (!subjectData.SubjectName || !subjectData.Importance || !subjectData.Difficulty) {
      setError('Preencha todos os campos antes de adicionar um assunto.');
      return;
    }

    try {
      const response = await fetch('/api/ass-page3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectData),
      });

      if (response.status === 201) {
        const data = await response.json();
        setSubjectList([...subjectList, { SubjectID: data.newSubjectId, ...subjectData }]);
        setSubjectData({
          SubjectName: '',
          Importance: '',
          Difficulty: '',
        });
        setError(null);
      } else {
        // Trate o erro de criação do assunto, se necessário
      }
    } catch (error) {
      console.error('Erro ao criar um assunto:', error);
    }
  };

  // Função para lidar com a remoção de um assunto
  const handleRemoveSubject = async (subjectId) => {
    try {
      const response = await fetch('/api/ass-page3', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ SubjectID: subjectId }),
      });

      if (response.status === 200) {
        setSubjectList(subjectList.filter((subject) => subject.SubjectID !== subjectId));
      } else {
        // Trate o erro de exclusão do assunto, se necessário
      }
    } catch (error) {
      console.error('Erro ao excluir um assunto:', error);
    }
  };

  return (
    <div className={styles.page3Container}>
      <h1 className={styles.page3Heading}>Adicionar e Remover Assuntos</h1>
      <div className={styles.subjectInputContainer}>
        <input
          type="text"
          name="SubjectName"
          placeholder="Nome do Assunto"
          value={subjectData.SubjectName}
          onChange={(e) => setSubjectData({ ...subjectData, SubjectName: e.target.value })}
        />
        <input
          type="number"
          name="Importance"
          placeholder="Importância"
          value={subjectData.Importance}
          onChange={(e) => setSubjectData({ ...subjectData, Importance: e.target.value })}
        />
        <input
          type="number"
          name="Difficulty"
          placeholder="Dificuldade"
          value={subjectData.Difficulty}
          onChange={(e) => setSubjectData({ ...subjectData, Difficulty: e.target.value })}
        />
        {error && <p className={styles.error}>{error}</p>}
         <button onClick={handleAddSubject}>Adicionar Assunto</button>
      </div>
      <ul className={styles.subjectList}>
        {subjectList.map((subject) => (
          <li key={subject.SubjectID}>
            {subject.SubjectName} - Importance: {subject.Importance} - Difficulty: {subject.Difficulty}
            <button onClick={() => handleRemoveSubject(subject.SubjectID)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page3;


  