import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Car from "../views/tables/Car";
import UpdateCar from "../views/car/UpdateCar";
import AddNewCar from "../views/car/AddNewCard";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Login from "../components/Auth/Login";
import Drivers from "../views/drivers/Drivers";
import AddNewDriver from "../views/drivers/AddNewDriver";
import Trips from "../views/tripAssign/Trips";
import TripAssignCreate from "../views/tripAssign/TripAssignCreate";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout"));
/****End Layouts*****/


/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },

      { path: "/login", element: <Login /> },

      // CAR
      {
        path: "/cars",
        element: (
          <ProtectedRoute>
            <Car />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-new-car",
        element: (
          <ProtectedRoute>
            <AddNewCar />
          </ProtectedRoute>
        ),
      },
      {
        path: "car/update/:id",
        element: (
          <ProtectedRoute>
            <UpdateCar />
          </ProtectedRoute>
        ),
      },


      // DRIVER
      {
        path: "/drivers",
        element: (
          <ProtectedRoute>
            <Drivers />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-new-drivers",
        element: (
          <ProtectedRoute>
            <AddNewDriver />
          </ProtectedRoute>
        ),
      },
      // {
      //   path: "drivers/update/:id",
      //   element: (
      //     <ProtectedRoute>
      //       <UpdateDriver />
      //     </ProtectedRoute>
      //   ),
      // },


      // TRIP ASSIGN
      {
        path: "/trips",
        element: (
          <ProtectedRoute>
            <Trips />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-new-trip",
        element: (
          <ProtectedRoute>
            <TripAssignCreate />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default ThemeRoutes;
