import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/ProfilePage.css'; // Ensure to update your CSS accordingly

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const loginStatus = searchParams.get("loginStatus");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("images/profile.png");

  useEffect(() => {
    const fetchProfile = async () => {
      if (loginStatus) {
        try {
          const response = await axios.get(`http://localhost:3001/getUserInfo`, {
            params: { loginStatus },
          });
          setProfile(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
    fetchProfile();
  }, [loginStatus]);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfileImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleProfile = () => {
    navigate(`/profile?loginStatus=${loginStatus}`);
  };

  const handleLogout = () => {
    navigate(`/loginsignup?loginStatus=${null}`);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await axios.put(
        `http://localhost:3001/updateUserInfo`,
        profile
      );
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.log({profile})
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark pt-4" style={{ background: '#0D1321' }}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-2" href={`/sizebasedcalc?loginStatus=${loginStatus}`}>
            <img className="rounded-circle" src="images/co2.png" height="44.8px" width="86.8" alt="logo" />
            <span className="BrandName1">EcoMine</span>
            <span className="BrandName2">Insight</span>
          </a>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link fs-6 rounded-3 m-1" href={`/history?loginStatus=${loginStatus}`}>
                History
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              <button type="button" onClick={handleProfile} className="opt btn btn-outline-dark m-2">
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button type="button" onClick={handleLogout} className="opt btn btn-outline-dark m-2">
                LogOut
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Welcome Message */}
      <div className="min-vh-100" style={{ background: '#0D1321' }}>
      <div className="welcome-message text-center">
        <h1 className="display-5 pt-5">Welcome, {profile.name}!</h1>
        <p className="lead">Manage your account details below.</p>
      </div>

      {/* Profile Page Layout */}
      <div className="container-prof">
        <section className="profile">
          <div className="profile-info">
            <div {...getRootProps()} className="position-relative profile-image m-2">
              <input {...getInputProps()} />
              <img src={profileImage} alt="Profile" className="img-fluid rounded-circle" />
              <div className={`overlay overlayprof ${isDragActive ? "active" : ""}`}>
                <p className="ms-4">{isDragActive ? "Drop the image here" : "Click or drag to upload"}</p>
              </div>
            </div>
            <div className="info m-2">
              <p><strong>{profile.name}</strong></p>
              <p>{profile.email}</p>
            </div>
          </div>
          <button className="opt1 edit-btn btn btn-dark m-3" onClick={handleEdit}>
            <FaEdit /> Edit
          </button>
        </section>

        {/* Details Section */}
        <section className="details ms-4 fs-5">
          <div className="input-group">
            <label>Full Name :</label>
            {isEditing ? (
              <input type="text" name="name" value={profile.name} onChange={handleChange} />
            ) : (
              <p className="ms-3">{profile.name}</p>
            )}
          </div>
          <div className="input-group">
            <label>Email :</label>
            {isEditing ? (
              <input type="email" name="email" value={profile.email} onChange={handleChange} disabled="true"/>
            ) : (
              <p className="ms-3">{profile.email}</p>
            )}
          </div>
          <div className="input-group">
            <label>Mobile :</label>
            {isEditing ? (
              <input type="text" name="mobile" value={profile.mobile} onChange={handleChange} />
            ) : (
              <p className="ms-3">{profile.mobile}</p>
            )}
          </div>
          <div className="input-group">
            <label>Gender :</label>
            {isEditing ? (
              <input type="text" name="gender" value={profile.gender} onChange={handleChange} />
            ) : (
              <p className="ms-3">{profile.gender}</p>
            )}
          </div>

          {/* Save Button */}
          {isEditing && (
            <button onClick={handleSave} className="opt1 btn btn-dark mt-3">
              Save
            </button>
          )}
        </section>
      </div>
      </div>
    </>
  );
};

export default ProfilePage;
