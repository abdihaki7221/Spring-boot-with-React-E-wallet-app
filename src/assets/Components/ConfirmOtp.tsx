import { Link } from "react-router-dom";
import SideForm from "./SideForm";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
interface FormData {
  number: string;
  otp: string;
}

interface Error {
  number: string;
  otp: string;
}

const ConfirmOtp = () => {
  const [formData, setFormData] = useState<FormData>({
    otp: "",
    number: "",
  });

  //number to send otp to stringify
  const { number } = formData;

  const postData = JSON.stringify({
    number,
  });

  const [otpErrors, setOtpErrrors] = useState("");
  const [sentNotice, setNoticeSent] = useState("");
  const [alertException, setAlertException] = useState("");
  const alertResponse = {
    otpErrors: "Invalid otp.Please try again!",
    sentNotice: "Verification code has been sent!",
    alertException: "The phone is not registered with Us!",
  };
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9090/auth/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        setOtpErrrors(alertResponse.otpErrors);
      }
    } catch (error) {
      console.log("error occured");
    }
  };

  const handleResend = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const resendOtpResponse = await fetch(
        "http://localhost:9090/auth/api/Re-Send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: postData,
        }
      );
      if (resendOtpResponse.ok) {
        setNoticeSent(alertResponse.sentNotice);
      } else {
        setAlertException(alertResponse.alertException);
      }
    } catch (error) {
      console.log("other errors occurred");
    }
  };

  return (
    <div className="container-fluid register-container">
      <div className="row row-register">
        <SideForm text="Our login authentication is one of the most secure in the world"></SideForm>
        <div className="col-md-5 ms-2 register-column ">
          <div className="text-center">
            <h5 className="bold text-start mb-2"> One Last Click</h5>
            <p className="text-start mb-2">
              An Otp has been sent you phone number
            </p>
          </div>
          {otpErrors && <div className="alert alert-danger">{otpErrors}</div>}
          {alertException && (
            <div className="alert alert-danger">{alertException}</div>
          )}
          {sentNotice && (
            <div className="alert alert-success">{sentNotice}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="phone" className="form-label">
                phone number
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="form-control"
                aria-labelledby="phone"
                required
              />
            </div>

            <div>
              <label htmlFor="Otp" className="form-label">
                Otp
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="form-control"
                aria-labelledby="otp"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Confirm
            </button>
            <div>
              <p className="mt-1">
                Did Get Otp?
                <span>
                  <button
                    type="submit"
                    className="btn btn-light text-primary"
                    onClick={handleResend}
                  >
                    Resend
                  </button>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOtp;
