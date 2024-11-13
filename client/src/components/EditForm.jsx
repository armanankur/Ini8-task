import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditForm = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate(); // For navigation

  // State variables for form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
  });

  // Fetch user data if updating
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/users/${id}`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [id]);

  // Handle input change in form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (create or update user)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update user if ID exists
        await axios.put(`http://localhost:5000/api/users/${id}`, formData);
        console.log("User updated successfully");
      } else {
        // Create new user
        await axios.post("http://localhost:5000/api/users", formData);
        console.log("User created successfully");
      }

      // Clear the form
      setFormData({ username: "", email: "", dob: "" });

      // Redirect to user list page
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          {id ? "Update User Details" : "Create User Details"}
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
                  {id ? "UPDATE" : "Create"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditForm;
