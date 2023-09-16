// pages/api/ass-page3.js

import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { SubjectName, Importance, Difficulty } = req.body;

      // Valide os campos aqui, por exemplo, se não estão vazios e se Importance e Difficulty são números válidos.

      // Insira o novo assunto no banco de dados
      const result = await db.promise().query(
        'INSERT INTO Subjects (SubjectName, Importance, Difficulty) VALUES (?, ?, ?)',
        [SubjectName, Importance, Difficulty]
      );

      const newSubjectId = result[0].insertId;

      res.status(201).json({ message: 'Assunto criado com sucesso', newSubjectId });
    } catch (error) {
      console.error('Erro ao criar um assunto:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { SubjectID } = req.body;

      // Remova o assunto do banco de dados com base no SubjectID
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
