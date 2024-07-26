"use cleint";
import { FormEvent, useState } from "react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { socket } from "@/common/lib/socket";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const ChatInput = () => {
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("send_msg", msg);

    setMsg("");
  };

  return (
    <form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
      <Input
        autoFocus
        className="w-full rounded-xl border border-zinc-300 px-2 py-1"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <Button size="icon" className="bg-primary" type="submit">
        <PaperPlaneIcon />
      </Button>
    </form>
  );
};

export default ChatInput;
