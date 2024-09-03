import { api } from "../instance";

export const addNewPost = (formData: FormData) => {
  return api.post("/api/trips/?format=json", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
