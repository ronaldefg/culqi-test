"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tokenController_1 = require("./controllers/tokenController");
const cardController_1 = require("./controllers/cardController");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
const tokenController = new tokenController_1.TokenController();
const cardController = new cardController_1.CardController();
// Rutas
app.post('/create-token', (req, res) => tokenController.createToken(req, res));
app.get('/get-card-data', (req, res) => cardController.getCardData(req, res));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
