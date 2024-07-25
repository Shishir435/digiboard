"use client";
import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { Input } from "@/common/components/ui/input";
import { useModal } from "@/common/recoil/modals";
import { useRoom } from "@/common/recoil/rooms";
import { ClipboardCopyIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ShareModal = () => {
  const { id } = useRoom();
  const { closeModal } = useModal();

  const [url, setUrl] = useState("");

  useEffect(() => setUrl(window.location.href), []);

  const handleCopy = () => {
    toast("Copied to clipboard");
    navigator.clipboard.writeText(url);
  };

  return (
    <Card className="relative flex flex-col bg-toolbar text-toolbar-foreground items-center rounded-md p-10 pt-5">
      <button onClick={closeModal} className="absolute top-5 right-5">
        <Cross1Icon />
      </button>
      <CardTitle className="text-2xl font-bold">Invite</CardTitle>
      <CardHeader>
        <p className="inline font-bold">Room id: {id}</p>
      </CardHeader>
      <CardContent className="relative mt-2">
        <Input type="text" value={url} readOnly className="input sm:w-96" />
        <Button
          variant={"link"}
          className="absolute top-0 right-4"
          onClick={handleCopy}
        >
          <ClipboardCopyIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShareModal;
