import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
};

export const MutedText: React.FC<Props> = ({ title, className }) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}> {title}</p>
  );
};
