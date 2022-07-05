import React, {forwardRef, LegacyRef} from "react";
import useIsMounted from "../hooks/useIsMounted";

function MountControl({children, ...props}: React.HTMLProps<HTMLDivElement>, ref?: LegacyRef<HTMLDivElement>){
  const isMounted = useIsMounted();
  return <div ref={ref} {...props}>
    {
      isMounted ? children : null
    }
  </div>
}

export default forwardRef(MountControl)