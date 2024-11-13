import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  Paper,
} from "@mui/material";

const RegistrationForm = () => {
  // State variables for form data and userId
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
  });
  const [userId, setUserId] = useState(null); // Track the userId for update
  const [users, setUsers] = useState([]); // To store fetched users

  // Handle input change in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch users after form submission
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form submission (create or update user)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData
      );
      alert(`welcome ${formData.username}`);

      // Clear the form
      setFormData({ username: "", email: "", dob: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Registration Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Date of Birth Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="DOB"
                  variant="outlined"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button type="submit" variant="contained" color="primary">
                    Register
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}>
      <Link to="/users">
          <Button variant="contained"> View Users</Button>
        </Link>
      </div>
    </>
  );
};

export default RegistrationForm;
