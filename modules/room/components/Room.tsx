import { useRoom } from "@/common/recoil/rooms";
import RoomContextProvider from "../context/room.context";
import Canvas from "./Canvas";
import MousePosition from "./MousePosition";
import MouseRenderer from "./MouseRenderer";
import NameInput from "./NameInput";
import ToolBar from "./toolbar/ToolBar";
import UserList from "./UserList";

const Room = () => {
  const room=useRoom()
  if(!room.id) return <NameInput/>
  return (
    <RoomContextProvider>
      <div className="h-full w-full overflow-hidden relative">
        <UserList/>
        <ToolBar />
        <Canvas />
        <MousePosition />
        <MouseRenderer />
      </div>
    </RoomContextProvider>
  );
};

export default Room;
