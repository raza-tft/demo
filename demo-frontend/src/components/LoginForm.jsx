import { Formik } from "formik";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../store";
import { request } from "../utils/requests";
import Button from "./Button";
import Input from "./Input";

const LoginForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
  });

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const { mutate, data, isError } = useMutation(
    "login",
    (data) =>
      request({
        url: "/auth/login",
        method: "POST",
        data,
      }),
    {
      enabled: false,
      onSuccess: () => queryClient.invalidateQueries("usersList"),
    }
  );

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    mutate(values);
  };

  useEffect(() => {
    if (isError) alert("Invlid Credentials");
    if (data && !isError) {
      dispatch(login(data.data.data.user));
    }
  }, [data, isError]);

  if (auth?.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Input
                name="email"
                label="Email"
                placeholder="example@mail.com"
                type="email"
              />
              <Input
                name="password"
                label="password"
                placeholder="password"
                type="password"
              />

              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;
