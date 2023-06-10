/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { useAuth0 } from "@auth0/auth0-react";
import UpdateForm from "../components/UpdateForm";

function Dashboard() {

  const [isChecked, setIschecked] = useState(false)
  const { logout } = useAuth0();
  const { user } = useContext(UserContext);
  if (!user) {
    return null;
  }

  const handeleCheckBox =()=>{
    setIschecked(!isChecked)
  }


  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/v1/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("It has been deleted successfully.");
          logout({ logoutParams: { returnTo: window.location.origin } });
        } else {
          throw new Error("An error occurred while deleting the record.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container className="mb-5 d-flex justify-content-around">
      <div className="mt-5 ms-5 col-lg-3">
       {isChecked ? <UpdateForm /> : "" } 
      </div>

      <div className="card bg-white text-white p-0 mt-5 ms-5 col-lg-3 ">
        <div className="text-center m-3">
          <img
            src={user?.picture}
            className=" w-50 card-img-top rounded-circle "
            alt="Profile"
          />
        </div>

        <div className="card-body bg-primary">
          <p className="card-text">
            Name: <b>{user?.name}</b>
          </p>
          <hr className="text-white"></hr>
          <p className="card-text">
            Email: <b>{user?.email}</b>
          </p>
          <hr className="text-white"></hr>
          <p className="card-text">
            Profession: <b>{user?.role}</b>
          </p>
          <hr className="text-white"></hr>
          <div className="d-flex justify-content-between">
            <button
              onClick={() => handleDelete(user?.id)}
              className="text-danger border-0 px-4 py-3 rounded-2"
            >
              <i className="bi bi-archive-fill"></i>
            </button>
            <button
              
              onClick={(e)=>{handeleCheckBox()}}
              className="text-primary border-0 px-4 py-3 rounded-2"
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
