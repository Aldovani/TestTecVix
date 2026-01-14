import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FullPage } from "../components/Skeletons/FullPage";
import { useZResetAllStates } from "../stores/useZResetAllStates";
import { useZUserProfile } from "../stores/useZUserProfile";

interface IProps {
  children: React.ReactNode;
  onlyManagerOrAdmin?: boolean;
  onlyAdmin?: boolean;
  skeleton?: boolean;
}

export const PrivatePage = ({
  children,
  onlyAdmin = false,
  onlyManagerOrAdmin = false,
}: IProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { role, idUser, token } = useZUserProfile();
  const { resetAllStates } = useZResetAllStates();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log({ token, idUser });
    // if (!token || !idUser) {
    //   resetAllStates();
    //   navigate("/login");
    //   return;
    // }

    // if (onlyAdmin && role !== "admin") {
    //   resetAllStates();
    //   navigate("/login");
    //   return;
    // }

    // if (onlyManagerOrAdmin && role !== "admin" && role !== "manager") {
    //   navigate(-1);
    //   return;
    // }

    setIsChecking(false);
  }, [
    idUser,
    navigate,
    onlyAdmin,
    onlyManagerOrAdmin,
    resetAllStates,
    role,
    token,
  ]);

  // if (!idUser || !token) return <FullPage />;

  if (isChecking) {
    return <FullPage />;
  }

  return <>{children}</>;
};
