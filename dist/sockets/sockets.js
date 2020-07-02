"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.whatsapp = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectdos = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
exports.usuariosConectdos = new usuarios_lista_1.UsuariosLista();
exports.conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectdos.agregar(usuario);
};
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        const desconectado = exports.usuariosConectdos.borrarUsuario(cliente.id);
        console.log('Cliente desconectado: ', desconectado);
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
// Configurar Usuario
exports.login = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectdos.actualizarNombre(cliente.id, payload.nombre);
        console.log('Usuario Configurado', exports.usuariosConectdos.getUsuario(cliente.id));
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
        // io.emit('New-whatsapp', payload )
    });
};
