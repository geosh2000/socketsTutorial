

export class Usuario {

    public id: string;
    public nombre: string;
    public activeTicket: string;
    public sala: string;

    constructor( id: string ) {

        this.id = id;
        this.nombre = 'Unknown';
        this.activeTicket = 'Unknown';
        this.sala = 'Unknown';

    }


}