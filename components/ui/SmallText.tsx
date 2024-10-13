type Props = {
  title: string | number;
};

export const SmallText: React.FC<Props> = ({ title }) => {
  return <small className="text-sm font-medium leading-none">{title}</small>;
};
