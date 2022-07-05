import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../store";

export default function useIsMounted(){
  const isMounted = useSelector((state: RootState) => state.project!.isMounted);
  const dispatch = useDispatch<Dispatch>()

  useEffect(() => {dispatch.project.setIsMounted(true)}, [])

  return isMounted
};