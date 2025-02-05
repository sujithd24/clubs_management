import React, { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    clubName: "",
    date: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Feedback:", formData);
    // Add your form submission logic here, e.g., sending data to an API
  };

  return (
    <div className="allContent">
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="clubName">Club Name:</label>
        <input
          type="text"
          id="clubName"
          name="clubName"
          value={formData.clubName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          required
          style={{ width: "91%", height:"50px" }}
        />
      </div>
      <button className="feedbackformbtn" type="submit">Submit</button>
    </form>

    </div>
  );
};

export default FeedbackForm;
