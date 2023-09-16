// pages/page2.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Page2.module.css'
import Link from 'next/link';


const Page2 = () => {
  const [studyHoursPerDay, setStudyHoursPerDay] = useState('');
  const [canStudyWeekends, setCanStudyWeekends] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    if (!studyHoursPerDay.trim()) {
      alert('Por favor, preencha o campo de horas de estudo por dia.');
      return;
    }

    const studyHoursPerDayInt = parseInt(studyHoursPerDay);

    if (isNaN(studyHoursPerDayInt)) {
      alert('Por favor, insira um valor inteiro válido para horas de estudo por dia.');
      return;
    }

    // Enviar as respostas para o banco de dados
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studyHoursPerDay: studyHoursPerDayInt, canStudyWeekends }),
    });

    if (response.ok) {
      router.push('/page3'); // Redirecionar para a próxima página
    } else {
      alert('Ocorreu um erro ao armazenar os dados.');
    }
  };

  return (
    <div className={styles.page2Container}>
      <Link href="/page1">
        <button className={styles.goBackButton}>Voltar para a Página 1</button>
      </Link>
      
      <h1 className={styles.page2Heading}>Página 2</h1>
      <label className={styles.page2Label} htmlFor="studyHoursPerDay">
        Quantas matérias você quer estudar por dia?
      </label>

      <input
        className={styles.page2Input}
        type="text"
        id="studyHoursPerDay"
        value={studyHoursPerDay}
        onChange={(e) => setStudyHoursPerDay(e.target.value)}
      />

      <label className={styles.page2CheckboxLabel}>
        <input
          className={styles.page2Checkbox}
          type="checkbox"
          checked={canStudyWeekends}
          onChange={() => setCanStudyWeekends(!canStudyWeekends)}
        />
        Você consegue estudar no final de semana?
      </label>
      <button onClick={handleNext}>Próxima Página</button>
    </div>
  );
};

export default Page2;
