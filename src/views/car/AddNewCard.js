import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddNewCar = () => {
  const [carData, setCarData] = useState({
    license: "",
    name: "",
    driverName: "",
    brand: "",
    capacity: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        alert("Car added successfully!");
        navigate("/cars"); // Navigate back to car listing page
      } else {
        alert("Failed to add car");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("An error occurred while adding the car");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Car
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="License"
                variant="outlined"
                fullWidth
                name="license"
                value={carData.license}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Car Name"
                variant="outlined"
                fullWidth
                name="name"
                value={carData.name}
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
                value={carData.driverName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Brand"
                variant="outlined"
                fullWidth
                name="brand"
                value={carData.brand}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Capacity"
                variant="outlined"
                fullWidth
                name="capacity"
                value={carData.capacity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Add Car
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddNewCar;
