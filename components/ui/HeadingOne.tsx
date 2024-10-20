import { cn } from "@/lib/utils";

type Props = {
  title: string;
  className?: string;
};

export const H1: React.FC<Props> = ({ title, className }) => {
  return (
    <p
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {title}
    </p>
  );
};
