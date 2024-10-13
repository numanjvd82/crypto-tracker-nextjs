type Props = {
  title: string;
};

export const H1: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {title}
    </h1>
  );
};
