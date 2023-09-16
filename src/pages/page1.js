// pages/page1.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Page1.module.css';

const Page1 = () => {
  const [materia, setMateria] = useState(''); // Atualize o nome da variável para 'materia'
  const [studyEndDate, setStudyEndDate] = useState('');
  const router = useRouter();

  const handleNext = async () => {
    if (!materia || !studyEndDate) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const formattedEndDate = new Date(studyEndDate).toISOString();

    const response = await fetch('/api/study-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ materia, studyEndDate: formattedEndDate }), // Atualize o nome da propriedade para 'materia'
    });

    if (response.ok) {
      router.push('/page2');
    } else {
      alert('Ocorreu um erro ao armazenar os dados.');
    }
  };

  return (
    <div className={styles.page1Container}>
      <h1 className={styles.page1Heading}>Página 1</h1>
      <label className={styles.page1Label} htmlFor="materia">
        Para quê você vai estudar?
      </label>
      <input
        className={styles.page1Input}
        type="text"
        id="materia" // Atualize o atributo 'for' para 'materia'
        value={materia}
        onChange={(e) => setMateria(e.target.value)} // Atualize o nome da função para 'setMateria'
      />
      <label className={styles.page1Label} htmlFor="studyEndDate">
        Até quando vai seu plano de estudo?
      </label>
      <input
        className={styles.page1Input}
        type="date"
        id="studyEndDate"
        value={studyEndDate}
        onChange={(e) => setStudyEndDate(e.target.value)}
      />
      <button className={styles.page1Button} onClick={handleNext}>
        Próxima Página
      </button>
    </div>
  );
};

export default Page1;
