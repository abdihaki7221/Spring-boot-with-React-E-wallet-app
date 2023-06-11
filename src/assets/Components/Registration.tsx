import React, { HtmlHTMLAttributes, useState } from "react";
import Button from "./Button";
import SideForm from "./SideForm";
import { Link } from "react-router-dom";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  number: string;
  confirm_password: string;
}

interface Errors {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  number: string;
  confirm_password: string;
}

const Registration = () => {
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    number: "",
    confirm_password: "",
  });

  const { firstname, lastname, email, number, password } = formData;

  const postData = JSON.stringify({
    firstname,
    lastname,
    email,
    number,
    password,
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validation();
    setErrors(await validationErrors);
  };

  //alert errors for user not found
  const [alertErrors, setAlertError] = useState("");

  const alertResponse = {
    alertErrors: "User with that email is taken",
  };

  const validation = async (): Promise<Errors> => {
    const validationErrors: Errors = {
      firstname: "",
      lastname: "",
      email: "",
      number: "",
      password: "",
      confirm_password: "",
    };

    if (!formData.firstname) {
      validationErrors.firstname = "Firstname is required";
    }
    if (!formData.lastname) {
      validationErrors.lastname = "Lastname is required";
    }
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid email";
    }
    if (!formData.number) {
      validationErrors.number = "number is required";
    }
    if (!formData.password) {
      validationErrors.password = "password is required";
    }
    if (!formData.confirm_password) {
      validationErrors.confirm_password = "Please Confirm your Password";
    } else if (formData.password !== formData.confirm_password) {
      (validationErrors.password = "Passwords don't match"),
        (validationErrors.confirm_password = "Passwords don't match");
    } else {
      // this is end point
      try {
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: postData,
        });

        if (response.ok) {
          navigate("/Otp-Verify");
        } else {
          setAlertError(alertResponse.alertErrors);
        }
      } catch (error) {
        console.log("Network error:");
      }
    }

    return validationErrors;
  };

  return (
    <>
      <div className="container-fluid register-container">
        <div className="row row-register">
          <SideForm text="our registration takes the least amount of time less than 5 mins "></SideForm>

          <div className="col-md-5 ms-2 register-column ">
            <div className="text-center">
              <h5 className="bold text-start mb-2"> Get started</h5>
              <p className="text-start mb-2">Create Your Account</p>
            </div>
            {alertErrors && (
              <div className="alert alert-danger">{alertErrors}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="form-control"
                  aria-labelledby="firstname"
                  required
                />
                {errors.firstname && (
                  <p className="error">{errors.firstname}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  onChange={handleChange}
                  value={formData.lastname}
                  className="form-control"
                  aria-labelledby="lastbame"
                  required
                />
                {errors.lastname && <p className="error">{errors.lastname}</p>}
              </div>

              <div>
                <label htmlFor="username" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  aria-labelledby="email"
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="form-control"
                  aria-labelledby="email"
                  required
                />
                {errors.number && <p className="error">{errors.number}</p>}
              </div>

              <div>
                <label htmlFor="inputPassword5" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  id="inputPassword5"
                  className="form-control mb-2"
                  aria-labelledby="passwordHelpBlock"
                  required
                />
                {errors.password && (
                  <p className="error text-danger">{errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="inputPassword5" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="comfPassword"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  name="confirm_password"
                  className="form-control mb-2"
                  aria-labelledby="passwordHelpBlock"
                  required
                />
                {errors.confirm_password && (
                  <p className="error text-danger">{errors.confirm_password}</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <div>
                <p className="mt-1">
                  Already Registered?
                  <span>
                    <Link to="/login">Login</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  );
};

export default Registration;
