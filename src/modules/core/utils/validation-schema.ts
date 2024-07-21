// validationSchemas.ts
import * as yup from "yup";

interface InputConfig {
  name: string;
  label: string;
  type?: string;
  validation?: unknown;
}

export const createInputConfigs: InputConfig[] = [
  { name: "bankName", label: "Bank Name" },
  { name: "balance", label: "Balance" },
  { name: "digits", label: "digits" },
  { name: "name", label: "Name" },
  { name: "color", label: "Color" },
];

export const updateInputConfigs: InputConfig[] = [
  { name: "bankName", label: "Bank Name" },
  { name: "balance", label: "Balance" },
  { name: "digits", label: "digits" },
  { name: "name", label: "Name" },
  { name: "color", label: "Color" },
];

export const createSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export const updateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});
