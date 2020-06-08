// Third
import validator from "validator";

// Initializations
const {
  isEmpty,
  isEmail,
  isAlphanumeric,
  isLength,
  matches,
  isAlpha,
} = validator;

class CredentialValidator {
  #firstname;
  #lastname;
  #username;
  #email;
  #password;
  #passwordConfirmation;

  constructor(
    firstname,
    lastname,
    username,
    email,
    password,
    passwordConfirmation
  ) {
    this.#firstname = firstname;
    this.#lastname = lastname;
    this.#username = username;
    this.#email = email;
    this.#password = password;
    this.#passwordConfirmation = passwordConfirmation;
  }

  verifyLogin() {
    const emailResult = this.verifyEmail();
    if (emailResult.error) {
      console.log("emailResult:", emailResult.error);
      return emailResult.error;
    }
    const passwordResult = this.verifyPassword();
    if (passwordResult.error) {
      return passwordResult.error;
    }
    return false;
  }

  verifySignup() {
    const namesResult = this.verifyNames();
    if (namesResult.error) {
      return namesResult.error;
    }
    const usernameResult = this.verifyUsername();
    if (usernameResult.error) {
      return usernameResult.error;
    }
    const emailResult = this.verifyEmail();
    if (emailResult.error) {
      return emailResult.error;
    }
    const passwordResult = this.verifyPassword();
    if (passwordResult.error) {
      return passwordResult.error;
    }
    const passwordConfirmationResult = this.verifyPasswordConfirmation();
    if (passwordConfirmationResult.error) {
      return passwordConfirmationResult.error;
    }
    return false;
  }

  verifyNames() {
    if (
      this.#firstname === "" ||
      this.#firstname === null ||
      this.#firstname === "null" ||
      this.#firstname === "false" ||
      this.#firstname === undefined ||
      this.#lastname === "" ||
      this.#lastname === null ||
      this.#lastname === "null" ||
      this.#lastname === "false" ||
      this.#lastname === undefined
    ) {
      return { error: "Names are required fields" };
    }
    if (
      typeof this.#firstname !== "string" ||
      typeof this.#lastname !== "string"
    ) {
      return {
        error: "Names fields only must contain alpabethical characters",
      };
    }
    this.#firstname = this.#firstname.trim();
    this.#lastname = this.#lastname.trim();
    if (
      isEmpty(this.#firstname, { ignore_whitespace: true }) ||
      isEmpty(this.#lastname, { ignore_whitespace: true })
    ) {
      return { error: "Names fields must not be empty" };
    }
    if (
      !isLength(this.#firstname, { min: 2 }) ||
      !isLength(this.#lastname, { min: 2 })
    ) {
      return { error: "Names fields must be at least 2 characters" };
    }
    if (
      !isLength(this.#firstname, { max: 30 }) ||
      !isLength(this.#lastname, { max: 30 })
    ) {
      return { error: "Names fields must be at max 30 characters" };
    }
    if (!isAlpha(this.#firstname) || !isAlpha(this.#lastname)) {
      return {
        error: "Names fields only must contain alphabetical characters",
      };
    }
    return { error: false };
  }

  verifyUsername() {
    if (
      this.#username === "" ||
      this.#username === null ||
      this.#username === "null" ||
      this.#username === "false" ||
      this.#username === undefined
    ) {
      return { error: "Username is a required field" };
    }
    if (isAlphanumeric(this.#username)) {
      return {
        error: "Username field only must contain alphanumeric characters",
      };
    }
    this.#username = this.#username.trim();
    if (isEmpty(this.#username, { ignore_whitespace: true })) {
      return { error: "Username field must not be empty" };
    }
    if (!isLength(this.#username, { min: 2 })) {
      return { error: "Username field must be at least 2 characters" };
    }
    if (!isLength(this.#username, { max: 30 })) {
      return { error: "Username field must be at max 30 characters" };
    }
    return { error: false };
  }

  verifyEmail() {
    if (
      this.#email === "" ||
      this.#email === null ||
      this.#email === "null" ||
      this.#email === "false" ||
      this.#email === undefined
    ) {
      return { error: "Email is a required field" };
    }
    if (typeof this.#email !== "string") {
      return {
        error: "Email field only must containt alphabetical characters",
      };
    }
    this.#email = this.#email.trim();
    if (isEmpty(this.#email, { ignore_whitespace: true })) {
      return { error: "Email field must not be empty" };
    }
    if (!isEmail(this.#email)) {
      return { error: "Email entered is invalid" };
    }
    return { error: false };
  }

  verifyPassword() {
    if (
      this.#password === "" ||
      this.#password === null ||
      this.#password === "null" ||
      this.#password === "false" ||
      this.#password === undefined
    ) {
      return { error: "Password is a required field" };
    }
    if (!isAlphanumeric(this.#password)) {
      return {
        error: "Password field only must contain alphanumeric characters",
      };
    }
    this.#password = this.#password.trim();
    if (isEmpty(this.#password, { ignore_whitespace: true })) {
      return { error: "Password field must be not empty" };
    }
    if (!isLength(this.#password, { min: 8 })) {
      return { error: "Password field must be at least 8 characters" };
    }
    if (!isLength(this.#password, { max: 72 })) {
      return { error: "Password field must be at max 72 characters" };
    }
    if (!matches(this.#password, /\d{1,}/)) {
      return { error: "Password field must contain at least 1 number" };
    }
    if (!matches(this.#password, /([a-z]){1,}/)) {
      return {
        error:
          "Password field must contain at least 1 lowercase alphabetical character",
      };
    }
    if (!matches(this.#password, /([A-Z]){1,}/)) {
      return {
        error:
          "Password field must contain at least 1 uppercase alphabetical character",
      };
    }
    return { error: false };
  }

  verifyPasswordConfirmation() {
    if (
      this.#password === "" ||
      this.#password === null ||
      this.#password === "null" ||
      this.#passwordConfirmation === "false" ||
      this.#passwordConfirmation === undefined
    ) {
      return { error: "Password confirmation is a required field" };
    }
    this.#passwordConfirmation = this.#passwordConfirmation.trim();
    if (isEmpty(this.#passwordConfirmation, { ignore_whitespace: true })) {
      return { error: "Password confirmation field must be not empty" };
    }
    if (this.#password !== this.#passwordConfirmation) {
      return { error: "Passwords must match" };
    }
    return { error: false };
  }
}

export default CredentialValidator;
