import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CardMedia, IconButton, Paper, Tooltip } from "@mui/material";
import { useState } from "react";
import DialogBox from "./DialogBox";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import api from "../api";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SnackBar from "./Snackbar";
import { format } from "date-fns";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmation from "./DeleteConfirmation";
import ViewImage from "./ViewImage";
import ViewProduct from './ViewProduct'
import VisibilityIcon from '@mui/icons-material/Visibility';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [dialogType, setDialogType] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [deleteSelectedRow, setDeleteSelectedRow] = useState();
  const [viewSelectedRow, setViewSelectedRow] = useState();
  const [selectedImage, setSelectedImage] = useState("");

  const fetchProducts = async () => {
    const response = await api.get("/api/products");

    if (response.ok) {
      setProducts(response.data.products);
      console.log(response.data.products);
    } else {
      console.error("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [snackBarInitialValue, setSnackBarInitialValue] = useState({
    openSnackbar: false,
    snackbarSeverity: "success",
    snackbarMessage: "",
  });

  const handleSnackbar = (open, severity, message) => {
    setSnackBarInitialValue((prevValue) => ({
      ...prevValue,
      openSnackbar: open,
      snackbarSeverity: severity,
      snackbarMessage: message,
    }));

    setTimeout(() => {
      setSnackBarInitialValue((prevValue) => ({
        ...prevValue,
        openSnackbar: false,
      }));
    }, 3000);
  };

  const handleCreateProduct = (type) => {
    setOpenDialogBox(true);
    setDialogType(type);
  };

  const handleClose = () => {
    setOpenDialogBox(false);
    fetchProducts();
  };

  const formattedAmount = (price) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(price);
  };

  const handleUpdateProduct = (rowData, type) => {
    const updateProduct = [];
    // console.log(rowData.row);
    const productId = rowData.row.id;
    updateProduct.productId = productId;

    const product_name = rowData.row.product_name;
    updateProduct.product_name = product_name;

    const unit = rowData.row.unit;
    updateProduct.unit = unit;

    const price = rowData.row.price;
    updateProduct.price = price;

    const date_of_expiry = rowData.row.date_of_expiry;
    updateProduct.date_of_expiry = date_of_expiry;

    const available_inventory = rowData.row.available_inventory;
    updateProduct.available_inventory = available_inventory;

    const image = rowData.row.image;
    updateProduct.image = image;

    setSelectedRow(updateProduct);
    setOpenDialogBox(true);
    setDialogType(type);
  };

  const handleDeleteProduct = (rowData, type) => {
    const deleteProducts = [];
    const productId = rowData.row.id;
    deleteProducts.productId = productId;

    const product_name = rowData.row.product_name;
    deleteProducts.product_name = product_name;

    const unit = rowData.row.unit;
    deleteProducts.unit = unit;

    const price = rowData.row.price;
    deleteProducts.price = price;

    const date_of_expiry = rowData.row.date_of_expiry;
    deleteProducts.date_of_expiry = date_of_expiry;

    const available_inventory = rowData.row.available_inventory;
    deleteProducts.available_inventory = available_inventory;

    const image = rowData.row.image;
    deleteProducts.image = image;

    setDeleteSelectedRow(deleteProducts);
    setOpenDialogBox(true);
    setDialogType(type);
  };

  const handleViewProduct = (rowData, type) => {
    const viewProducts = [];
    const productId = rowData.row.id;
    viewProducts.productId = productId;

    const product_name = rowData.row.product_name;
    viewProducts.product_name = product_name;

    const unit = rowData.row.unit;
    viewProducts.unit = unit;

    const price = rowData.row.price;
    viewProducts.price = price;

    const date_of_expiry = rowData.row.date_of_expiry;
    viewProducts.date_of_expiry = date_of_expiry;

    const available_inventory = rowData.row.available_inventory;
    viewProducts.available_inventory = available_inventory;

    const image = rowData.row.image;
    viewProducts.image = image;

    setViewSelectedRow(viewProducts);
    setOpenDialogBox(true);
    setDialogType(type);
  };

  const handleImageClick = (imageUrl, type) => {
    setSelectedImage(imageUrl);
    setOpenDialogBox(true);
    setDialogType(type);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      headerClassName: "headercolor",
      renderCell: (cellValues) => {
        // CELL RENDERER FOR IMAGE
        return (
          <CardMedia
            component="img"
            src={cellValues.row.image}
            onClick={() => handleImageClick(cellValues.row.image, "View Image")}
            sx={{
              height: 50,
              width: 50,
              borderRadius: "20px",
              border: "1px solid white",
            }}
          />
        );
      },
      align: "center",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "product_name",
      headerName: "Product Name",
      align: "left",
      flex: 1,
      headerAlign: "left",
    },
    {
      field: "unit",
      headerName: "Unit",
      align: "left",
      flex: 1,
      headerAlign: "left",
    },
    {
      field: "price",
      headerName: "Price",
      align: "right",
      flex: 1,
      headerAlign: "right",
      renderCell: (params) => (
        <Fragment>{formattedAmount(params.value)}</Fragment>
      ),
    },
    {
      field: "date_of_expiry",
      headerName: "Expiration Date",
      align: "right",
      flex: 1,
      headerAlign: "right",
      valueFormatter: (params) => {
        const formattedDate = format(new Date(params.value), "MMMM dd, yyyy");
        return formattedDate;
      },
    },
    {
      field: "available_inventory",
      headerName: "Available Inventory",
      align: "right",
      flex: 1,
      headerAlign: "right",
    },
    {
      field: "available_inventory_cost",
      headerName: "Available Inventory Cost",
      align: "right",
      flex: 1,
      headerAlign: "right",
      valueGetter: (params) => {
        // console.log(params.row);
        const availableInventory = params.row.available_inventory;
        const price = params.row.price;
        if (availableInventory !== null && price !== null) {
          const cost = availableInventory * price;
          return formattedAmount(cost);
        }
        return null;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Box sx={{ margin: "auto" }}>
            <Tooltip title="View Product">
              <IconButton
                color="info"
                onClick={(e) => handleViewProduct(cellValues, "View Products")}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Update Product">
              <IconButton
                color="info"
                onClick={(e) =>
                  handleUpdateProduct(cellValues, "Update Products")
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Product">
              <IconButton
                color="error"
                onClick={(e) =>
                  handleDeleteProduct(cellValues, "Delete Products")
                }
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Button
        color="info"
        variant="contained"
        onClick={() => handleCreateProduct("Add Product")}
        sx={{ mb: "5px" }}
      >
        Add product
      </Button>
      <Paper elevation={5}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          sx={{ height: "500px" }}
        />
      </Paper>

      {/* DIALOG BOX */}
      <DialogBox
        open={openDialogBox}
        maxWidth="md"
        onClose={handleClose}
        title={dialogType}
      >
        {dialogType === "Add Product" ? (
          <CreateProduct snackBarData={handleSnackbar} onClose={handleClose} />
        ) : dialogType === "Update Products" ? (
          <UpdateProduct
            selectedProduct={selectedRow}
            snackBarData={handleSnackbar}
            onClose={handleClose}
          />
        ) : dialogType === "View Image" ? (
          <ViewImage onClose={handleClose} source={selectedImage} />
        ) : dialogType === "View Products" ? (
          <ViewProduct onClose={handleClose} viewSelectedProduct={viewSelectedRow} />
        ) : (
          <DeleteConfirmation
            deleteSelectedProduct={deleteSelectedRow}
            snackBarData={handleSnackbar}
            onClose={handleClose}
          />
        )}
      </DialogBox>

      {/* SNACKBAR */}
      <SnackBar
        open={snackBarInitialValue.openSnackbar}
        severity={snackBarInitialValue.snackbarSeverity}
        message={snackBarInitialValue.snackbarMessage}
      />
    </Box>
  );
};
export default Product;
