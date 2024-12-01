import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import logo from "@public/assets/logo.png";

type CardFormProps = {
  children: React.ReactNode;
  description: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
};

const CardForm = ({
  children,
  description,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}: CardFormProps) => {
  return (
    <Card className="max-h-full overflow-auto min-w-[579px]">
      <CardHeader className="space-y-6">
        <CardTitle className="mx-auto">
          <Image alt="SpotGov Logo" src={logo} width={145} />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {children}
        <CardFooter className="mt-4 p-0">
          <CardDescription>
            {footerText}
            <Link href={footerLinkHref} className="pl-1 text-primary">
              {footerLinkLabel}
            </Link>
          </CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CardForm;
