// pages/api/users.js

import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { studyHoursPerDay, canStudyWeekends } = req.body;

      // Atualizar os dados do usuário no banco de dados (assumindo que você tenha um identificador de usuário)
      const userId = 1; // Substitua pelo identificador do usuário
      await db.promise().query(
        'UPDATE Users SET StudyHoursPerDay = ?, CanStudyWeekends = ? WHERE UserID = ?',
        [studyHoursPerDay, canStudyWeekends, userId]
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
