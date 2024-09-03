import { api } from "../instance";

export const loginUser = async (values: any) => {
  const res: any = await api.post("/api/users/login/?format=json", values);
  localStorage.setItem("token", res.data.access);
  return res;
};
