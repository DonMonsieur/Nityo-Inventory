import React, { Fragment, Suspense } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AuthLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Box
        sx={{
          width: {
            xs: "100vw",
            md: "92vw",
          },
          mx: "auto",
          mt: "100px",
          height: "0vh",
        }}
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Fragment>
  );
};

export default AuthLayout;
