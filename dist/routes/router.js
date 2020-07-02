"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const server = server_1.default.instance;
    const arr = {
        ok: true,
        mensaje: 'POST - Todo esta bien bien bien!!',
        cuerpo,
        de
    };
    server.io.emit('mensaje-nuevo', arr);
    res.json(arr);
});
router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', { de, cuerpo });
    res.json({
        ok: true,
        mensaje: 'POST - Todo esta bien ID!!',
        cuerpo,
        de,
        id
    });
});
exports.default = router;
