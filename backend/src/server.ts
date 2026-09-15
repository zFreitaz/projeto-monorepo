import express, { Request, Response } from 'express';
import cors from 'cors';
import { sequelize } from './config/database';
import { appRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

const app = express();
const PORT = process.env.PORT || 3000;

// Middewares
app.use(cors());
app.use(express.json());

// Rota de Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    mensagem: 'Servidor Backend rodando com sucesso.',
    timestamp: new Date().toISOString(),
  });
});

// Rota da documentação interativa
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', appRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL no Supabase realizada com sucesso');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(
        `Heath Check disponivel em: http://localhost:${PORT}/api/health`,
      );
    });
  } catch (error) {
    console.log('Erro ao conectar com o banco de dados: ', error);
  }
}

main();
