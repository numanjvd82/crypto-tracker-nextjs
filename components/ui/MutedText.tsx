type Props = {
  title: string;
};

export const MutedText: React.FC<Props> = ({ title }) => {
  return <p className="text-sm text-muted-foreground"> {title}</p>;
};
