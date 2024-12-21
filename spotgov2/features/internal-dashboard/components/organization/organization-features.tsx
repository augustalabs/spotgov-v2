import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Feature } from "@/database/schemas";
import FeaturesSkeleton from "@/features/internal-dashboard/components/organization/features-skeleton";
import InfoItem from "@/features/internal-dashboard/components/organization/info-item";
import FeatureItem from "@/features/internal-dashboard/components/organization/feature-item";
import {
  featureConfigs,
  FeatureKey,
} from "@/features/internal-dashboard/utils/feature-config";
import { useMutation } from "@tanstack/react-query";
import updateFeatureStateMutation from "@/features/internal-dashboard/services/update-feature-state-mutation";
import { toast } from "sonner";

function OrganizationFeatures({
  organizationId,
  features,
  isLoading,
  isError,
}: {
  organizationId: string;
  features: Feature | null;
  isLoading: boolean;
  isError: boolean;
}) {
  const updateFeaturesMutation = useMutation(
    updateFeatureStateMutation(organizationId),
  );

  const handleUpdateFeatures = (featureKey: FeatureKey, enabled: boolean) => {
    updateFeaturesMutation.mutate(
      { featureKey, enabled },
      {
        onError: (error) => {
          toast.error("Failed to update the feature state. Please try again.");
          console.error("Update error:", error);
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Organization Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <FeaturesSkeleton />}
        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load features. Please try again.
            </AlertDescription>
          </Alert>
        )}
        {!isLoading && !isError && !features && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Features</AlertTitle>
            <AlertDescription>
              No features configured for this organization.
            </AlertDescription>
          </Alert>
        )}
        {!isLoading && !isError && features && (
          <div className="grid gap-4 md:grid-cols-2">
            {(Object.keys(featureConfigs) as FeatureKey[]).map((featureKey) => {
              const config = featureConfigs[featureKey];
              const Icon = config.icon;

              return (
                <FeatureItem
                  key={featureKey}
                  label={config.label}
                  sublabel={config.sublabel}
                  description={config.description}
                  icon={<Icon className="h-5 w-5 shrink-0 text-primary" />}
                  enabled={features[featureKey] || false}
                  onToggle={() =>
                    handleUpdateFeatures(featureKey, !features[featureKey])
                  }
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OrganizationFeatures;
