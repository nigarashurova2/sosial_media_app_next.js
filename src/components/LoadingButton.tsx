import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";

interface LoadingButtonProps {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps & React.ComponentProps<"button">) {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}
