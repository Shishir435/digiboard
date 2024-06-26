import { socket } from "@/common/lib/socket";

const Message = ({ userId, msg, userName, color }: Message) => {
  const me = socket.id === userId;

  return (
    <div
      className={`my-2 flex gap-2 text-clip ${me && "justify-end text-right"}`}
    >
      {!me && (
        <h5 style={{ color }} className="font-bold">
          {userName}
        </h5>
      )}
      <p style={{ wordBreak: "break-all" }}>{msg}</p>
    </div>
  );
};

export default Message;