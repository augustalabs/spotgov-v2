import Image from "next/image";
import backgroundImage from "@public/assets/background.jpg";

export default function CreateOrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex items-center justify-center">
      {children}
      <Image
        alt="background image"
        fill
        src={backgroundImage}
        className="absolute top-0 left-0 -z-10 object-cover"
      />
    </div>
  );
}
