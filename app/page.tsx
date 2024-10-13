export const revalidate = 10;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { H1 } from "@/components/ui/HeadingOne";
import { MutedText } from "@/components/ui/MutedText";
import { SmallText } from "@/components/ui/SmallText";
import { axiosInstance } from "@/lib/axios";
import { CryptoData } from "@/lib/types";

type SearchParams = {
  search: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const res = await axiosInstance.get("/v1/cryptocurrency/listings/latest");
  const data = (await res.data.data) as CryptoData[];

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="grid md:grid-cols-3 gap-3">
        <Card className="mt-2">
          <CardHeader className="flex-row justify-between items-center">
            <div>
              <CardTitle>Hello world</CardTitle>
            </div>
            <div>
              <H1 title="$34" />
            </div>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <MutedText title="23423432" />
              <SmallText title="Infinite Supply" />
            </div>
            <div>
              <MutedText title="1423423432" />
              <SmallText title="Infinite Supply" />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-2">
          <CardHeader>
            <CardTitle>Hello world</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
              dolore?
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="mt-2">
          <CardHeader>
            <CardTitle>Hello world</CardTitle>
            <CardDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
              dolore?
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
