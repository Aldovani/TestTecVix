import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/auth/login";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useZResetAllStates } from "../stores/useZResetAllStates";
import { useZUserProfile } from "../stores/useZUserProfile";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpenModalUserNotActive, setLoginTime } = useZGlobalVar();
  const { setUser } = useZUserProfile();
  const { resetAllStates } = useZResetAllStates();
  const navigate = useNavigate();

  const goLogin = async ({
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) => {
    setIsLoading(true);
    if (!email && !password) {
      setIsLoading(false);
      toast.error("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const response = await login({ email, password });

    setIsLoading(false);
    if (response.error) {
      toast.error(response.message || "Erro ao tentar efetuar login.");
      return;
    }

    if (!response.data.user?.isActive) {
      setIsOpenModalUserNotActive(true);
      return;
    }

    setUser({
      idUser: response.data.user.idUser,
      profileImgUrl: response.data.user.profileImgUrl,
      username: response.data.user.username,
      userEmail: response.data.user.email,
      idBrand: response.data.user.idBrandMaster,
      token: response.data.accessToken,
      role: response.data.user.role,
      userPhoneNumber: response.data.user.userPhoneNumber,
    });
    setLoginTime(new Date());

    return navigate("/");
  };

  const goLogout = () => {
    resetAllStates();
    return navigate("/login");
  };

  return { goLogin, isLoading, goLogout };
};
