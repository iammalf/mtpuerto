import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
// mock
import USERLIST from "../_mock/user";

//CODIGO DATAGRID
const columns = [
  {
    field: "name",
    headerName: "Nombres",
    width: 250,
  },
  {
    field: "docID",
    headerName: "Doc. de Indentidad",
    width: 100,
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
  {
    field: "vigencia",
    headerName: "Vigencia",
    width: 200,
  },
  {
    field: "estadoVigencia",
    headerName: "Estado de Vigencia",
    width: 200,
  },
];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  // TODO FIRESTORE
  const [name, setName] = useState("");
  const [docid, setDocid] = useState("");
  const [nrolicencia, setNroLicencia] = useState("");
  const [clascat, setClasscat] = useState("");
  const [vigencia, setVigencia] = useState("");
  const [estadovigencia, setEstadovigencia] = useState("");

  // CODIGO ADD USER
  const handleUser = async (e) => {
    e.preventDefault();
    try {
      // REGISTRO DE USUARIO EN LA COLECCION
      await addDoc(collection(db, "users"), {
        name: name,
        docID: docid,
        nroLicencia: nrolicencia,
        classCategory: clascat,
        vigencia: vigencia,
        estadoVigencia: estadovigencia,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
  };
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

  // TODO CODIGO DE MODAL
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  // TODO CODIGO DE PLANTILLA

  return (
    <Page title="User">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
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

        {/* //TODO MODAL ADD */}
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <form onSubmit={handleUser}>
            <DialogTitle>Registro de Usuarios</DialogTitle>
            <DialogContent>
              <DialogContentText>Complete todos los Datos</DialogContentText>

              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    id="outlined-error"
                    label="Nombres"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="outlined-error"
                    label="Documento Identidad"
                    value={docid}
                    onChange={(e) => setDocid(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-error"
                    label="Nro. Licencia"
                    value={nrolicencia}
                    onChange={(e) => setNroLicencia(e.target.value)}
                  />
                  <TextField
                    id="outlined-error"
                    label="Clase y Categoría"
                    value={clascat}
                    onChange={(e) => setClasscat(e.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-error"
                    label="Vigencia Hasta"
                    value={vigencia}
                    onChange={(e) => setVigencia(e.target.value)}
                  />
                  <TextField
                    id="outlined-error"
                    label="Estado de Vigencia"
                    value={estadovigencia}
                    onChange={(e) => setEstadovigencia(e.target.value)}
                  />
                </div>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                onClick={handleClose}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Page>
  );
}
