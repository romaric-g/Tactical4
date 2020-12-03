
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

}

export default Models;
