// Arquivo de configuração do banco de dados

import  sqlite3  from 'sqlite3';
import { open } from 'sqlite3';

async function setupDatabase() {
    const db = await open({
        filename: "C:\Users\guilh\OneDrive\Área de Trabalho\EDUPLAN_PROJECT\eduplan-project\bd_eduplan_mysql.sql",
        driver: sqlite3.Database,
    });

    return db;
}

export { setupDatabase };