import React, {forwardRef, LegacyRef} from "react";
import useIsMounted from "../hooks/useIsMounted";

export default function MountControl({children, placeholder}: React.PropsWithChildren<{
  placeholder?: React.ReactNode
}>){
  const isMounted = useIsMounted();
  return isMounted ? <>{children}</> : <>{placeholder}</>
}