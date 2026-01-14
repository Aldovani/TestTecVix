import { api } from "../api";

type RegisterData = {
  username: string;
  email: string;
  password: string;

};

export function register({ username, email, password }: RegisterData) {

  return api.post({
    url: "/auth/register",
    data: {
      username: username,
      email: email,
      password: password
    }
  })

}