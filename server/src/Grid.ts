import Player from "./Player";
import Room from "./Room";

interface Position {
    x: number,
    y: number
}

export default class Grid {
    private room: Room;
    public readonly height = 6;
    public readonly width = 9;
    public points: number[][];
    public currentPlayerNumber = 1; 
    public lastPlacement: Position | null = null; 

    constructor(room: Room) {
        this.room = room;
        this.points = [];
        for (let index = 0; index < 9; index++) {
            this.points[index] = [];
        }
    }

    play(column: number, player: Player) : Position {
        const playerNumber = this.room.getPlayerNumber(player);
        if (!this.points[column]) this.points[column] = [];
        if (playerNumber === 0) throw ("Aucun joueur n'a été designé pour jouer");
        if (column >= this.width) throw ("La colonne n'existe pas");
        if (this.points[column].length >= this.height) throw ("Il n'y a plus de place sur cette colonne");
        if (this.currentPlayerNumber !== playerNumber) throw ("Ce n'est pas à vous de jouer");
        this.points[column].push(playerNumber);

        this.lastPlacement = {
            x: column,
            y: this.points[column].length
        };
        this.next()
        this.room.dispatchNewGameState();
        return this.lastPlacement;
    }

    next() {
        this.currentPlayerNumber = this.currentPlayerNumber === 1 ? 2 : 1;
    }

    reset () {
        this.points = [];
        this.currentPlayerNumber = 1;
    }

}