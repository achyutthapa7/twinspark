import { useMutation } from "@tanstack/react-query";
import { userAPI } from "../api/userApi";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { Helper } from "@/utils/helper";

const useRegister = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation<AxiosResponse, Error>({
    mutationFn: userAPI.signup,
    onSuccess: ({ data }) => {
      Helper.setLocalStorage("email", data?.data?.email);
      toast.success("registration  successfull");
      router.push("/verification");
    },
    onError: Helper.handleMutationError,
  });

  return {
    isLoading: isPending,
    register: mutateAsync,
  };
};
export default useRegister;
