import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';



export const usuariosConectdos = new UsuariosLista(); 


export const conectarCliente = ( cliente: Socket, io: socketIO.Server) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectdos.agregar( usuario );

    io.emit( 'usuarios-activos', usuariosConectdos.getLista() );


}


export const desconectar = ( cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {
        const desconectado = usuariosConectdos.borrarUsuario( cliente.id );
        console.log('Cliente desconectado: ', desconectado);

        io.emit( 'usuarios-activos', usuariosConectdos.getLista() );
    })

}



// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload )

    });

} 


// Nuevo whatsapp
export const whatsapp = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('whatsapp', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje de Whatsapp Recibido', payload );

        io.emit('New-whatsapp', payload )

    });

} 

// Configurar Usuario
export const login = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        usuariosConectdos.actualizarNombre( cliente.id, payload.nombre )

        console.log( 'Usuario Configurado', usuariosConectdos.getUsuario( cliente.id ) );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } configurado` 
        })

        io.emit( 'usuarios-activos', usuariosConectdos.getLista() );

    });

}

// Configurar Ticket
export const activeTicket = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on('activar-ticket', ( payload: { ticket: any }, callback: Function ) => {

        usuariosConectdos.actualizarActiveTicket( cliente.id, payload.ticket )

        console.log( 'Usuario Configurado', usuariosConectdos.getUsuario( cliente.id ) );

        callback({
            ok: true,
            mensaje: `Usuario ${ cliente.id } viendo ${ payload.ticket }` 
        })

        io.emit( 'usuarios-activos', usuariosConectdos.getLista() );

    });

}

 