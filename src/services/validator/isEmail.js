// Third
import validator from "validator";

// Initializations
const { isEmpty, isEmail } = validator;

const emailValidator = (email) => {
  if (
    email === "" ||
    email === null ||
    email === "null" ||
    email === "false" ||
    email === undefined
  ) {
    return { error: "Email is a required field" };
  }
  if (typeof email !== "string") {
    return { error: "Email field only must containt alphabetic characters" };
  }
  email = email.trim();
  if (!isEmpty(email, { ignore_whitespace: true })) {
    return { error: "Email field must not be empty" };
  }
  if (!isEmail(email)) {
    return { error: "Email entered is invalid" };
  }
  return {};
};

export default emailValidator;
