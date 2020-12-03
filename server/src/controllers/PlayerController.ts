import Models from "../types/models";
import Player from "../Player";
import RoomManager from "../RoomManager";

class PlayerController {
   private player: Player;

   constructor(player: Player) {
      this.player = player;
   }

   joinRoom (params: Models.JoinRoomParams, callback: (res: Models.SocketResponse) => void) {
      if (!params.code) {
         return callback({
            success: false,
            message: 'code undefined'
         })
      }
      const code = params.code;
      const room = RoomManager.getRoom(code);
      if(room) {
         this.player.setRoom(room)
         return callback({
               success: true
         })
      } else {
         return callback({
            success: false,
            message: "La partie n'existe pas !"
         })
      }
   }

   createRoom (params: null, callback: (res: Models.CreateRoomResponse) => void) {
      const room = RoomManager.createRoom(this.player);  
      callback({
         success: true,
         code: room.code
      })
   }
   
   setRoomSetting (params: Models.SetRoomSettingParams, callback: (res: Models.SocketResponse) => void) {
      const room = this.player.getRoom()
      const settings = params.settings;
      if (room && settings) {
         room.setRoomSettings(settings);
         return callback({ success: true })
      }
      return callback({ success: false })
   }

   getRoomSetting (params: null, callback: (res: Models.GetRoomSettingResponse) => void) {
      const room = this.player.getRoom()
      if (room) {
         return callback({
            success: true,
            settings: room.getRoomSettings()
         })
      }
      return callback({ success: false })
   }

}

export default PlayerController;