import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";
import { useState } from "react";
import api from "../api";
import { useEffect } from "react";

const DeleteConfirmation = ({
  deleteSelectedProduct,
  snackBarData,
  onClose,
}) => {
  const [productId, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [date_of_expiry, setDateOfExpiry] = useState("");
  const [available_inventory, setAvailableInventory] = useState("");

  useEffect(() => {
    setProductId(deleteSelectedProduct.productId);
    setProductName(deleteSelectedProduct.product_name);
    setUnit(deleteSelectedProduct.unit);
    setPrice(deleteSelectedProduct.price);
    setDateOfExpiry(deleteSelectedProduct.date_of_expiry);
    setAvailableInventory(deleteSelectedProduct.available_inventory);
  }, []);

  const handleDeleteProduct = async () => {
    const response = await api.delete("/api/delete/products", {
      id: productId,
    });
    // console.log(productId);
    if (response.ok) {
      snackBarData(true, "success", response.data.message);
      onClose();
    } else {
      snackBarData(true, "error", "Failed to delete product.");
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
              label="Product name"
              variant="outlined"
              size="small"
              fullWidth
              value={product_name}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="unit"
              name="unit"
              label="Unit"
              variant="outlined"
              size="small"
              fullWidth
              value={unit}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              size="small"
              fullWidth
              value={price}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="date_of_expiry"
              name="date_of_expiry"
              label="Date of expiration"
              variant="outlined"
              size="small"
              fullWidth
              value={date_of_expiry}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="available_inventory"
              name="available_inventory"
              label="Available Inventory"
              variant="outlined"
              size="small"
              fullWidth
              value={available_inventory}
              inputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>

        <DialogActions>
          <DialogContentText id="delete" sx={{ mr: "10px", color: "red" }}>
            Are you sure you want to delete the selected product?
          </DialogContentText>
          <Button
            color="error"
            variant="contained"
            sx={{
              mr: 1,
            }}
            onClick={handleDeleteProduct}
          >
            Yes, Delete!
          </Button>
        </DialogActions>
      </DialogContent>
    </Fragment>
  );
};

export default DeleteConfirmation;
