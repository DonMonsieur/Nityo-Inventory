import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";
import { useState } from "react";
import api from "../api";
import ConfirmationButton from "../components/ConfirmationButton";

const CreateProduct = ({ snackBarData, onClose }) => {
  const [product_name, setProductName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [date_of_expiry, setDateOfExpiry] = useState("");
  const [available_inventory, setAvailableInventory] = useState("");
  const [image, setImage] = useState("");
  const [confirmationButton, setConfirmationButton] = useState(false);

  const handleConfirmation = () => {
    setConfirmationButton(true);
  };

  const handleCreateProduct = async () => {
    const response = await api.post("/api/create/products", {
      product_name: product_name,
      unit: unit,
      price: price,
      date_of_expiry: date_of_expiry,
      available_inventory: available_inventory,
      image: image,
    });

    if (response.ok) {
      snackBarData(true, "success", response.data.message);
      onClose();
    } else {
      // console.log(response.data.error);
      setConfirmationButton(false);
      snackBarData(true, "error", response.data.error);
    }
  };

  return (
    <Fragment>
      <DialogContent>
        <Grid container direction={"column"} spacing={3} mt={"1px"}>
          <Grid item>
            <TextField
              id="product_name"
              name="product_name"
              label="Enter new product name"
              variant="outlined"
              size="small"
              fullWidth
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="unit"
              name="unit"
              label="Enter the unit"
              variant="outlined"
              size="small"
              fullWidth
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="price"
              name="price"
              label="Enter the price"
              variant="outlined"
              size="small"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="date_of_expiry"
              name="date_of_expiry"
              label="Enter the date of expiration"
              variant="outlined"
              size="small"
              fullWidth
              value={date_of_expiry}
              onChange={(e) => setDateOfExpiry(e.target.value)}
              helperText="Format: yyyy-mm-dd"
            />
          </Grid>
          <Grid item>
            <TextField
              id="available_inventory"
              name="available_inventory"
              label="Enter the product quantity"
              variant="outlined"
              size="small"
              fullWidth
              value={available_inventory}
              onChange={(e) => setAvailableInventory(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="image"
              name="image"
              label="Enter the image"
              variant="outlined"
              size="small"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
        <DialogActions>
          {confirmationButton ? (
            <ConfirmationButton
              save={handleCreateProduct}
              onClose={() => setConfirmationButton(false)}
            />
          ) : (
            <Button
              color="success"
              variant="contained"
              sx={{
                mr: 1,
              }}
              onClick={handleConfirmation}
            >
              Create
            </Button>
          )}
        </DialogActions>
      </DialogContent>
    </Fragment>
  );
};

export default CreateProduct;
