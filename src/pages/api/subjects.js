// pages/api/subjects.js

import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.promise().query('SELECT * FROM Subjects');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Erro ao buscar assuntos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else if (req.method === 'POST') {
    try {
      const { SubjectName, Importance, Difficulty } = req.body;
      await db.promise().query(
        'INSERT INTO Subjects (SubjectName, Importance, Difficulty) VALUES (?, ?, ?)',
        [SubjectName, Importance, Difficulty]
      );
      res.status(201).json({ message: 'Assunto criado com sucesso' });
    } catch (error) {
      console.error('Erro ao criar um assunto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { SubjectID, SubjectName, Importance, Difficulty } = req.body;
      await db.promise().query(
        'UPDATE Subjects SET SubjectName = ?, Importance = ?, Difficulty = ? WHERE SubjectID = ?',
        [SubjectName, Importance, Difficulty, SubjectID]
      );
      res.status(200).json({ message: 'Assunto atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar um assunto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { SubjectID } = req.body;
      await db.promise().query('DELETE FROM Subjects WHERE SubjectID = ?', [SubjectID]);
      res.status(200).json({ message: 'Assunto excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir um assunto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
