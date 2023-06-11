import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "twilio/lib/rest/conversations/v1/user";
import jwtDecode, { JwtPayload } from "jwt-decode";
import SendMoneyModals from "./Modals/SendMoneyModals";
import { Modal, Button } from "react-bootstrap";

const Home = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [visiblity, setVisibility] = useState(false);
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");
  const showModal = () => {
    setVisibility(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch(
            "http://localhost:9090/auth/api/profile",
            {
              method: "GET",
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const email = data.email;
            const firstname = data.firstname;
            const lastname = data.lastname;
            const number = data.number;

            setEmail(email);
            setFirstname(firstname);
            setLastname(lastname);
            setNumber(number);
          } else {
            console.error("Error fetching profile:", response.status);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    const fetch_balance = async()=>{
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:9090/auth/api/balance",
            {
              method: "GET",
              headers: {
                Authorization: `${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            const balance = data.balance;
            const account = data.account;
            
            setBalance(balance);
            setAccount(account);
           
          } else {
            console.error("Error fetching profile:", response.status);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    }

    fetch_balance();
    fetchProfile();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row bg-dark">
          <div className="col-md-2 mt-1">
            <h5 className="text text-light mt-2">E-Wallet</h5>
          </div>
          
          
          <div className="col-md-1 mt-2 mb-1">
            <div className="dropdown">
              <a
                className="btn btn-dark dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Transfers
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => setVisibility(true)}
                  >
                    Send Money
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Withraw
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="col-md-1 mt-2 mb-1">
            <div className="dropdown">
              <a
                className="btn btn-dark dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Accounts
              </a>

              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Check Balance
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Statement
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-1 mt-1">
            
          </div>
          <div className="col-md-2 ms-1 mt-1">
            <p className="text text-light mt-2">Balance: Ksh {balance} </p>
          </div>
          <div className="col-md-2 mt-2">
            {email ? (
              <p className="text text-light mt-1 me-2"> {email}</p>
            ) : (
              <p>No user found</p>
            )}
          </div>

          <div className="col-md-2 mt-1 mb-1 ms-5">
            <button type="submit" className="btn btn-info">
              {" "}
              Logout
            </button>
          </div>
        </div>

        {visiblity && (
          <SendMoneyModals values={()=>setBalance(balance)} onClose={() =>setVisibility(false)}/>
        )}
      </div>
    </div>
  );
};

export default Home;
