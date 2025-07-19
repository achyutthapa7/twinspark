import { useDispatch, useSelector } from "react-redux";

export const useRedux = () => {
  const dispatch = useDispatch();
  const useAppSelector = useSelector;
  return { dispatch, useAppSelector };
};
