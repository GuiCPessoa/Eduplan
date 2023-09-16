import express from 'express';
import cors from 'cors';
import { setupDatabase } from '../database';

const app = express();

// Habilitando o Middleware CORS
app.use(cors());

// Rota GET para buscar todos os assuntos
app.get('/api/subjects', async (req, res) => {
    const db = await setupDatabase();
    const subjects = await db.all('SELECT * FROM Subjects');
    res.json(subjects);
});

// Rota DELETE para excluir um assunto com base no ID
app.delete('/api/subjects/:id', async (req, res) => {
    const { id } = req.params;
    const db = await setupDatabase();

    // Validar se o ID é um número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        // Verificar se o assunto existe antes de excluir
        const existingSubject = await db.get('SELECT * FROM Subjects WHERE SubjectID = ?', [id]);

        if (!existingSubject) {
            return res.status(404).json({ error: 'Assunto não encontrado' });
        }

        // Executar a exclusão do assunto
        await db.run('DELETE FROM Subjects WHERE SubjectID = ?', [id]);
        
        res.json({ message: 'Assunto excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir um assunto:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('API RODANDO NA PORTA 3000');
});
