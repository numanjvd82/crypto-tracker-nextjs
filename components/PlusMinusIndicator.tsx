import { SmallText } from "@/components/ui/SmallText";

type Props = {
  isPositive: boolean;
  changeValue: number;
};

export const PlusMinusIndicator: React.FC<Props> = ({
  changeValue: changePercent,
  isPositive,
}) => {
  return (
    <div
      className={`ml-2 flex items-center ${
        isPositive ? "text-green-500" : "text-red-500"
      }`}
    >
      {isPositive ? "\u25B2" : "\u25BC"}
      <SmallText title={`${changePercent.toFixed(2)}%`} />
    </div>
  );
};
