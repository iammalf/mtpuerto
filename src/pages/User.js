import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SearchIcon from "@mui/icons-material/Search";
import CardMedia from "@mui/material/CardMedia";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ReCAPTCHA from "react-google-recaptcha";
// material
import {
  Alert,
  Card,
  Stack,
  Button,
  Container,
  Typography,
  InputLabel,
  Select,
  Grid,
  MenuItem,
} from "@mui/material";

import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
// mock

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

export default function User() {
  //TODO RESULTADO
  const [show, setShow] = useState(false);
  //TODO BUSQUEDA
  const [valor, setValor] = useState("");
  const [valorName, setValorName] = useState("");
  const [cacas, setCacas] = useState("");
  const [dataSearch, setDataSearch] = useState({});
  console.log(dataSearch);

  const busquedaDoc = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "users"), where("docID", "==", valor));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setDataSearch(doc.data());
    });
  };

  const busquedaLicencia = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "users"), where("nroLicencia", "==", cacas));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setDataSearch(doc.data());
    });
  };

  const busquedaName = async (e) => {
    e.preventDefault();
    const q = query(collection(db, "users"), where("name", "==", valorName));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setDataSearch(doc.data());
    });
  };

  //TODO RADIOS
  const [tipo, setTipo] = useState("documento");
  console.log(tipo);
  const handleChangeRadio = (event) => {
    setTipo(event.target.value);
  };
  //TODO CODIGO SELECT
  const [tipodoc, setTipodoc] = useState("");
  const handleChangeSelect = (event) => {
    setTipodoc(event.target.value);
  };

  // TODO FIRESTORE
  const [name, setName] = useState("");
  const [docid, setDocid] = useState("");
  const [nrolicencia, setNroLicencia] = useState("");
  const [clascat, setClasscat] = useState("");
  const [vigencia, setVigencia] = useState("");
  const [estadovigencia, setEstadovigencia] = useState("");

  // TODO VALIDATION FORM
  const [error, setError] = useState(false);

  //TODO  CODIGO ADD USER
  const handleUser = async (e) => {
    e.preventDefault();
    if (
      name.length === 0 ||
      docid.length === 0 ||
      nrolicencia.length === 0 ||
      clascat.length === 0 ||
      vigencia.length === 0 ||
      estadovigencia.length === 0
    ) {
      setError(true);
    }
    if (name && docid && nrolicencia && clascat && vigencia && estadovigencia) {
      try {
        // TODO REGISTRO DE USUARIO EN LA COLECCION
        await addDoc(collection(db, "users"), {
          name: name,
          docID: docid,
          nroLicencia: nrolicencia,
          classCategory: clascat,
          vigencia: vigencia,
          estadoVigencia: estadovigencia,
          timeStamp: serverTimestamp(),
        });

        setName("");
        setDocid("");
        setNroLicencia("");
        setClasscat("");
        setVigencia("");
        setEstadovigencia("");
        handleClose();
      } catch (error) {
        console.log(error);
      }
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

  function recaptcha() {
    console.log("Captcha value:");
  }

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
            <Button
              variant="contained"
              onClick={handleClickOpen}
              to="#"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Registrar Nuevo
            </Button>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Tipo de Busqueda
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={tipo}
                onChange={handleChangeRadio}
              >
                <FormControlLabel
                  value="documento"
                  control={<Radio />}
                  label="Por Nro. Documento"
                />
                <FormControlLabel
                  value="licencia"
                  control={<Radio />}
                  label="Por Nro. Licencia"
                />
                <FormControlLabel
                  value="nombres"
                  control={<Radio />}
                  label="Por Apellidos y Nombres Completos"
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          {tipo === "documento" && (
            <>
              <form onSubmit={busquedaDoc}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={2} md={2}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel id="demo-simple-select-label">
                        Tipo Documento
                      </InputLabel>
                      <Select
                        value={tipodoc}
                        label="Tipo Documento"
                        onChange={handleChangeSelect}
                      >
                        <MenuItem value={"DNI"}>DNI</MenuItem>
                        <MenuItem value={"CARNET"}>CARNET</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        label="Nro. de Documento"
                        variant="outlined"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <ReCAPTCHA
                        sitekey="6Ld9msYhAAAAANXjXz-4QczpfPTVsafTinNrzPQd"
                        onChange={recaptcha}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => setShow(true)}
                        endIcon={<SearchIcon />}
                        size="large"
                      >
                        Buscar
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </>
          )}

          {tipo === "licencia" && (
            <>
              <form onSubmit={busquedaLicencia}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        label="Nro. Licencia"
                        variant="outlined"
                        value={cacas}
                        onChange={(e) => setCacas(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <ReCAPTCHA
                        sitekey="6Ld9msYhAAAAANXjXz-4QczpfPTVsafTinNrzPQd"
                        onChange={recaptcha}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => setShow(true)}
                        endIcon={<SearchIcon />}
                        size="large"
                      >
                        Buscar
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </>
          )}

          {tipo === "nombres" && (
            <>
              <form onSubmit={busquedaName}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        label="Nombres y Apellidos"
                        variant="outlined"
                        value={valorName}
                        onChange={(e) => setValorName(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <ReCAPTCHA
                        sitekey="6Ld9msYhAAAAANXjXz-4QczpfPTVsafTinNrzPQd"
                        onChange={recaptcha}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => setShow(true)}
                        endIcon={<SearchIcon />}
                        size="large"
                      >
                        Buscar
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </form>
            </>
          )}

          {show && (
            <Stack alignItems="center" mb={5}>
              <Typography variant="subtitle2" gutterBottom>
                Nombres: {dataSearch.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Nro. Documento de Identidad: {dataSearch.docID}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Nro. Licencia: {dataSearch.nroLicencia}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Clase y Categoría: {dataSearch.classCategory}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Vigencia hasta: {dataSearch.vigencia}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Estado de la Licencia: {dataSearch.estadoVigencia}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Faltas
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Muy Grave(s):
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Grave(s):
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Sus puntos firmes Acumulados son:
              </Typography>
            </Stack>
          )}

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

                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        id="outlined-error"
                        label="Nombres"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {error && name.length <= 0 ? (
                        <Stack sx={{ width: "100%" }} spacing={2}>
                          <Alert severity="error">
                            El campo Nombes es requerido
                          </Alert>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        id="outlined-error"
                        label="Documento Identidad"
                        required
                        value={docid}
                        onChange={(e) => setDocid(e.target.value)}
                      />
                      {error && docid.length <= 0 ? (
                        <Stack sx={{ width: "100%" }} spacing={2}>
                          <Alert severity="error">
                            El campo Documento de Identidad es requerido
                          </Alert>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        id="outlined-error"
                        label="Nro. Licencia"
                        required
                        value={nrolicencia}
                        onChange={(e) => setNroLicencia(e.target.value)}
                      />
                      {error && nrolicencia.length <= 0 ? (
                        <Stack sx={{ width: "100%" }} spacing={2}>
                          <Alert severity="error">
                            El campo Nro. de Licencia es requerido
                          </Alert>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        id="outlined-error"
                        label="Clase y Categoría"
                        required
                        value={clascat}
                        onChange={(e) => setClasscat(e.target.value)}
                      />
                      {error && clascat.length <= 0 ? (
                        <Stack sx={{ width: "100%" }} spacing={2}>
                          <Alert severity="error">
                            El campo Clase y Categoría es requerido
                          </Alert>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        id="outlined-error"
                        label="Vigencia Hasta"
                        required
                        value={vigencia}
                        onChange={(e) => setVigencia(e.target.value)}
                      />
                      {error && vigencia.length <= 0 ? (
                        <Stack sx={{ width: "100%" }} spacing={2}>
                          <Alert severity="error">
                            El campo Vigencia es requerido
                          </Alert>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <TextField
                        id="outlined-error"
                        label="Estado de Vigencia"
                        required
                        value={estadovigencia}
                        onChange={(e) => setEstadovigencia(e.target.value)}
                      />
                      {error && estadovigencia.length <= 0 ? (
                        <Stack sx={{ width: "100%" }} spacing={2}>
                          <Alert severity="error">
                            El campo Estado de Vigencia es requerido
                          </Alert>
                        </Stack>
                      ) : (
                        ""
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Container>
      </Page>
    </>
  );
}
