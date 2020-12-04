import Player from "./Player";
import Room from "./Room";

const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

class RoomManager {
    private rooms: {[code: string]: Room}

    constructor() {
        this.rooms = {};
    }

    getNewCode() : string {
        let code = '';
        for (let index = 0; index < 6; index++) {
            code += caracteres[Math.floor(Math.random() * caracteres.length)];
        }
        if (this.rooms[code]) {
            return this.getNewCode();
        } else {
            return code;
        }
    }

    createRoom(player: Player) : Room {
        const code = this.getNewCode();
        const room = new Room(code);
        this.rooms[code] = room;
        room.join(player);

        return room;
    }

    deleteRoom(room: Room) {
        room.onDelete();
        delete this.rooms[room.code];
    }

    getRoom(code: string) {
        console.log(this.rooms)
        return this.rooms[code];
    }
}

export default new RoomManager()