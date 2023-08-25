import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { useState } from "react";
import api from "../api";
import ConfirmationButton from "../components/ConfirmationButton";
import { useEffect } from "react";

const DeleteProduct = ({ selectedProduct, snackBarData, onClose }) => {
  const [productId, setProductId] = useState("");
  const [product_name, setProductName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [date_of_expiry, setDateOfExpiry] = useState("");
  const [available_inventory, setAvailableInventory] = useState("");
  const [image, setImage] = useState("");
  const [confirmationButton, setConfirmationButton] = useState(false);

  useEffect(() => {
    setProductId(selectedProduct.productId);
    setProductName(selectedProduct.product_name);
    setUnit(selectedProduct.unit);
    setPrice(selectedProduct.price);
    setDateOfExpiry(selectedProduct.date_of_expiry);
    setAvailableInventory(selectedProduct.available_inventory);
    setImage(selectedProduct.image);
  }, [
    selectedProduct.productId,
    selectedProduct.product_name,
    selectedProduct.unit,
    selectedProduct.price,
    selectedProduct.date_of_expiry,
    selectedProduct.available_inventory,
    selectedProduct.image,
  ]);

  const handleConfirmation = () => {
    setConfirmationButton(true);
  };

  const handleUpdateProduct = async () => {
    const response = await api.put("/api/update/products", {
      id: productId,
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
        <Typography>A</Typography>
        <DialogActions>
          {confirmationButton ? (
            <ConfirmationButton
              save={handleUpdateProduct}
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
              Delete
            </Button>
          )}
        </DialogActions>
      </DialogContent>
    </Fragment>
  );
};

export default DeleteProduct;
