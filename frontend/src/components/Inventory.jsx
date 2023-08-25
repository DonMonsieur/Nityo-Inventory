import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CardMedia, IconButton, Paper, Tooltip } from "@mui/material";
import { useState } from "react";
import DialogBox from "./DialogBox";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";
import EditIcon from "@mui/icons-material/Edit";

const DataGridDemo = () => {
  const [addProduct, setAddProduct] = useState([]);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [dialogType, setDialogType] = useState();
  const [selectedRow, setSelectedRow] = useState();

  const handleCreateProduct = (type) => {
    setOpenDialogBox(true);
    setDialogType(type);
  };

  const handleClose = () => {
    setOpenDialogBox(false);
    // fetchUnitData();
  };

  const handleUpdateProduct = (rowData, type) => {
    const updateProduct = [];

    const measurementId = rowData.row.id;
    editMeasure.measurementId = measurementId;

    const editMeasurement = rowData.row.name;
    editMeasure.editMeasurement = editMeasurement;

    const editUnit_abbreviation = rowData.row.unit_abbreviation;
    editMeasure.editUnit_abbreviation = editUnit_abbreviation;

    setSelectedRow(editMeasure);
    setOpenDialogBox(true);
    setDialogType(type);
  };

  const rows = [];

  const columns = [
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
    },
    {
      field: "date_of_expiry",
      headerName: "Expiration Date",
      align: "right",
      flex: 1,
      headerAlign: "right",
    },
    {
      field: "available_inventory",
      headerName: "Available Inventory",
      align: "right",
      flex: 1,
      headerAlign: "right",
    },
    {
      field: "image",
      headerName: "Image",
      headerClassName: "headercolor",
      renderCell: (cellValues) => {
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
      field: "action",
      headerName: "Action",
      sortable: false,
      headerAlign: "center",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <Box sx={{ margin: "auto" }}>
            <Tooltip title="Update Product">
              <IconButton
                color="info"
                onClick={(e) => handleUpdateProduct(cellValues, "Update Units")}
              >
                <EditIcon />
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
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* DIALOG BOX */}
      <DialogBox
        open={openDialogBox}
        maxWidth="md"
        onClose={handleClose}
        title={dialogType}
      >
        {dialogType == "Add Product" ? (
          <CreateProduct
            // snackBarData={handleSnackbar}
            onClose={handleClose}
          />
        ) : (
          <UpdateProduct
            selectedMeasurement={selectedRow}
            // snackBarData={handleSnackbar}
            onClose={handleClose}
          />
        )}
      </DialogBox>
    </Box>
  );
};
export default DataGridDemo;
