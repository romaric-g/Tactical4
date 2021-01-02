import Models from "../types/models";
import Player from "../Player";
import RoomManager from "../RoomManager";

class PlayerController {
   private player: Player;

   constructor(player: Player) {
      this.player = player;
   }

   joinRoom (params: Models.JoinRoomParams, callback: (res: Models.SocketResponse) => void) {
      this.player.setName(params.settings.name);
      if (!params.code) {
         return callback({
            success: false,
            message: 'code undefined'
         })
      }
      const code = params.code;
      const room = RoomManager.getRoom(code);
      if(!this.player.name) {
         return callback({
            success: false,
            message: "Vous n'avez pas indiqué votre pseudo"
         })
      }
      else if(room) {
         if (room.join(this.player)) {
            return callback({
               success: true
            })
         } else {
            return callback({
               success: false,
               message: "Impossible de rejoindre cette partie"
            })
         }
      } else {
         return callback({
            success: false,
            message: "La partie n'existe pas !"
         })
      }
   }

   createRoom (params: Models.CreateRoomParams, callback: (res: Models.CreateRoomResponse) => void) {
      this.player.setName(params.settings.name);
      if(!this.player.name) {
         return callback({
            success: false,
            message: "Vous n'avez pas indiqué votre pseudo"
         })
      }
      const room = RoomManager.createRoom(this.player);
      callback({
         success: true,
         code: room.code
      });
   }

   getRoomInfo (params: null, callback: (res: Models.GetRoomInfoResponse) => void) {
      const room = this.player.getRoom()
      if (room) {
         callback({
            success: true,
            playersName: room.getPlayersName()
         })
      } else {
         callback({
            success: false,
            message: "Vous n'avez pas rejoint de partie",
            playersName: []
         })
      }
   }

   getGameState (params: null, callback: (res: Models.GetGameStateResponse) => void) {
      const room = this.player.getRoom()
      if (room) {
         callback({
            success: true,
            state: room.getStateInfo(room.getPlayerNumber(this.player))
         })
      }else {
         callback({
            success: false,
            message: "Vous n'avez pas rejoint de partie",
         })
      }
   }

   startRoom (params: null, callback: (res: Models.SocketResponse) => void) {
      const room = this.player.getRoom()
      if (room) {
         if (room.start()) {
            callback({success: true})
         } else {
            callback({success: false})
         }
      } else {
         callback({
            success: false,
            message: "Vous n'avez pas rejoint de partie"
         })
      }
   }

   quitRoom (params: null, callback: (res: Models.SocketResponse) => void) {
      const room = this.hasRoomAndGet(callback);
      if (room) {
         room.leave(this.player);
         callback({ success: true});
      }
   }

   play (params: Models.PlayParams, callback: (res: Models.SocketResponse) => void) {
      const room = this.player.getRoom();
      if (room) {
         try {
            room.grid.play(params.column, this.player);
            callback({ success: true})
         } catch (error) {
            callback({ success: false, message: error });
         }
      } else {
         callback({
            success: false,
            message: "Vous n'avez pas rejoint de partie"
         });
      }
   }

   sendEmote (params: Models.SendEmoteParams, callback: (res: Models.SocketResponse) => void) {
      const room = this.hasRoomAndGet(callback);
      if (room) {
         room.sendEmote(params.emoteID, this.player);
         callback({ success: true})
      }
   }

   hasRoomAndGet (callback: (res: Models.SocketResponse) => void) {
      const room = this.player.getRoom();
      if (room) {
         return room;
      }
      callback({
         success: false,
         message: "Vous n'avez pas rejoint de partie"
      });
      return null;
   }
}

export default PlayerController;