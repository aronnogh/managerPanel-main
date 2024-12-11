import React from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import ExTableDriver from "./ExTableDriver";
import { useNavigate } from "react-router-dom";

const Drivers = () => {

  const navigate = useNavigate();


  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h3">Drivers</Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ height: "fit-content" }}
              onClick={() => {
                navigate("/add-new-drivers");
              }}
            >
              Add Driver
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
            <ExTableDriver />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Drivers;
