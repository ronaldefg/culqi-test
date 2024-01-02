import express from 'express';
import { TokenController } from './controllers/tokenController';
import { CardController } from './controllers/cardController';
import { TokenService } from './services/tokenService'; // Importa tu servicio TokenService
import { CardService } from './services/cardService'; // Importa tu servicio CardService

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Crea instancias de tus servicios
const tokenService = new TokenService();
const cardService = new CardService();

// Pasa las instancias como argumentos al constructor de los controladores
const tokenController = new TokenController(tokenService);
const cardController = new CardController(tokenService, cardService);

// Rutas
app.post('/create-token', (req: express.Request, res: express.Response) => tokenController.createToken(req, res));
app.get('/get-card-data', (req: express.Request, res: express.Response) => cardController.getCardData(req, res));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
