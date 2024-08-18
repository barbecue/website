import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function useAnimationKey() {
  const pathname = usePathname();
  const uniqueKey = useMemo(() => {
    return pathname;
  }, [pathname]);
  return uniqueKey;
}
