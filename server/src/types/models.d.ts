
declare namespace Models {

  interface SocketResponse {
    success: boolean,
    message?: string
  }

  interface PlayerSettings {
    name: string
  }

  interface PlayerInfo {
    name?: string,
    id: string
  }

  interface RoomSettings {
    public: boolean
  }

  interface GameState {
    me: 0 | 1 | 2 ,
    currentPlayer: number,
    player1?: PlayerInfo,
    player2?: PlayerInfo,
    grid: number[][],
    lastPlacement: { x: number, y: number } | null,
    score: number[],
    win?: WinState,
    leave?: boolean
  }

  interface WinState {
    points: { x: number, y: number }[],
    winnerID: string,
    scoreAdded: number
  }

  /* Params */

  interface JoinRoomParams {
    settings: PlayerSettings,
    code: string,
  }

  interface CreateRoomParams {
    settings: PlayerSettings
  }

  interface SetRoomSettingParams {
    settings: RoomSettings
  }

  interface PlayParams {
    column: number
  }

  interface SendEmoteParams {
    emoteID: number
  }

  /* Response */
  interface CreateRoomResponse extends SocketResponse {
    code?: string
  }

  interface GetRoomSettingResponse extends SocketResponse {
    settings?: RoomSettings
  }

  interface GetRoomInfoResponse extends SocketResponse {
    playersName: (string | undefined)[]
  }

  interface GetGameStateResponse extends SocketResponse {
    state?: GameState
  }

  /* Evenement */

  interface RoomStartEvent {
    code: string
  }

  interface RoomPlayerListChangeEvent {
    reason: "kick" | "join" | "leave",
    playerName: string | undefined,
    playersName: (string | undefined)[]
  }

  interface GameStateChangeEvent {
    state: GameState
  }

  interface NewEmoteSendedEvent {
    senderID: string,
    emoteID: number
  }
}

export default Models;
