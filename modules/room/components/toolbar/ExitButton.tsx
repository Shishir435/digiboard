import { Button } from "@/common/components/ui/button";
import TooltipContainer from "@/common/components/ui/tooltip";
import { ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const ExitButton = () => {
  const router = useRouter();
  const handleExit = () => router.push("/");
  return (
    <TooltipContainer
      trigger={
        <Button size="icon" variant="ghost" onClick={handleExit}>
          <ExitIcon />
        </Button>
      }
      hoverText="Exit This Room"
    />
  );
};

export default ExitButton;
