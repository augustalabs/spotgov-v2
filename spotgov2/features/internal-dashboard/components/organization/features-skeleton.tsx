import { Skeleton } from "@/components/ui/skeleton";

function FeaturesSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-8 w-full" />
      ))}
    </div>
  );
}

export default FeaturesSkeleton;
