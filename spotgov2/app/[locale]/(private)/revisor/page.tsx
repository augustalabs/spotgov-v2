import Header from "@/components/header";
import { PROPOSAL_REVIEW_ROUTE } from "@/routes";

const ProposalReviewPage = () => {
  return (
    <section>
      <Header title={PROPOSAL_REVIEW_ROUTE.label} />
    </section>
  );
};

export default ProposalReviewPage;
