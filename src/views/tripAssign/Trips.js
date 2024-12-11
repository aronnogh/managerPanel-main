import React from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import ExTableTripAssign from "./ExTableTripAssign";
import { useNavigate } from "react-router-dom";

const Trips = () => {

  const navigate = useNavigate();


  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h3">Trips List</Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ height: "fit-content" }}
              onClick={() => {
                navigate("/add-new-trip");
              }}
            >
              Create New Trip
            </Button>

            
          </Box>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTableTripAssign />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Trips;
