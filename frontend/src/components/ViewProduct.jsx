import {
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";

const DeleteConfirmation = ({ viewSelectedProduct }) => {
  const [product_name, setProductName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [date_of_expiry, setDateOfExpiry] = useState("");
  const [available_inventory, setAvailableInventory] = useState("");

  useEffect(() => {
    setProductName(viewSelectedProduct.product_name);
    setUnit(viewSelectedProduct.unit);
    setPrice(viewSelectedProduct.price);
    setDateOfExpiry(viewSelectedProduct.date_of_expiry);
    setAvailableInventory(viewSelectedProduct.available_inventory);
  }, [viewSelectedProduct]);

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
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item></Grid>
        </Grid>
      </DialogContent>
    </Fragment>
  );
};

export default DeleteConfirmation;
