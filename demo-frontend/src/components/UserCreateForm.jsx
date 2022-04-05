import { Formik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import { request } from "../utils/requests";
import Button from "./Button";
import Input from "./Input";

const UserCreateForm = ({ submitUrl, method, data }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Invalid number"),
  });

  const queryClient = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation(
    method == "POST" ? "userCreate" : ["userUpdate", data.id],
    (data) =>
      request({
        url: submitUrl,
        method,
        data,
      }),

    {
      enabled: false,
      onSuccess: () => queryClient.invalidateQueries("usersList"),
    }
  );

  const onSubmit = (values, { setSubmitting }) => {
    mutate(values);
    setSubmitting(false);
  };

  if (isSuccess) return <Navigate to="/" />;

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
        {isError && (
          <div
            style={{
              margin: "2rem 0",
              color: "red",
            }}
          >
            User Already exist with this email
          </div>
        )}
        {/* <Button type="button"> */}
        <Link to="/">Go Back</Link>
        {/* </Button> */}
        <h1>Add a new User</h1>
        <Formik
          initialValues={
            data
              ? data
              : { name: "", email: "", password: "", phone: "", address: "" }
          }
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Input
                name="name"
                label="Name"
                placeholder="John Doe"
                type="text"
              />
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
              <Input
                name="phone"
                label="Phone No."
                placeholder="999999XXXX"
                type="text"
              />
              <Input
                name="address"
                label="Address"
                placeholder="Address"
                type="text"
              />
              <Button type="submit" disabled={isSubmitting}>
                {method == "POST" ? "Add User" : "Update User"}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UserCreateForm;
