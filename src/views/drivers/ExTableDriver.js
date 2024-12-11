import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPenNib } from "react-icons/fa";

const ExTableDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch("https://backendserver-4urp.onrender.com/api/drivers/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError("Failed to fetch drivers. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://backendserver-4urp.onrender.com/api/drivers/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setDrivers(drivers.filter((driver) => driver._id !== id));
    } catch (error) {
      console.error("Error deleting driver:", error);
      setError("Failed to delete the driver. Please try again later.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/drivers/update/${id}`);
  };

  return (
    <Box>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <Table
        aria-label="Driver table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            {["License", "Driver Name", "Car Name", "Car Number", "Total Trips Today", "Total Trips Overall", "Actions"].map(
              (header) => (
                <TableCell key={header}>
                  <Typography color="textSecondary" variant="h6">
                    {header}
                  </Typography>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver._id}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {driver.license}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {driver.driverName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {driver.carName}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {driver.carNumber}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {driver.totalTripToday}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {driver.totalTripOverAll}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {/* <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mr: 1 }}
                  onClick={() => handleEdit(driver._id)}
                > */}
                  {/* <FaPenNib fontSize="15" />
                </Button> */}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(driver._id)}
                >
                  <MdDelete fontSize="15" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ExTableDriver;
