import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import { IconButton } from "@mui/material";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/auth-context";
import ModalDeleteComponent from "./modal-delete";
import ModalFormComponent from "./modal-form";
import ModalComponent from "./modal-image";

const TableComponent = ({ collections, refreshPage }: any) => {
  const { user: currentUser } = useContext(AuthContext);
  const isAdmin = !!currentUser?.isAdmin;

  const [rows, setRows] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [formData, setFormData] = useState<any>();

  const [images, setImages] = useState<any>();

  const columnsAdmin: GridColDef[] = [
    { field: "createdAt", headerName: "Data | Horário", width: 200 },
    { field: "pev", headerName: "PEV", width: 200 },
    { field: "waste", headerName: "Tipos de resíduos", width: 200 },
    {
      field: "weight",
      headerName: "Coleta",
      width: 200,
    },
    {
      field: "fotos",
      headerName: "Registro em fotos",
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

        return (
          <>
            <IconButton onClick={onClick} size="medium">
              <ImageIcon style={{ color: "#9B9794" }} />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Acoes",
      width: 150,
      sortable: false,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => {
        const onClick = (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setOpenModalForm(true);
          setFormData(params.row);
        };
        const onDelete = async (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          setOpenModalDelete(true);
          setFormData(params.row);
        };

        return (
          <>
            <IconButton onClick={onClick} size="medium">
              <EditIcon style={{ color: "#9B9794" }} />
            </IconButton>
            <IconButton onClick={onDelete} size="medium">
              <DeleteIcon style={{ color: "#9B9794" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  const columnsClient: GridColDef[] = [
    { field: "createdAt", headerName: "Data | Horário", width: 250 },
    { field: "pev", headerName: "PEV", width: 200 },
    { field: "waste", headerName: "Tipos de resíduos", width: 250 },
    {
      field: "weight",
      headerName: "Coleta",
      width: 200,
    },
    {
      field: "fotos",
      headerName: "Registro em fotos",
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

        return (
          <>
            <IconButton onClick={onClick} size="medium">
              <ImageIcon style={{ color: "#9B9794" }} />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const formatCollection = (data: any) => {
      const formattedData = data.map((collection: any) => {
        return {
          documentId: collection.documentId,
          id: collection.id,
          pev: collection.pev,
          waste: collection.waste,
          weight: collection.weight,
          createdAt: format(collection.createdAt, "dd/MM/yyyy | HH:mm"),
          imageAvaria: collection.imageAvaria,
          imageColectorUrl: collection.imageColectorUrl,
          wastesIds: collection.wastesIds,
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

      {openModalDelete && (
        <ModalDeleteComponent
          open={openModalDelete}
          handleClose={() => setOpenModalDelete(false)}
          documentId={formData?.documentId}
        />
      )}

      <div style={{ height: 600, width: "100%", marginTop: "32px" }}>
        <DataGrid
          rows={rows}
          columns={isAdmin ? columnsAdmin : columnsClient}
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
