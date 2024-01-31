import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LocalStorage from "../assets/utils/localStorage";
import '../styles/ShowSummary.css';

const ShowSummary = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchShow();
  }, [id]);

  const handleBookTicket = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userName = e.target.elements.userName.value;
    const userEmail = e.target.elements.userEmail.value;
    const userNumber=e.target.elements.userNumber.value;

    // Save user details to local storage
    LocalStorage.setItem("userName", userName);
    LocalStorage.setItem("userEmail", userEmail);
    LocalStorage.setItem("userNumber", userNumber);


    setShowForm(false);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="showSummary">
      <h1>SHOW SUMMARY</h1>
      <h2 className="showSummaryName">{show.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: show.summary }} className="description" />
      <div className="btnContainer">
        <button onClick={handleBookTicket} className="BookTicketBtn commonBtn">Book Ticket</button>
        <Link to="/" className="BackBtn commonBtn">
          Back to Show List
        </Link>
      </div>
      {showForm && (
        <div className="formContainer">
        <form onSubmit={handleFormSubmit}>
          <h2 className="formHeading">Booking Form</h2>
          <p className="movieName">Movie Name: {show.name}</p>
          <label htmlFor="userName">Name:</label>
          <input type="text" id="userName" name="userName" required className="labelName" />
          <label htmlFor="userEmail">Email:</label>
          <input type="email" id="userEmail" name="userEmail" required className="labelName" />
          <label htmlFor="userNumber">Contact No:</label>
          <input type="text" id="userNumber" name="userNumber" required className="labelName" />
          
          <button type="submit" className="submitBtn commonBtn">Submit</button>
        </form>
        </div>
      )}
    </div>
  );
};

export default ShowSummary;

