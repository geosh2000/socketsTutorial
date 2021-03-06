
import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectdos } from '../sockets/sockets';

const router = Router();



router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    })

})

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const server = Server.instance;

    const arr = {
        ok: true,
        mensaje: 'POST - Todo esta bien bien bien!!',
        cuerpo,
        de
    }
    
    server.io.emit('mensaje-nuevo', arr )

    res.json(arr)


})

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', { de, cuerpo } );

    res.json({
        ok: true,
        mensaje: 'POST - Todo esta bien ID!!',
        cuerpo,
        de,
        id
    })

})

// Obtener ids de usuarios
router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[] ) => {

        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }


        res.json({
            ok: true,
            clientes
        });

    });

   

})

router.get('/usuarios/detalle', (req: Request, res: Response) => {

    res.json({
        ok: true,
        clientes: usuariosConectdos.getLista()
    });

})

router.get('/rrobin/login/:zdid', (req: Request, res: Response) => {

    const zdid = req.params.zdid;
    const server = Server.instance;

    server.io.emit( zdid, true );

    res.json({
        ok: true
    });

})

router.get('/rrobin/logout/:zdid', (req: Request, res: Response) => {

    const zdid = req.params.zdid;
    const server = Server.instance;

    server.io.emit( zdid, false );

    res.json({
        ok: true
    });

})


router.post('/new-whatsapp', (req: Request, res: Response) => {

    const ticket = req.body.ticket;
    const data = req.body.data;
    const server = Server.instance;

    const payload = {
        ok: true,
        mensaje: 'Nuevo Mensaje de Whatsapp',
        ticket, 
        data
    };

    server.io.emit('nuevo-whatsapp', payload )
    server.io.emit(payload['ticket'], {ok: true} )

    res.json( payload );

});



export default router;