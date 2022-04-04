const Button = (props) => {
  return <button {...props} style={styles.button}></button>;
};

export default Button;

const styles = {};

styles.button = {
  backgroundColor: "blue",
  color: "#fff",
  border: "none",
  padding: ".5rem 1rem",
  borderRadius: "10px",
};
