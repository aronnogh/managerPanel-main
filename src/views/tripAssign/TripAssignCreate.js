import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TripAssignCreate = () => {
  const [drivers, setDrivers] = useState([]); // Store drivers (but will be auto-filled based on user)
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [tripData, setTripData] = useState({
    driver: '',
    startLocation: '',
    endLocation: '',
    date: '',
    time: '',
    distance: '',
    userName: '', // Selected user name
  });

  const navigate = useNavigate();

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/drivers'); // Endpoint for users
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch locations from backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locationDatas');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  // Fetch driver by selected user name
  useEffect(() => {
    if (tripData.userName) {
      const fetchDriverByUser = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/drivers/username/${tripData.userName}`);
          const data = await response.json();
          if (data) {
            setTripData((prevData) => ({
              ...prevData,
              driver: data.driverName, // Set driver name from fetched data
            }));
          }
        } catch (error) {
          console.error('Error fetching driver by user:', error);
        }
      };
      fetchDriverByUser();
    }
  }, [tripData.userName]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is userName, update accordingly to trigger the driver fetching
    if (name === 'userName') {
      setTripData({
        ...tripData,
        [name]: value,
        driver: '', // Reset driver to prevent showing stale data
      });
    } else {
      setTripData({ ...tripData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty or invalid
    if (
      !tripData.userName ||
      !tripData.driver ||
      !tripData.startLocation ||
      !tripData.endLocation ||
      !tripData.date ||
      !tripData.time ||
      !tripData.distance
    ) {
      alert('All fields are required');
      return; // Stop submission if any field is missing
    }

    // Convert date to ISO string
    const formattedDate = new Date(tripData.date).toISOString();
    const formattedTime = tripData.time;

    // Create the payload with proper values
    const tripToSubmit = {
      driverName: tripData.driver, // Use driver name instead of driver ID
      startLocation: tripData.startLocation,
      endLocation: tripData.endLocation,
      date: formattedDate,
      time: formattedTime,
      distance: tripData.distance,
      userName: tripData.userName, // userName should be the string, not the _id
    };

    try {
      const response = await fetch('http://localhost:5000/api/tripAssign/create-new-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripToSubmit),
      });

      if (response.ok) {
        alert('Trip assigned successfully!');
        navigate('/trips');  // Redirect to the trips listing page after successful creation
      } else {
        const errorData = await response.json();
        alert('Failed to assign trip: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error assigning trip:', error);
      alert('An error occurred while assigning the trip');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Assign Trip to Driver
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* User Name Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>User Name</InputLabel>
                <Select
                  label="User Name"
                  name="userName"
                  value={tripData.userName}
                  onChange={handleChange}
                  required
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user.userName}>  {/* Use userName here */}
                      {user.userName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Driver Name (Auto-set based on selected user) */}
            <Grid item xs={12}>
              <TextField
                label="Driver Name"
                name="driver"
                value={tripData.driver || ''} // Display driver name
                variant="outlined"
                fullWidth
                disabled // Driver field is auto-filled
              />
            </Grid>

            {/* Start Location Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Start Location</InputLabel>
                <Select
                  label="Start Location"
                  name="startLocation"
                  value={tripData.startLocation}
                  onChange={handleChange}
                  required
                >
                  {locations.map((location) => (
                    <MenuItem key={location._id} value={location._id}>
                      {location.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* End Location Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>End Location</InputLabel>
                <Select
                  label="End Location"
                  name="endLocation"
                  value={tripData.endLocation}
                  onChange={handleChange}
                  required
                >
                  {locations.map((location) => (
                    <MenuItem key={location._id} value={location._id}>
                      {location.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Trip Date */}
            <Grid item xs={12}>
              <TextField
                label="Trip Date"
                variant="outlined"
                fullWidth
                name="date"
                type="date"
                value={tripData.date}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Trip Time */}
            <Grid item xs={12}>
              <TextField
                label="Trip Time"
                variant="outlined"
                fullWidth
                name="time"
                type="time"
                value={tripData.time}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Distance */}
            <Grid item xs={12}>
              <TextField
                label="Distance"
                variant="outlined"
                fullWidth
                name="distance"
                type="number"
                value={tripData.distance}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button variant="contained" type="submit" fullWidth>
                Assign Trip
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default TripAssignCreate;
