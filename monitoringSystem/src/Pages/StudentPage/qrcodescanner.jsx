import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const scannerRef = useRef(null);

  const initializeScanner = () => {
    // Clear previous scanner from DOM and memory
    if (scannerRef.current) {
      scannerRef.current.clear().catch((err) =>
        console.error("Failed to clear scanner before re-init:", err)
      );
    }

    // Clear the #reader div's content to prevent duplicates
    const readerElement = document.getElementById("reader");
    if (readerElement) {
      readerElement.innerHTML = "";
    }

    // Create and render new scanner instance
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    });

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear().catch((err) =>
          console.error("Failed to clear scanner after success:", err)
        );
      },
      (error) => {
        setErrorMessage("QR Code not found. Try again.");
        console.error("QR Scanner Error:", error);
      }
    );

    scannerRef.current = scanner;
  };

  useEffect(() => {
    initializeScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) =>
          console.error("Failed to clear scanner on unmount:", err)
        );
      }
    };
  }, []);

  const handleScanAgain = () => {
    setScanResult(null);
    setErrorMessage("");
    setTimeout(() => {
      initializeScanner(); // Re-init scanner after reset
    }, 100);
  };

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
          <p>
            <a href={scanResult} target="_blank" rel="noopener noreferrer">
              {scanResult}
            </a>
          </p>
          <button onClick={handleScanAgain}>Scan Again</button>
        </div>
      )}
    </div>
  );
};

export default QrCodeScanner;
