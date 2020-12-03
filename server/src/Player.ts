import Models from "./types/models";
import PlayerController from "./controllers/PlayerController";
import Room from "./Room";


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

        const playerController = new PlayerController(this);

        this.socket.on('JoinRoom', playerController.joinRoom);
        this.socket.on('CreateRoom', playerController.createRoom);
        this.socket.on('SetRoomSetting', playerController.setRoomSetting)
        this.socket.on('GetRoomSetting', playerController.getRoomSetting)
    }

    setName(name: string) : void {
        this.name = name;
    }

    setRoom(room: Room | null) : void {
        if (this.room) {
            this.room.leave(this)
        }
        this.room = room;
    }

    getRoom() {
        return this.room;
    }
}