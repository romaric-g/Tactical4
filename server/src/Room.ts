import Models from "./types/models";
import Player from "./Player";
import RoomManager from "./RoomManager";

const defaultSettings = { 
    public: false
}

export default class Room {
    public readonly code: string;
    private settings: Models.RoomSettings;
    private players: Player[];

    constructor(code: string, settings: Models.RoomSettings = defaultSettings) {
        this.code = code;
        this.players = [];
        this.settings = settings;
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

    getRoomSettings() {
        return this.settings;
    }

    setRoomSettings(settings: Models.RoomSettings) {
        this.settings = settings;
    }

    onDelete() {
        this.players.forEach((p) => p.setRoom(null))
    }
}