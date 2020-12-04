
declare namespace Models {

  interface SocketResponse {
    success: boolean,
    message?: string
  }

  interface PlayerSettings {
    name: string
  }

  interface PlayerSettings {
    name: string
  }

  interface RoomSettings {
    public: boolean
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


  /* Evenement */

  interface RoomStartEvent {
    code: string
  }

  interface RoomPlayerListChangeEvent {
    reason: "kick" | "join" | "leave",
    playerName: string | undefined,
    playersName: (string | undefined)[]
  }
}

export default Models;
