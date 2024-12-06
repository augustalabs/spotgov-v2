import { Separator } from "@/components/ui/separator";
import InformationCards from "@/features/organizations/components/information-cards";
import InformationForm from "@/features/organizations/components/information-form";
import OrganizationWrapper from "@/features/organizations/components/organization-wrapper";

export default function OrganizationPage() {
  return (
    <OrganizationWrapper>
      <InformationForm />
      <Separator className="my-6" />
      <InformationCards />
      <Separator className="my-6" />
    </OrganizationWrapper>
  );
}
