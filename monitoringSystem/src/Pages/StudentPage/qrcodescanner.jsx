import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10, // Increased FPS for better scanning
      qrbox: { width: 250, height: 250 }, // Adjustable scan area
      aspectRatio: 1.0, // Square scanning area
    });

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear(); // Stop scanning after a successful scan
      },
      (error) => {
        setErrorMessage("QR Code not found. Try again.");
        console.error("QR Scanner Error:", error);
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Scan Student QR Code</h2>
      {!scanResult ? (
        <div>
          <div id="reader" style={{ width: "300px", margin: "auto" }}></div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <h3>Scanned Result:</h3>
          <p>{scanResult}</p>
          <button onClick={() => window.location.reload()}>Scan Again</button>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;
