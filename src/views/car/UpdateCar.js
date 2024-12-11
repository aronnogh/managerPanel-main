import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCar = () => {
  const { id } = useParams(); // Get the car id from the URL params
  const [car, setCar] = useState({
    carName: "", // Use carName as per your schema
    driverName: "",
    carNumber: "", // License replaced with carNumber as per your schema
    brand: "Unknown", // Default value as per schema
    capacity: 4, // Default value as per schema
  });
  const [isLoading, setIsLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  // Fetch the car details based on the id from the URL
  useEffect(() => {
    const fetchCar = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/cars/${id}`);
        if (!response.ok) throw new Error("Car not found.");
        const data = await response.json();
        setCar(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    return (
      car.carName &&
      car.driverName &&
      car.carNumber &&
      car.brand &&
      car.capacity
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("Please fill in all fields.");
      return;
    }

    setError(""); // Reset error

    try {
      const response = await fetch(`http://localhost:5000/api/cars/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      });
      if (!response.ok) throw new Error("Failed to update the car.");
      navigate("/cars"); // Redirect to cars list page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Update Car Details
      </Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            id="carNumber"
            label="Car Number"
            variant="outlined"
            name="carNumber"
            value={car.carNumber}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="carName"
            label="Car Name"
            variant="outlined"
            name="carName"
            value={car.carName}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="driverName"
            label="Driver Name"
            variant="outlined"
            name="driverName"
            value={car.driverName}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="brand"
            label="Brand"
            variant="outlined"
            name="brand"
            value={car.brand}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            id="capacity"
            label="Capacity"
            variant="outlined"
            name="capacity"
            type="number"
            value={car.capacity}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={isLoading || !validateForm()} // Disable if loading or form is invalid
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color="secondary"
                variant="outlined"
                fullWidth
                onClick={() => navigate("/cars")} // Cancel and go back to cars list
                disabled={isLoading} // Disable while loading
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Box>
  );
};

export default UpdateCar;
