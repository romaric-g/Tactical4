import Models from "./types/models";
import Player from "./Player";
import RoomManager from "./RoomManager";

export default class Room {
    public readonly code: string;
    private players: Player[];

    constructor(code: string) {
        this.code = code;
        this.players = [];
    }

    join(player: Player) : void {
        this.players.push(player);
        player.setRoom(this);
    }

    leave(player: Player) : void {
        this.players = this.players.filter((p) => p != player)
        player.setRoom(null);
        if (this.players.length <= 0) {
            RoomManager.deleteRoom(this)
        }
    }

    onDelete() {
        this.players.forEach((p) => p.setRoom(null))
    }
}