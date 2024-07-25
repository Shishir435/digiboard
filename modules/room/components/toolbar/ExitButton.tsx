import { Button } from "@/common/components/ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const ExitButton = () => {
  const router = useRouter();
  const handleExit = () => router.push("/");
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={handleExit}
      title="Exit this Room"
    >
      <ExitIcon />
    </Button>
  );
};

export default ExitButton;
