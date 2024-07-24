import { useRouter } from "next/navigation";
import React from "react";
import { ImExit } from "react-icons/im";

const ExitButton = () => {
  const router = useRouter();
  const handleExit = () => router.push("/");
  return (
    <button className="btn-icon text-xl" onClick={handleExit}>
      <ImExit />
    </button>
  );
};

export default ExitButton;
