// pages/api/study-plans.js

import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { materia, studyEndDate } = req.body; // Atualize o nome da propriedade para 'materia'

      if (!materia || !studyEndDate) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos.' });
      }

      await db.promise().query(
        'INSERT INTO StudyPlans (StudyDate, materia) VALUES (?, ?)', // Atualize o nome da coluna para 'materia'
        [studyEndDate, materia] // Atualize o nome da variável para 'materia'
      );

      res.status(201).json({ message: 'Dados armazenados com sucesso' });
    } catch (error) {
      console.error('Erro ao armazenar dados:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
