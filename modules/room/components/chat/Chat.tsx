"use client";
import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { BsFillChatFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useList } from "react-use";

import { DEFAULT_EASE } from "@/common/constants/easings";
import { socket } from "@/common/lib/socket";
import { useRoom } from "@/common/recoil/rooms";

import ChatInput from "./ChatInput";
import Message from "./Message";
import Draggable, { DraggableCore } from "react-draggable";
import { ChatBubbleIcon } from "@radix-ui/react-icons";

const Chat = () => {
  const room = useRoom();

  const msgList = useRef<HTMLDivElement>(null);

  const [newMsg, setNewMsg] = useState(false);
  const [opened, setOpened] = useState(false);
  const [msgs, handleMsgs] = useList<Message>([]);

  useEffect(() => {
    const handleNewMsg = (userId: string, msg: string) => {
      const user = room.users.get(userId);

      handleMsgs.push({
        userId,
        msg,
        id: msgs.length + 1,
        username: user?.name || "Anonymous",
        color: user?.color || "#000",
      });

      msgList.current?.scroll({ top: msgList.current?.scrollHeight });

      if (!opened) setNewMsg(true);
    };

    socket.on("new_msg", handleNewMsg);

    return () => {
      socket.off("new_msg", handleNewMsg);
    };
  }, [handleMsgs, msgs, opened, room.users]);

  return (
    <Draggable axis="both">
      <div className="absolute left-1 top-1/2 z-[30]">
        <button
          className="flex size-12 rounded-full cursor-pointer items-center justify-center bg-toolbar font-semibold p-4 text-toolbar-foreground"
          onClick={() => {
            setOpened((prev) => !prev);
            setNewMsg(false);
          }}
        >
          <div className="relative flex items-center justify-center gap-2 size-12">
            <ChatBubbleIcon className="size-6" />
            {newMsg && (
              <p className="absolute -top-4 -right-8 rounded-md bg-green-500 px-1 font-semibold text-black">
                New!
              </p>
            )}
          </div>
        </button>
        {opened && (
          <div className="flex flex-1 flex-col gap-4 justify-between bg-toolbar text-toolbar-foreground p-4 rounded-md">
            <div className="h-[190px] bg-secondary p-3 overflow-y-scroll pr-2 rounded" ref={msgList}>
              {msgs.map((msg) => (
                <Message key={msg.id} {...msg} />
              ))}
            </div>
            <ChatInput />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Chat;
