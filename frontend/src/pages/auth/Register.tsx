import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, Mail, Lock, MapPin, Info, Calendar } from "lucide-react"; // Importing icons from lucide-react
import { registerUser } from "@/api/auth/register";
import { Link, useNavigate } from "react-router-dom";
import { notifyError } from "@/components/common/Toast";

type Props = {};

const Register = (props: Props) => {
  // Define validation schema
  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    bio: Yup.string().max(150, "Bio must be less than 150 characters"),
    location: Yup.string().required("Location is required"),
    birth_date: Yup.date().nullable().required("Birth date is required"),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      location: "",
      birth_date: undefined,
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (values: any) => {
    try {
      values.birth_date = values.birth_date.toISOString().slice(0, 10);
      registerUser(values);
      navigate("/login");
    } catch (error) {
      notifyError("Failed to register");
    }
  };

  useEffect(() => {
    console.log(form.getValues());
  }, [form.getValues()]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Form {...form}>
          {/* Username Field */}
          <div className="mb-4">
            <div className="relative">
              <Input
                icon={<User />}
                form={form}
                label="Username*"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="pl-10" // Add padding to make room for the icon
              />
            </div>
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <div className="relative">
              <Input
                icon={<Mail />}
                form={form}
                label="Email*"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10" // Add padding to make room for the icon
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <div className="relative">
              <Input
                icon={<Lock />}
                form={form}
                label="Password*"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10" // Add padding to make room for the icon
              />
            </div>
          </div>
          {/* Bio Field */}
          <div className="mb-4">
            <div className="relative">
              <Input
                icon={<Info />}
                form={form}
                label="Bio"
                name="bio"
                type="text"
                placeholder="Tell us about yourself"
                className="pl-10" // Add padding to make room for the icon
              />
            </div>
          </div>
          {/* Location Field */}
          <div className="mb-4">
            <div className="relative">
              <Input
                icon={<MapPin />}
                form={form}
                label="Location*"
                name="location"
                type="text"
                placeholder="Enter your location"
                className="pl-10" // Add padding to make room for the icon
              />
            </div>
          </div>
          {/* Birth Date Field */}
          <div className="mb-6">
            <div className="relative">
              <Input
                icon={<Calendar />}
                form={form}
                label="Birth Date*"
                name="birth_date"
                type="date"
                placeholder="Select your birth date"
                className="pl-10" // Add padding to make room for the icon
              />
            </div>
          </div>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            // type="submit"
            className="w-full"
          >
            Register
          </Button>
        </Form>
        <Link
          to="/login"
          className="text-center inline-block w-full text-blue-900"
        >
          Already have an account? <u>Goto login</u>
        </Link>
      </div>
    </div>
  );
};

export default Register;
