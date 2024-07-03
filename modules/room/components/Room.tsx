import { useRoom } from "@/common/recoil/rooms";
import RoomContextProvider from "../context/room.context";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MouseRenderer from "./board/MouseRenderer";
import Chat from "./chat/Chat";
import NameInput from "./NameInput";
import ToolBar from "./toolbar/ToolBar";
import UserList from "./UserList";
import MoveImage from "./board/MoveImage";
import SelectionBtns from "./board/SelectionBtns";

const Room = () => {
  const room=useRoom()
  if(!room.id) return <NameInput/>
  return (
    <RoomContextProvider>
      <div className="h-full w-full overflow-hidden relative">
        <UserList/>
        <Chat/>
        <ToolBar/>
        <SelectionBtns/>
        <MoveImage/>
        <Canvas/>
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
