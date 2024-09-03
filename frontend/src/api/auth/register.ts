import axios from "axios";
import { api } from "../instance";

export const registerUser = async (values: any) => {
  const res = api.post("/api/users/register/?format=json", values);
  console.log(res);
};
