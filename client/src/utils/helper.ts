import toast from "react-hot-toast";
import { AxiosError } from "axios";

const handleMutationError = (error: unknown) => {
  const err = error as AxiosError<{ message?: string }>;
  const message =
    err?.response?.data?.message || err.message || "Something went wrong";
  toast.error(message);
};

const setLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getLocalStorage = <T>(key: string) => {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
};
const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};
export const Helper = {
  handleMutationError,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
};
