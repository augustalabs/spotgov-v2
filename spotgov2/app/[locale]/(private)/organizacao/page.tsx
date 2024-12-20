import { Separator } from "@/components/ui/separator";
import CustomTable from "@/features/organizations/components/table/custom-table";
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
      <CustomTable />
    </OrganizationWrapper>
  );
}
