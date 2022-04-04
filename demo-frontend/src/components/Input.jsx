import { ErrorMessage, Field } from "formik";

const Input = ({ name, type, label, placeholder }) => {
  return (
    <div style={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} type={type} style={styles.input} />
      <ErrorMessage name={name} component="div" style={styles.error} />
    </div>
  );
};

export default Input;

const styles = {};

styles.wrapper = {
  display: "flex",
  flexDirection: "column",
  gap: ".2rem",
  alignItems: "flex-start",
  margin: "2rem 0",
  width: "20rem",
};

styles.input = {
  padding: ".7rem 1rem",
  border: "1px solid #e5e5e5",
  outline: "none",
  borderRadius: "10px",
  width: "100%",
};

styles.error = {
  color: "red",
  width: "100%",
  textAlign: "left",
};
