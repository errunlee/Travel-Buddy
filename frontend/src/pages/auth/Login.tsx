import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail, Lock } from "lucide-react"; // Importing icons from lucide-react
import { loginUser } from "@/api/auth/login";
import { Link, useNavigate } from "react-router-dom";
import { notifyError, Toaster } from "@/components/common/Toast";

type Props = {};

const Login = (props: Props) => {
  // Define validation schema
  const schema = Yup.object().shape({
    username: Yup.string()
      // .email("Invalid email address")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit = (values: any) => {
    const login = async () => {
      try {
        await loginUser(values);
        navigate("/");
      } catch (err) {
        // alert("err");
        notifyError("Failed to login");
      }
    };

    login();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Toaster />
        <Form {...form}>
          <div className="mb-4">
            <div className="relative">
              <Input
                icon={<Mail />}
                form={form}
                label="Username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="pl-10" // Add padding to make room for the icon
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="relative">
              <Input
                icon={<Lock />}
                form={form}
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10" // Add padding to make room for the icon
              />
            </div>
          </div>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </Form>
        <Link
          to="/register"
          className="text-center inline-block w-full text-blue-900"
        >
          Don't have an account? <u>Goto register</u>
        </Link>
      </div>
    </div>
  );
};

export default Login;
