import { api } from "../api";

type LoginData = {
  email: string;
  password: string;
};

type IUserLoginResponse =   {
  accessToken: string | null;
  user: {
    createdAt: string | Date;
    deletedAt: string | Date | null;
    email: string;
    idBrandMaster: number | null;
    idUser: string | null;
    isActive: boolean;
    profileImgUrl: null | string;
    role: "admin" | "manager" | "member";
    updatedAt: string | Date;
    username: string;
    userPhoneNumber: string | null;
  };
}
export function login({ email, password }: LoginData) {
  return api.post<IUserLoginResponse>({
    url: "/auth/login",
    data: {
      email: email,
      password: password
    },
    tryRefetch: true,
  })

}