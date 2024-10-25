import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter a username")
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must be at most 20 characters"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
});

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter a username")
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must be at most 20 characters"),
  email: Yup.string().email("Please enter a valid email").required(),
  phone: Yup.string()
    .min(11, "Phone number must be at least 11 digit")
    .max(13, "Phone number must be at least 13 digit"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,30}$/,
      "Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
  passwordConfirm: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords doesn't matched"),
  agree: Yup.bool().oneOf([true], "Please confirm the terms"),
});
