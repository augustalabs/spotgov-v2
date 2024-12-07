import { resend } from "@/lib/resend/client";
import { useMemo } from "react";

function useResend() {
  return useMemo(() => resend, []);
}

export default useResend;
