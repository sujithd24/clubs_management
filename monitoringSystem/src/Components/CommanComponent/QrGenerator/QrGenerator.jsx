import React from "react";
import { QRCodeSVG } from "qrcode.react";
import './QrGenerator.css'

const StudentQRCode = ({ name, year, clubName, email, rollNumber }) => {
  const studentData = {
    name: name,
    year: year,
    clubName: clubName,
    email: email,
    rollNumber: rollNumber,
  };

  const studentInfo = JSON.stringify(studentData);

  return (
    <div className="QRContent">
      <QRCodeSVG value={studentInfo} size={`400px`}/>
    </div>
  );
};

export default StudentQRCode;
