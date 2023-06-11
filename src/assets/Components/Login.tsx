import React, { useState } from "react";
import SideForm from "./SideForm";
import { Link, useNavigate } from "react-router-dom";



interface FormData{
  email: string,
  password: string
}

interface Error{
  email: string,
  password: string
}
const Login = () => {

  //form input errors
  const [errors, setErrors] = useState<Error>({
   
    email: "",
   
    password: ""
    
  });
  //page navigation
  const navigate = useNavigate()
  //errors alert errors
  const [alertErrors, setAlertError] = useState("")

  const alertResponse = {
    alertErrors: "Invalid credentials"
  }

  const [formData,setFormData] = useState<FormData>({
    email: "",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData( {...
          formData,
          [e.target.name]: e.target.value
        })
  }
  //handle submit : form submition
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
    
    const validationErrors = validation();
    setErrors(await validationErrors);
  }
  const [user, setUser] = useState('');
  const validation = async (): Promise<Error> =>{
    const validationErrors: Error= {
        email: "",
        password: ""
    }

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Enter a valid email";
    }
    if (!formData.password) {
      validationErrors.password = "password is required";
    }else{
      try {
        const response = await fetch("http://localhost:9090/auth/api/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(formData)
        }
        )

        if(response.status === 200){
          const data = await response.json();
         
          const token =data.token;
          localStorage.setItem("token",token);
          navigate("/home") 

        }if (response.status === 401) {
          navigate("/Otp-Verify")
          
        }if(response.status === 400){
          
          setAlertError(alertResponse.alertErrors)
        }

      } catch (error) {
        console.log("error occured!")
      }
    }

    return validationErrors;

  }

  return (
    <div className="container-fluid register-container">
      <div className="row row-register">
        <SideForm text="Our login authentication is one of the most secure in the world"></SideForm>
        <div className="col-md-5 ms-2 register-column ">
          <div className="text-center">
            <h5 className="bold text-start mb-2"> Get started</h5>
            <p className="text-start mb-2">Login Into Your Account</p>
          </div>
          {alertErrors && <div className="alert alert-danger">{alertErrors}</div>}
          <form onSubmit={handleSubmit}>
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
            </div>
            {errors.email && <p className="error">{errors.email}</p>}

            <div>
              <label htmlFor="inputPassword5" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="inputPassword5"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control mb-2"
                aria-labelledby="passwordHelpBlock"
                required
              />
            </div>
            {errors.password && <p className="error">{errors.password}</p>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div>
              <p className="mt-1">
                Not Registered?
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
