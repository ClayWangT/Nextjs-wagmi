import {useState, useEffect} from "react";
import checkIsMounted from "../utils/checkIsMounted";

export default function useIsMounted(){
  const [mounted, setMounted] = useState(checkIsMounted())

  useEffect(() => setMounted(true), [])

  return mounted
};