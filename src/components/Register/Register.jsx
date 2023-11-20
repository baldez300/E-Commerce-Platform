import { signal, computed } from "@preact/signals-react";
import { useEffect } from "react";
// StateVariables aka Signals
import { pageStates } from "../Content";
import { currentUser } from "../Header/Login";
// Utils
import {
  hideOnePage,
  showOnePage,
  showOnlyOnePage,
} from "../../utils/changePageStates";
// Images
import { BiUserCheck } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import visibilityOff from "../../images/icons/visibility_off.svg";
import visibilityOn from "../../images/icons/visibility_on.svg";
// Styles
import "./Register.css";

const submitForm = signal({
  email: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  address: {
    street: "",
    number: "",
    postalCode: "",
    city: "",
    country: "",
  },
});

const passwordError = signal("");
const registerError = signal("");
const passwordStrength = signal({
  isUppercase: false,
  hasNumbers: false,
  hasSpecialChars: false,
  isLong: false,
});

const Register = () => {
  const passwordStrengthCount = computed(() => {
    return Object.values(passwordStrength.value).filter(Boolean).length;
  });

  const passwordStrengthText = computed(() => {
    if (passwordStrengthCount.value === 1) return "Weak";
    if (passwordStrengthCount.value === 2) return "Fair";
    if (passwordStrengthCount.value === 3) return "Good";
    if (passwordStrengthCount.value === 4) return "Strong";
    return "";
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerError.value = "";
    passwordError.value = "";
    if (validatePassword()) {
      const register = async () => {
        const { email, password, firstName, lastName, phoneNumber } =
          submitForm.value;
        const { street, number, postalCode, city, country } =
          submitForm.value.address;

        const response = await fetch("http://localhost:3000/api/register", {
          method: pageStates.value.registerPage ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email ? email : null,
            password: password ? password : null,
            firstName: firstName ? firstName : null,
            lastName: lastName ? lastName : null,
            phoneNumber: phoneNumber ? phoneNumber : null,
            address: {
              street: street ? street : null,
              number: number ? number : null,
              postalCode: postalCode ? postalCode : null,
              city: city ? city : null,
              country: country ? country : null,
            },
          }),
        });
        if (response.ok) {
          hideOnePage("registerPage");
          showOnePage("loginPage");
        } else {
          registerError.value = "Something went wrong. Please try again later.";
        }
      };
      register();
    }
  };

  const validatePassword = () => {
    if (
      pageStates.value.accountPage &&
      submitForm.value.password.length === 0 &&
      submitForm.value.password2.length === 0
    )
      return true;

    if (
      submitForm.value.password.length < 8 ||
      submitForm.value.password2.length < 8
    ) {
      passwordError.value = "Password must be at least 8 characters long";
      return false;
    }

    if (submitForm.value.password !== submitForm.value.password2) {
      passwordError.value = "Passwords must match";
      return false;
    }

    return (
      submitForm.value.password.length >= 8 &&
      submitForm.value.password2.length >= 8 &&
      submitForm.value.password === submitForm.value.password2
    );
  };

  const measurePasswordStrength = (password) => {
    if (password.length >= 8) passwordStrength.value.isLong = true;
    else passwordStrength.value.isLong = false;
    if (password.match(/[A-Z]/)) passwordStrength.value.isUppercase = true;
    else passwordStrength.value.isUppercase = false;
    if (password.match(/[0-9]/)) passwordStrength.value.hasNumbers = true;
    else passwordStrength.value.hasNumbers = false;
    if (password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/))
      passwordStrength.value.hasSpecialChars = true;
    else passwordStrength.value.hasSpecialChars = false;
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById("create-form-password");
    const passwordInput2 = document.getElementById("create-form-password2");
    const visibilityIcon = document.querySelector(".visibility-icon");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordInput2.type = "text";
      visibilityIcon.src = visibilityOff;
    } else {
      passwordInput.type = "password";
      passwordInput2.type = "password";
      visibilityIcon.src = visibilityOn;
    }
  };

  useEffect(() => {
    const {
      email = "",
      firstName = "",
      lastName = "",
      phoneNumber = "",
      address = {},
    } = currentUser.value || {};

    submitForm.value = {
      email: email,
      password: "",
      password2: "",
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      address: {
        street: address.street || "",
        number: address.number || "",
        postalCode: address.postalCode || "",
        city: address.city || "",
        country: address.country || "",
      },
    };

    registerError.value = "";
    passwordError.value = "";
  }, []);

  return (
    <div className="form register-form">
      <IoIosClose
        className="checkout-template-close"
        onClick={() => (pageStates.value = showOnlyOnePage("mainPage"))}
      />
      <div className="flex gap-10px margin-left-10px margin-bottom-10px vertically-center">
        <BiUserCheck size={40} />
        <h1 className="form-title margin-0">
          {currentUser.value ? "Your Account" : "Register"}
        </h1>
      </div>
      <form method="POST" onSubmit={handleSubmit} className="margin-top-30px">
        <fieldset className="flex-column no-border">
          <div>
            <label htmlFor="create-form-email" className="block input-label">
              Your email address
            </label>
            <input
              id="create-form-email"
              type="email"
              name="email"
              value={submitForm.value.email}
              autoComplete=""
              autoFocus=""
              placeholder={
                currentUser.value ? currentUser.value?.email : "Email address"
              }
              required={pageStates.value.registerPage ? true : false}
              className="register-form-input-field"
              onChange={(e) =>
                (submitForm.value = {
                  ...submitForm.value,
                  email: e.target.value,
                })
              }
            />
          </div>

          <label htmlFor="create-form-password" className="block input-label">
            {currentUser.value ? "Change password" : "Password"}
          </label>
          <div className="pos-relative">
            <input
              id="create-form-password"
              type="password"
              name="password"
              value={submitForm.value.password}
              autoCapitalize="off"
              placeholder="Password, with at least 8 characters"
              spellCheck="false"
              autoComplete={
                currentUser.value ? "current-password" : "new-password"
              }
              required=""
              className="register-form-input-field margin-0"
              onChange={(e) => {
                measurePasswordStrength(e.target.value);
                submitForm.value = {
                  ...submitForm.value,
                  password: e.target.value,
                };
              }}
            ></input>
            <img
              src={visibilityOn}
              alt="back"
              className="visibility-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="password-strength-meter">
            <div
              className={
                passwordStrengthCount.value > 0
                  ? "password-strength-meter-portion password-strength-meter-portion-active password-strength-meter-red"
                  : "password-strength-meter-portion password-strength-meter-portion-disabled password-strength-meter-red"
              }
            ></div>
            <div
              className={
                passwordStrengthCount.value > 1
                  ? "password-strength-meter-portion password-strength-meter-portion-active password-strength-meter-orange"
                  : "password-strength-meter-portion password-strength-meter-portion-disabled password-strength-meter-orange"
              }
            ></div>
            <div
              className={
                passwordStrengthCount.value > 2
                  ? "password-strength-meter-portion password-strength-meter-portion-active password-strength-meter-yellow"
                  : "password-strength-meter-portion password-strength-meter-portion-disabled password-strength-meter-yellow"
              }
            ></div>
            <div
              className={
                passwordStrengthCount.value > 3
                  ? "password-strength-meter-portion password-strength-meter-portion-active password-strength-meter-green"
                  : "password-strength-meter-portion password-strength-meter-portion-disabled password-strength-meter-green"
              }
            ></div>
          </div>
          <div className="margin-auto-left-right margin-top-5px">
            {passwordStrengthText.value}
          </div>
          <div className="pos-relative margin-top-10px">
            <label
              htmlFor="create-form-password2"
              className="block input-label"
            >
              Confirm password
            </label>
            <input
              id="create-form-password2"
              type="password"
              name="password2"
              value={submitForm.value.password2}
              autoCapitalize="off"
              placeholder="Password, with at least 8 characters"
              spellCheck="false"
              autoComplete="new-password"
              required=""
              className="register-form-input-field"
              onChange={(e) =>
                (submitForm.value = {
                  ...submitForm.value,
                  password2: e.target.value,
                })
              }
            ></input>
            {passwordError.value && (
              <p className="error">{passwordError.value}</p>
            )}
          </div>
          <div className="two-inputs-row">
            <div>
              <label
                htmlFor="create-form-first-name"
                className="block input-label"
              >
                First name
              </label>
              <input
                id="create-form-first-name"
                type="text"
                name="firstname"
                value={submitForm.value.firstName}
                autoComplete="given-name"
                placeholder={
                  currentUser.value
                    ? currentUser.value?.firstName
                    : "First name"
                }
                required={pageStates.value.registerPage ? true : false}
                className="register-form-input-field margin-right-20px"
                onChange={(e) =>
                  (submitForm.value = {
                    ...submitForm.value,
                    firstName: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label
                htmlFor="create-form-last-name"
                className="block input-label"
              >
                Last name
              </label>
              <input
                id="create-form-last-name"
                type="text"
                name="firstname"
                value={submitForm.value.lastName}
                autoComplete="family-name"
                placeholder={
                  currentUser.value ? currentUser.value?.lastName : "Last name"
                }
                required={pageStates.value.registerPage ? true : false}
                className="register-form-input-field"
                onChange={(e) =>
                  (submitForm.value = {
                    ...submitForm.value,
                    lastName: e.target.value,
                  })
                }
              ></input>
            </div>
          </div>
          <div className="two-inputs-row">
            <div>
              <label
                htmlFor="create-form-street-address"
                className="block input-label"
              >
                Street name
              </label>
              <input
                id="create-form-street-address"
                type="text"
                name="streetadress"
                value={submitForm.value.address.street}
                autoComplete="address-line1"
                placeholder="Street name"
                required={pageStates.value.registerPage ? true : false}
                className="register-form-input-field margin-right-20px"
                onChange={(e) => {
                  submitForm.value = {
                    ...submitForm.value,
                    address: {
                      ...submitForm.value.address,
                      street: e.target.value,
                    },
                  };
                }}
              ></input>
            </div>
            <div>
              <label
                htmlFor="create-form-street-number"
                className="block input-label"
              >
                Street/Appt number
              </label>
              <input
                id="create-form-street-number"
                type="text"
                name="street-number"
                value={submitForm.value.address.number}
                autoComplete="address-line2"
                placeholder="Street/Appt number"
                required={pageStates.value.registerPage ? true : false}
                className="register-form-input-field"
                onChange={(e) => {
                  submitForm.value = {
                    ...submitForm.value,
                    address: {
                      ...submitForm.value.address,
                      number: e.target.value,
                    },
                  };
                }}
              ></input>
            </div>
          </div>
          <div className="two-inputs-row">
            <div>
              <label
                htmlFor="create-form-postal-code"
                className="block input-label"
              >
                Postal code
              </label>
              <input
                id="create-form-postal-code"
                type="text"
                name="postal-code"
                value={submitForm.value.address.postalCode}
                autoComplete="postal-code"
                placeholder="Postal code"
                required={pageStates.value.registerPage ? true : false}
                className="register-form-input-field margin-right-20px"
                onChange={(e) => {
                  submitForm.value = {
                    ...submitForm.value,
                    address: {
                      ...submitForm.value.address,
                      postalCode: e.target.value,
                    },
                  };
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="create-form-city" className="block input-label">
                City
              </label>
              <input
                id="create-form-city"
                type="text"
                name="street-number"
                value={submitForm.value.address.city}
                autoComplete="address-level2"
                placeholder="City"
                required={pageStates.value.registerPage ? true : false}
                className="register-form-input-field"
                onChange={(e) => {
                  submitForm.value = {
                    ...submitForm.value,
                    address: {
                      ...submitForm.value.address,
                      city: e.target.value,
                    },
                  };
                }}
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="create-form-country" className="block input-label">
              Country
            </label>
            <input
              id="create-form-country"
              type="text"
              name="country"
              value={submitForm.value.address.country}
              autoComplete="country"
              placeholder="Country"
              required={pageStates.value.registerPage ? true : false}
              className="register-form-input-field"
              onChange={(e) => {
                submitForm.value = {
                  ...submitForm.value,
                  address: {
                    ...submitForm.value.address,
                    country: e.target.value,
                  },
                };
              }}
            ></input>
          </div>
          <div>
            <label
              htmlFor="create-form-phone-number"
              className="block input-label"
            >
              Phone number
            </label>
            <input
              id="create-form-phone-number"
              type="tel"
              name="phone-number"
              value={submitForm.value.phoneNumber}
              autoComplete="tel mobile"
              placeholder={
                currentUser.value
                  ? currentUser.value?.phoneNumber
                  : "Phone number"
              }
              required={pageStates.value.registerPage ? true : false}
              className="register-form-input-field"
              onChange={(e) =>
                (submitForm.value = {
                  ...submitForm.value,
                  phoneNumber: e.target.value,
                })
              }
            ></input>
          </div>
          {registerError.value && (
            <p className="error">{registerError.value}</p>
          )}
          <button id="create-account-button" type="submit" className="btn">
            {currentUser.value ? "Save changes" : "Create account"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;