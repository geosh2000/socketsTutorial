"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('====== Actualizando Usuario ======');
    }
    actualizarUrl(id, url) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.urlRef = url;
                break;
            }
        }
        console.log('====== Actualizando Usuario (URL) ======');
    }
    actualizarActiveTicket(id, ticket) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.activeTicket = ticket;
                break;
            }
        }
    }
    getLista() {
        return this.lista;
    }
    getUsuario(id) {
        return this.lista.find(usuario => usuario.id === id);
    }
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    borrarUsuario(id) {
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUser;
    }
}
exports.UsuariosLista = UsuariosLista;
