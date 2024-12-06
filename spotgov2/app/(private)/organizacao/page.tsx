import { Separator } from "@/components/ui/separator";
import InformationForm from "@/features/organizations/components/information-form";
import OrganizationWrapper from "@/features/organizations/components/organization-wrapper";

export default function OrganizationPage() {
  return (
    <OrganizationWrapper>
      <InformationForm />
      <Separator className="my-4" />
    </OrganizationWrapper>
  );
}
