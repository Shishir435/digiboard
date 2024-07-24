import { useRouter } from "next/navigation";
import React from "react";
import { ImExit } from "react-icons/im";

const ExitButton = () => {
  const router = useRouter();
  const handleExit = () => router.push("/");
  return (
    <button onClick={handleExit}>
      <ImExit className="size-6" />
    </button>
  );
};

export default ExitButton;
