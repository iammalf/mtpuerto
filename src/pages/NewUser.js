import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// material
import { Stack, Button, Container, Typography, Grid } from "@mui/material";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
// components
import Page from "../components/Page";
import Iconify from "../components/Iconify";
// mock
function NewUser() {
  const navigate = useNavigate();
  // TODO FIRESTORE

  const [name, setName] = useState("");
  const [tipoDoc, setTipoDoc] = useState("");
  const handleTipoDocumento = (event) => {
    setTipoDoc(event.target.value);
  };
  const [docid, setDocid] = useState("");
  const [nrolicencia, setNroLicencia] = useState("");
  const [clascat, setClasscat] = useState("");
  const [fechaEmision, setFechaEmision] = useState(new Date());
  const [fechaExpedicion, setFechaExpedicion] = useState(new Date());
  const [estadoLicencia, setEsdadoLicencia] = useState("");
  const handleEstadoVigencia = (event) => {
    setEsdadoLicencia(event.target.value);
  };
  const [faltasMuyGraves, setFaltasMuyGraves] = useState("");
  const [faltasGraves, setFaltasGraves] = useState("");
  const [puntosFirmes, setPuntosFirmes] = useState("");

  //TODO  CODIGO ADD USER
  const handleUser = async (e) => {
    e.preventDefault();

    try {
      // TODO REGISTRO DE USUARIO EN LA COLECCION
      await addDoc(collection(db, "users"), {
        name: name,
        tipoDoc: tipoDoc,
        docID: docid,
        nroLicencia: nrolicencia,
        classCategory: clascat,
        fechaEmision: fechaEmision,
        fechaExpedicion: fechaExpedicion,
        estadoLicencia: estadoLicencia,
        faltasMuyGraves: faltasMuyGraves,
        faltasGraves: faltasGraves,
        puntosFirmes: puntosFirmes,
        timeStamp: serverTimestamp(),
      });
      navigate("/dashboard/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="Registro / Búsqueda">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Registrar Nuevo
          </Typography>
        </Stack>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <form onSubmit={handleUser}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Nombres y Apellidos"
                    variant="outlined"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="tipodoc">Tipo Documento</InputLabel>
                  <Select
                    label="Tipo de Documento"
                    onChange={handleTipoDocumento}
                    value={tipoDoc}
                  >
                    <MenuItem value={"DNI"}>DNI</MenuItem>
                    <MenuItem value={"CARNETESTRANJERIA"}>
                      CARNET DE ESTRANJERÍA
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Nro. de Documento"
                    variant="outlined"
                    required
                    type="text"
                    value={docid}
                    onChange={(e) => setDocid(e.target.value)}
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
                  <TextField
                    label="Nro. de Licencia"
                    variant="outlined"
                    required
                    type="text"
                    value={nrolicencia}
                    onChange={(e) => setNroLicencia(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Clase y Categoría"
                    variant="outlined"
                    required
                    type="text"
                    value={clascat}
                    onChange={(e) => setClasscat(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      openTo="year"
                      views={["year", "month", "day"]}
                      label="Fecha de Emisión"
                      inputFormat="yyyy-MM-dd"
                      value={fechaEmision}
                      onChange={(newValue) => {
                        setFechaEmision(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                  </LocalizationProvider>
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      openTo="year"
                      views={["year", "month", "day"]}
                      label="Fecha de Emisión"
                      inputFormat="yyyy-MM-dd"
                      value={fechaExpedicion}
                      onChange={(newValue) => {
                        setFechaExpedicion(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="tipodoc">Estado de Licencia</InputLabel>
                  <Select
                    label="Estado de Licencia"
                    onChange={handleEstadoVigencia}
                    value={estadoLicencia}
                  >
                    <MenuItem value={"VIGENTE"}>VIGENTE</MenuItem>
                    <MenuItem value={"CADUCADO"}>CADUCADO</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Faltas Muy Graves"
                    variant="outlined"
                    value={faltasMuyGraves}
                    type="text"
                    onChange={(e) => setFaltasMuyGraves(e.target.value)}
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
                  <TextField
                    label="Faltas Graves"
                    variant="outlined"
                    type="text"
                    value={faltasGraves}
                    onChange={(e) => setFaltasGraves(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    label="Puntos Firmes Acumulados"
                    variant="outlined"
                    type="text"
                    value={puntosFirmes}
                    onChange={(e) => setPuntosFirmes(e.target.value)}
                  />
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
                  <Link to="/dashboard/user">
                    <Button variant="contained" color="error">
                      Cancelar
                    </Button>
                  </Link>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    Registrar Nuevo
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </Page>
  );
}

export default NewUser;
