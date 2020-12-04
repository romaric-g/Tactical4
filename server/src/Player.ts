import PlayerController from "./controllers/PlayerController";
import Grid from "./Grid";
import Room from "./Room";
import Models from "./types/models";

export default class Player {
    private socket: any;

    public id: string;
    public name: string | undefined;
    public room: Room | null;

    constructor(socket: any) {
        this.socket = socket;
        this.id = socket.id;
        this.name = undefined;
        this.room = null;

        const pc = new PlayerController(this);

        this.socket.on('JoinRoom', pc.joinRoom.bind(pc));
        this.socket.on('CreateRoom', pc.createRoom.bind(pc));
        this.socket.on('GetRoomInfo', pc.getRoomInfo.bind(pc));
        this.socket.on('StartRoom', pc.startRoom.bind(pc));
        this.socket.on('GetGameState', pc.getGameState.bind(pc))
        this.socket.on('Play', pc.play.bind(pc))
    }

    setName(name: string) : void {
        this.name = name;
    }

    setRoom(room: Room | null) : void {
        this.room = room;
    }

    getRoom() {
        return this.room;
    }

    onLeave() {
        if (this.room) {
            this.room.leave(this)
        }
    }

    sendEvent<T>(name: string, event: T) {
        this.socket.emit(name, event)
    }

    toInfo() : Models.PlayerInfo {
        return {
            name: this.name,
            id: this.id
        }
    }
}