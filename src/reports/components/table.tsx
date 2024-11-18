import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Snackbar,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import ModalFormComponent from "./modal-form";
import ModalComponent from "./modal-image";

const TableComponent = ({ collections }: any) => {
  //   console.log("collections", collections);

  const [rows, setRows] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [formData, setFormData] = useState<any>();

  const [images, setImages] = useState<any>();

  const columns: GridColDef[] = [
    { field: "createdAt", headerName: "Data | Horario", width: 200 },
    { field: "pev", headerName: "PEV", width: 200 },
    { field: "waste", headerName: "Tipos de residuoes", width: 200 },
    {
      field: "weight",
      headerName: "Coleta",
      width: 200,
    },
    {
      field: "fotos",
      headerName: "Registro em fotos",
      //   description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        const onClick = (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setOpen(true);
          setImages({
            imageColector: params.row.imageColectorUrl,
            imageAvaria: params.row.imageAvaria,
          });
        };

        return <Button onClick={onClick}>Click</Button>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => {
        const onClick = (e: { stopPropagation: () => void }) => {
          e.stopPropagation(); // don't select this row after clicking
          setOpenModalForm(true);
          setFormData(params.row);
        };

        return (
          <>
            <Button onClick={onClick}>Click</Button>
          </>
        );
      },
    },
  ];

  //   const rows = [
  //     {
  //       id: 1,
  //       createdAt: "2023-01-01",
  //       pev: "PEV 4",
  //       waste: "Vidro",
  //       weight: "Coleta",
  //     },
  //     {
  //       id: 2,

  //       createdAt: "2023-01-01",
  //       pev: "PEV 4",
  //       waste: "Vidro",
  //       weight: "Coleta",
  //     },
  //     {
  //       id: 3,
  //       createdAt: "2023-01-01",
  //       pev: "PEV 4",
  //       waste: "Vidro",
  //       weight: "Coleta",
  //     },
  //     {
  //       id: 4,
  //       createdAt: "2023-01-01",
  //       pev: "PEV 4",
  //       waste: "Vidro",
  //       weight: "Coleta",
  //     },
  //   ];

  useEffect(() => {
    const formatCollection = (data: any) => {
      const formattedData = data.map((collection: any) => {
        return {
          documentId: collection.documentId,
          id: collection.id,
          pev: collection.pev,
          waste: collection.waste,
          weight: collection.weight,
          createdAt: collection.createdAt,
          imageAvaria: collection.imageAvaria,
          imageColectorUrl: collection.imageColectorUrl,
        };
      });

      return formattedData;
    };

    const formattedCollections = formatCollection(collections);
    setRows(formattedCollections);
  }, [collections]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        {/* <GridToolbarColumnsButton /> */}
        {/* <GridToolbarFilterButton /> */}
        {/* <GridToolbarDensitySelector /> */}
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  if (rows.length === 0) {
    return <></>;
  }

  return (
    <>
      {open && (
        <ModalComponent
          open={open}
          handleClose={() => setOpen(false)}
          images={images}
        />
      )}

      {openModalForm && (
        <ModalFormComponent
          open={openModalForm}
          handleClose={() => setOpenModalForm(false)}
          data={formData}
        />
      )}

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            ".MuiDataGrid-toolbarContainer": {
              backgroundColor: "#F9F5ED",
              justifyContent: "end",
              paddingRight: "40px",
            },
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },

            ".MuiDataGrid-container--top [role=row]": {
              background: "#F9F5ED",
            },

            ".MuiDataGrid-columnHeaders": {
              fontWeight: 400,
              fontSize: "14px",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },
            ".MuiDataGrid-iconButtonContainer": {
              marginLeft: "50px !important",
            },
            ".MuiDataGrid-footerContainer": {
              display: "none",
            },
          }}
          loading={false}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </div>
    </>
  );
};

export default TableComponent;
