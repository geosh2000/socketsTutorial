"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const sockets_1 = require("../sockets/sockets");
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
// Obtener ids de usuarios
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clientes
        });
    });
});
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: sockets_1.usuariosConectdos.getLista()
    });
});
router.get('/rrobin/login/:zdid', (req, res) => {
    const zdid = req.params.zdid;
    const server = server_1.default.instance;
    server.io.emit(zdid, true);
    res.json({
        ok: true
    });
});
router.get('/rrobin/logout/:zdid', (req, res) => {
    const zdid = req.params.zdid;
    const server = server_1.default.instance;
    server.io.emit(zdid, false);
    res.json({
        ok: true
    });
});
router.post('/new-whatsapp', (req, res) => {
    const ticket = req.body.ticket;
    const data = req.body.data;
    const server = server_1.default.instance;
    const payload = {
        ok: true,
        mensaje: 'Nuevo Mensaje de Whatsapp',
        ticket,
        data
    };
    server.io.emit('nuevo-whatsapp', payload);
    server.io.emit(payload['ticket'], { ok: true });
    res.json(payload);
});
exports.default = router;
