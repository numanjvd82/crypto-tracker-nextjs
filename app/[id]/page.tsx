import GraphTabs from "@/components/GraphTabs";
import InfoCards from "@/components/InfoCards";
import PriceGraph from "@/components/PriceGraph";
import { Card } from "@/components/ui/card";

type Props = {
  params: {
    id: string;
  };
};

const CoinPage = async ({ params }: Props) => {
  return (
    <div className="max-w-[1000px] mx-auto">
      <InfoCards id={params.id} />
      <Card className="my-4 p-2">
        <GraphTabs />
        <PriceGraph id={params.id} />
      </Card>
    </div>
  );
};

export default CoinPage;
