import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// TODO MUI COMPONENTS
import {
  Box,
  Card,
  CardMedia,
  Stack,
  Button,
  Container,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
// ----------------------------------------------------------------------

export default function User() {
  // TODO CODIGO OBTENCION DE USUARIOS
  const [users, setUsers] = useState([]);

  // READ USERS FROM FIREBASE
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArr = [];
      querySnapshot.forEach((doc) => {
        usersArr.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersArr);
    });
    return () => unsubscribe();
  }, []);

  //TODO DELETE USER
  const deleteUsers = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  //TODO COLUMNAS DATAGRID
  const columns = [
    {
      field: "name",
      headerName: "Nombres",
      width: 250,
    },
    {
      field: "docID",
      headerName: "Doc. de Indentidad",
      width: 150,
    },
    {
      field: "nroLicencia",
      headerName: "Nro. Licencia",
      width: 150,
    },
    {
      field: "classCategory",
      headerName: "Clase y Categoría",
      width: 150,
    },
    /* {
      field: "fechaEmision",
      headerName: "Fecha de Emisión",
      type: "date",
      width: 350,
      valueFormatter: (params) =>
        moment(params.value.toDate()).format("YYYY-MM-DD"),
    },
    {
      field: "fechaExpedicion",
      headerName: "Fecha de Expedición",
      width: 200,
    }, */
    {
      field: "estadoLicencia",
      headerName: "Estado de Vigencia",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 120,
      getActions: (params) => [
        <Box>
          <Tooltip title="Edit This User">
            <Link to={`/dashboard/edituser/${params.id}`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete this User">
            <IconButton
              color="error"
              onClick={() => {
                deleteUsers(params.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>,
      ],
    },
  ];

  return (
    <>
      <Page title="Registro / Búsqueda">
        <Container>
          <Stack alignItems="center" mb={5}>
            <Card>
              <CardMedia
                component="img"
                height="80"
                image="/static/images/pcm.png"
                alt="green iguana"
              />
            </Card>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h3" gutterBottom>
              Sistema de Licencia de Motos
            </Typography>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image="/static/images/motos1.jpeg"
                alt="green iguana"
              />
            </Card>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image="/static/images/motos2.jpg"
                alt="green iguana"
              />
            </Card>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              Registro / Búsqueda
            </Typography>
            <Link to="/dashboard/newuser">
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Registrar Nuevo
              </Button>
            </Link>
          </Stack>

          <Card>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                components={{ Toolbar: GridToolbar }}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
          </Card>
        </Container>
      </Page>
    </>
  );
}
