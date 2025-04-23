import React, { useEffect, useState } from "react";

const PatientDashboard = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("No file selected");

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/files");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.success && Array.isArray(data.files) && data.files.length > 0) {
        setFiles(data.files);
      } else {
        setFiles([]);
        setError(data.message || "No files available.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "No file selected");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert("File uploaded successfully!");
        setSelectedFile(null);
        setFileName("No file selected");
        fetchFiles();
      } else {
        alert(`Upload failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Rendering Logic
  const renderLoading = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading files...</p>
    </div>
  );
  
  const renderError = () => (
    <div className="error-message">
      <p>Error: {error}</p>
    </div>
  );
  
  const renderFileList = () => (
    <div className="files-container">
      {files.map((file, index) => (
        <div key={index} className="file-item">
          <div className="file-info">
            <span className="file-name">{file.name}</span>
            <span className="file-size">({(file.size / 1024).toFixed(2)} KB)</span>
          </div>
          <div className="file-actions">
            <a
              href={file.downloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="file-view-button"
            >
              View
            </a>
            <a
              href={file.downloadLink}
              download={file.name}
              className="file-download-button"
            >
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNoFiles = () => (
    <div className="no-files-container">
      <p>No files uploaded yet.</p>
    </div>
  );

  return (   <>
    <nav className="navbar">
    <div className="logo-container">
        <img src="/smartcare-logo.png" alt="SmartCare Logo" className="logo" />
        <span className="logo-text">SmartCare</span>
    </div>
    <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Link</a></li>
    </ul>
</nav>
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Patient Dashboard</h2>
          <p className="dashboard-subtitle">Manage your medical documents</p>
        </div>

        <div className="upload-section">
          <h3 className="section-title">Upload Medical Records</h3>
          <div className="file-upload-container">
            <div className="file-input-group">
              <label htmlFor="file-upload" className="file-upload-label">
                Choose File
              </label>
              <input 
                type="file" 
                id="file-upload" 
                onChange={handleFileChange} 
                className="file-upload-input" 
              />
              <span className="selected-file-name">{fileName}</span>
            </div>
            <button 
              onClick={handleUpload} 
              className="upload-button"
              disabled={!selectedFile}
            >
              Upload Document
            </button>
          </div>
        </div>

        <div className="files-section">
          <h3 className="section-title">Your Medical Documents</h3>
          <div className="files-content">
            {loading ? renderLoading() : error ? renderError() : files.length > 0 ? renderFileList() : renderNoFiles()}
          </div>
        </div>
      </div>
    </div>   </>
  );
};

export default PatientDashboard;