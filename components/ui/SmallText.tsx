type Props = {
  title: string;
};

export const SmallText: React.FC<Props> = ({ title }) => {
  return <small className="text-sm font-medium leading-none">{title}</small>;
};
