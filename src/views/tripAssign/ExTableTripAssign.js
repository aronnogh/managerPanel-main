import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ExTableTripAssign = () => {
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripRes, driverRes, locationRes] = await Promise.all([
          fetch("http://localhost:5000/api/tripAssign/"),
          fetch("http://localhost:5000/api/drivers"),
          fetch("http://localhost:5000/api/locationDatas"),
        ]);

        const [tripData, driverData, locationData] = await Promise.all([
          tripRes.json(),
          driverRes.json(),
          locationRes.json(),
        ]);

        setTrips(tripData);
        setDrivers(driverData);
        setLocations(locationData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getLocationName = useMemo(
    () => (locationId) => {
      const location = locations.find((location) => location._id === locationId);
      return location ? location.locationName : "Unknown Location";
    },
    [locations]
  );

  const handleMarkAsDone = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tripAssign/${id}/done`, {
        method: "PUT",
      });
      if (response.ok) {
        const updatedTrip = await response.json();
        setTrips((prevTrips) =>
          prevTrips.map((trip) => (trip._id === id ? { ...trip, done: true } : trip))
        );
      }
    } catch (error) {
      console.error("Error marking trip as done:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tripAssign/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  // Separate trips into completed and in-progress
  const completedTrips = trips.filter((trip) => trip.done);
  const inProgressTrips = trips.filter((trip) => !trip.done);

  const renderTable = (tripsData, isCompleted) => (
    <Table
      aria-label={isCompleted ? "Completed Trips" : "In-Progress Trips"}
      sx={{ mt: 3, whiteSpace: "nowrap" }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Driver Name
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Start Location
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              End Location
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Date
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Time
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Distance (km)
            </Typography>
          </TableCell>
          {isCompleted || (
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Actions
              </Typography>
            </TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {tripsData.map((trip) => (
          <TableRow key={trip._id}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {trip.driverName || "Unknown Driver"}  {/* Directly use driverName from the trip */}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {getLocationName(trip.startLocation)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {getLocationName(trip.endLocation)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {new Date(trip.date).toLocaleDateString()}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {trip.time}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {trip.distance}
              </Typography>
            </TableCell>
            {!isCompleted && (
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                  onClick={() => handleMarkAsDone(trip._id)}
                >
                  <FaCheck fontSize="15" />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(trip._id)}
                >
                  <MdDelete fontSize="15" />
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        In-Progress Trips
      </Typography>
      {renderTable(inProgressTrips, false)}

      <Typography variant="h4" gutterBottom sx={{ mt: 5 }}>
        Completed Trips
      </Typography>
      {renderTable(completedTrips, true)}
    </div>
  );
};

export default ExTableTripAssign;
