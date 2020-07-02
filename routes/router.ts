
import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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


export default router;