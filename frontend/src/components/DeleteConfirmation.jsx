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

const DeleteConfirmation = ({deleteSelectedProduct, snackBarData, onClose}) => {
  const [productId, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [date_of_expiry, setDateOfExpiry] = useState("");
  const [available_inventory, setAvailableInventory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setProductId(deleteSelectedProduct.productId);
    setProductName(deleteSelectedProduct.product_name);
    setUnit(deleteSelectedProduct.unit);
    setPrice(deleteSelectedProduct.price);
    setDateOfExpiry(deleteSelectedProduct.date_of_expiry);
    setAvailableInventory(deleteSelectedProduct.available_inventory);
    setImage(deleteSelectedProduct.image);
  }, [
    deleteSelectedProduct.productId,
    deleteSelectedProduct.product_name,
    deleteSelectedProduct.unit,
    deleteSelectedProduct.price,
    deleteSelectedProduct.date_of_expiry,
    deleteSelectedProduct.available_inventory,
    deleteSelectedProduct.image,
  ]);

  const handleDeleteProduct = async () => {
    const response = await api.delete("/api/delete/products", {
      id: productId , 
      product_name: product_name,
      unit: unit,
      price: price,
      date_of_expiry: date_of_expiry,
      available_inventory: available_inventory,
      image: image,
    });
    console.log(product_name);
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
              label="Edit product name"
              variant="outlined"
              size="small"
              fullWidth
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item>
            <TextField
              id="unit"
              name="unit"
              label="Edit the unit"
              variant="outlined"
              size="small"
              fullWidth
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item>
            <TextField
              id="price"
              name="price"
              label="Edit the price"
              variant="outlined"
              size="small"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item>
            <TextField
              id="date_of_expiry"
              name="date_of_expiry"
              label="Edit the date of expiration"
              variant="outlined"
              size="small"
              fullWidth
              value={date_of_expiry}
              onChange={(e) => setDateOfExpiry(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item>
            <TextField
              id="available_inventory"
              name="available_inventory"
              label="Edit the product quantity"
              variant="outlined"
              size="small"
              fullWidth
              value={available_inventory}
              onChange={(e) => setAvailableInventory(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item>
            <TextField
              id="image"
              name="image"
              label="Edit the image"
              variant="outlined"
              size="small"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete the selected product?
        </DialogContentText>
      
      <DialogActions>
        <Button
          color="success"
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
