"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsapp = exports.mensaje = exports.desconectar = void 0;
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};
// Escuchar mensajes
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
// Nuevo whatsapp
exports.whatsapp = (cliente, io) => {
    cliente.on('whatsapp', (payload) => {
        console.log('Mensaje de Whatsapp Recibido', payload);
        io.emit('New-whatsapp', payload);
    });
};
