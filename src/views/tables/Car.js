import React from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import ExTableCar from "../dashboards/dashboard1-components/ExTableCar";
import { useNavigate } from "react-router-dom";

const Car = () => {

  const navigate = useNavigate();


  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h3">Car List</Typography>
            {/* <Button
              variant="outlined"
              color="secondary"
              sx={{ height: "fit-content" }}
              onClick={() => {
                navigate("/add-new-car");
              }}
            >
              Add Car
            </Button> */}

            
          </Box>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTableCar />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Car;
