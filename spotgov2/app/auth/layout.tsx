import Image from "next/image";
import backgroundImage from "@public/assets/images/background.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full items-center justify-center">
      {children}
      <Image
        alt="background image"
        fill
        src={backgroundImage}
        className="absolute left-0 top-0 -z-10 object-cover"
      />
    </div>
  );
}
