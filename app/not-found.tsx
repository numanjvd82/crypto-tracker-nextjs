import { H1 } from "@/components/ui/HeadingOne";
import { MutedText } from "@/components/ui/MutedText";
import NoData from "@/public/images/no_data.svg";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <H1 title="Error 404" />
        <MutedText title="Oops! It seems like the page you’re looking for doesn’t exist." />
        <MutedText title="Here are a few helpful links instead:" />
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline my-2"
          href="/"
        >
          Homepage
        </Link>
        <Image src={NoData} width={300} height={300} alt="No Data" />
      </div>
    </div>
  );
}
