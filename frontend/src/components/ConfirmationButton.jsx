import React, { Fragment } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { rightContents } from "../components/Style";

const ConfirmationDialogBox = ({ onClose, save }) => {
    return (
        <Fragment>
            <Grid container spacing={1} sx={rightContents}>
                <Grid item xs={4} md={9}>
                    <Typography fontWeight={"Bold"}>
                        Do you want to proceed?
                    </Typography>
                </Grid>
                <Grid item xs={4} md={1.5}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={onClose}
                    >
                        No
                    </Button>
                </Grid>
                <Grid item xs={4} md={1.5}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        onClick={save}
                    >
                        Yes
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
};
export default ConfirmationDialogBox;
