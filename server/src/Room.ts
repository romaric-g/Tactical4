import Models from "./types/models";
import Player from "./Player";
import RoomManager from "./RoomManager";
import Grid from "./Grid";

export default class Room {
    public readonly code: string;
    public grid: Grid;
    private players: Player[];
    private player1: Player | undefined = undefined;
    private player2: Player | undefined = undefined;
    private isStart = false;
    private score = [0,0];
    private win: Models.WinState | undefined = undefined;

    constructor(code: string) {
        this.code = code;
        this.players = [];
        this.grid = new Grid(this);
    }

    join(player: Player) : void {
        if (player.room) {
            player.onLeave();
        }
        this.players.push(player);
        player.setRoom(this);

        this.dispatchEvent<Models.RoomPlayerListChangeEvent>("RoomPlayerListChange", () => ({
            reason: "join",
            playerName: player.name,
            playersName: this.getPlayersName()
        }))
    }

    leave(player: Player) : void {
        this.players = this.players.filter((p) => p != player)
        player.setRoom(null);
        if (this.players.length <= 0) {
            RoomManager.deleteRoom(this)
        }

        this.dispatchEvent<Models.RoomPlayerListChangeEvent>("RoomPlayerListChange", () => ({
            reason: "leave",
            playerName: player.name,
            playersName: this.getPlayersName()
        }))

        this.dispatchNewGameState();
    }

    onDelete() {
        this.players.forEach((p) => p.setRoom(null))
    }

    getPlayersName() {
        return this.players.map((player) => player.name);
    }

    start() {
        console.log(this)
        if (!this.isStart && this.players.length >= 2) {
            this.grid = new Grid(this);
            this.isStart = true;
            this.player1 = this.players[0];
            this.player2 = this.players[1];
            this.win = undefined;
            this.dispatchEvent<Models.RoomStartEvent>("RoomStart", () => ({
                code: this.code
            }))
            this.dispatchNewGameState();
            return true;
        } else {
            return false;
        }
    }

    dispatchEvent<T>(name: string, event: (params: { playerID: string }) => T) {
        this.players.forEach((player) =>
            player.sendEvent<T>(name, event({ 
                playerID: player.id
            }))
        )
    }

    dispatchNewGameState() {
        this.dispatchEvent<Models.GameStateChangeEvent>("GameStateChange", ({ playerID }) => (
            {
                state: this.getStateInfo(
                    playerID === this.player1?.id ? 1 : 2
                )
            }
        ))
    }

    getStateInfo (me: 0 | 1 | 2) : Models.GameState {
        return {
            me: me,
            currentPlayer: this.grid.currentPlayerNumber,
            grid: this.grid.points,
            lastPlacement: this.grid.lastPlacement,
            player1: this.player1?.toInfo(),
            player2: this.player2?.toInfo(),
            score: this.score,
            win: this.win,
            leave: this.players.length < 2
        }
    }


    getPlayerNumber (player: Player) {
        if ( this.player1 === player) return 1;
        if ( this.player2 === player) return 2;
        return 0;
    }

    
    setWin (win: Models.WinState) {
        this.win = win;
        this.isStart = false;
    }

    addScore (playerNumber: 1 | 2, scoreAdded: number) {
        this.score[playerNumber-1] = this.score[playerNumber-1] + scoreAdded;
    }

    sendEmote (emoteID: number, player: Player) {
        this.dispatchEvent<Models.NewEmoteSendedEvent>('NewEmoteSended', () => ({
            senderID: player.id,
            emoteID: emoteID
        }))
    }

    isState () {
        return this.isStart;
    }
}