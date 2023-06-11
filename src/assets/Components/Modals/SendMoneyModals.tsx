import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

interface Props {
  onClose: () => void;
  values: () =>void;
}

interface FormData {
  account: string;
  amount: string;
  owner_account: string;
  pin: string;
}

const SendMoneyModals = ({ onClose,values}: Props) => {
  const [formData, setFormData] = useState<FormData>({
    account: "",
    amount: "",
    owner_account: "",
    pin: ""
  });

  const [alertErrors, setAlertError] = useState("");
  const [invalidPin, setInvalidPin] = useState("");
  const [insufficient, setInsufficient] = useState("");
  const [notFound, setNotFound] = useState("");
  const [notKnown, setNotKnown] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [balance, setBalance] = useState("");
  const [get_account, setAccount] = useState("");

  const shouldRender = false;


  useEffect(() => {
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
            const get_account = data.account;
            
            setBalance(balance);
            setAccount(get_account);

            setFormData((prevState) => ({
              ...prevState,
              owner_account: get_account
            }));
           
          } else {
            console.error("Error fetching profile:", response.status);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    }

    fetch_balance();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9090/auth/api/send_money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setAlertError("Successfully transferred");
      } else if (response.status === 400) {
        setInsufficient("Insufficient Balance");
      } else if (response.status === 401) {
        setInvalidPin("Failed! Invalid Pin");
      } else if (response.status === 404) {
        setNotFound("User does not exist");
      }else if(response.status ===403){
        setNotKnown("Unknown error occurred")
      }
    } catch (error) {
      console.log(error);
    }
  };
  const hidden = false
  return (
    <div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 shadow mt-5">
          {alertErrors && <div className="alert alert-success">{alertErrors}</div>}
          {invalidPin && <div className="alert alert-danger">{invalidPin}</div>}
          {insufficient && <div className="alert alert-danger">{insufficient}</div>}
          {notFound && <div className="alert alert-danger">{notFound}</div>}
          {notKnown && <div className="alert alert-danger">{notKnown}</div>}

          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title>Send Money</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>

             
               { hidden &&<input
                  type="text"
                  id="owner_account"
                  name="owner_account"
                  value={get_account}
                  onChange={handleChange}
                  placeholder="Enter owner account no:"
                  className="form-control"
                  aria-labelledby="owner_account"
                  required
                />}
      
              <div>
                <label htmlFor="account" className="form-label">
                  Account Number
                </label>
                <input
                  type="text"
                  id="account"
                  name="account"
                  value={formData.account}
                  onChange={handleChange}
                  placeholder="Enter account no:"
                  className="form-control"
                  aria-labelledby="account"
                  required
                />
              </div>
              <div>
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="form-control"
                  aria-labelledby="amount"
                  required
                />
              </div>
              <div>
                <label htmlFor="pin" className="form-label">
                  Pin
                </label>
                <input
                  type="password"
                  id="pin"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="Enter pin"
                  className="form-control"
                  aria-labelledby="pin"
                  required
                />
              </div>
              <div>
                <button type="submit" className="btn btn-primary ms-1 mt-2 mb-2">
                  Save changes
                </button>
              </div>
            </form>
          </Modal.Body>
       
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default SendMoneyModals;
