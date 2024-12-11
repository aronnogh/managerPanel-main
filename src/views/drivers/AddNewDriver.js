import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const AddNewDriver = () => {
  const [driverData, setDriverData] = useState({
    license: "",
    driverName: "",
    userName: "",
    password: "",
    carName: "",
    carNumber: "",
    // lat, lng, totalTripToday, and totalTripOverAll will be managed by the backend
  });

  const [isUpdate, setIsUpdate] = useState(false); // Track if it's update mode
  const navigate = useNavigate();
  const { id } = useParams(); // Get the driver ID from URL params for updates

  // Fetch existing driver data if it's an update
  useEffect(() => {
    if (id) {
      setIsUpdate(true);
      // Fetch existing driver data from the API
      const fetchDriver = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/drivers/${id}`);
          if (response.ok) {
            const data = await response.json();
            setDriverData(data); // Pre-fill the form with current driver data
          } else {
            alert("Failed to fetch driver data");
          }
        } catch (error) {
          console.error("Error fetching driver data:", error);
        }
      };
      fetchDriver();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isUpdate ? "PUT" : "POST"; // Determine method based on whether it's update or create

    try {
      const response = await fetch(
        isUpdate
          ? `http://localhost:5000/api/drivers/update/${id}`
          : "http://localhost:5000/api/drivers",
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driverData), // Send only relevant data
        }
      );

      if (response.ok) {
        alert(isUpdate ? "Driver updated successfully!" : "Driver added successfully!");
        navigate("/drivers"); // Navigate back to driver listing page
      } else {
        alert("Failed to save driver data");
      }
    } catch (error) {
      console.error("Error saving driver data:", error);
      alert("An error occurred while saving the driver data");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {isUpdate ? "Update Driver" : "Add New Driver"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="License"
                variant="outlined"
                fullWidth
                name="license"
                value={driverData.license}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Driver Name"
                variant="outlined"
                fullWidth
                name="driverName"
                value={driverData.driverName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                name="userName"
                value={driverData.userName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={driverData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Car Name"
                variant="outlined"
                fullWidth
                name="carName"
                value={driverData.carName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Car Number"
                variant="outlined"
                fullWidth
                name="carNumber"
                value={driverData.carNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            {/* Removed lat, lng, totalTripToday, totalTripOverAll from form */}

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                {isUpdate ? "Update Driver" : "Add Driver"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddNewDriver;
