import { useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
// @mui
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  Alert,
  Link,
  Container,
  Typography,
  Stack,
  CardMedia,
  Button,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Grid,
  Select,
  MenuItem,
  TextField,
  InputLabel,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Page from "../components/Page";
import Logo from "../components/Logo";
//TODO FIREBASE
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
//TODO RECAPCHA
import ReCAPTCHA from "react-google-recaptcha";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 900,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

function Search() {
  //TODO CODIGO CAPTCHA GOOGLE
  const [captchaValido, setCaptchaValido] = useState(null);
  const captcha = useRef(null);

  const recaptcha = () => {
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot.");
      setCaptchaValido(true);
    }
  };

  //TODO BUSQUEDA
  const [valor, setValor] = useState("");
  const [valorName, setValorName] = useState("");
  const [cacas, setCacas] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  console.log(dataSearch);

  const busquedaDoc = async (e) => {
    e.preventDefault();
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot.");
      setCaptchaValido(true);
    } else {
      console.log("Por favor acepta el captcha");
      setCaptchaValido(false);
    }
    const q = query(collection(db, "users"), where("docID", "==", valor));
    const dataCollection = async () => {
      const data = await getDocs(q);
      setDataSearch(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    dataCollection();
  };

  const busquedaLicencia = async (e) => {
    e.preventDefault();
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot.");
      setCaptchaValido(true);
    } else {
      console.log("Por favor acepta el captcha");
      setCaptchaValido(false);
    }
    const q = query(collection(db, "users"), where("nroLicencia", "==", cacas));

    const dataCollection = async () => {
      const data = await getDocs(q);
      setDataSearch(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    dataCollection();
  };

  const busquedaName = async (e) => {
    e.preventDefault();
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot.");
      setCaptchaValido(true);
    } else {
      console.log("Por favor acepta el captcha");
      setCaptchaValido(false);
    }
    const q = query(collection(db, "users"), where("name", "==", valorName));

    const dataCollection = async () => {
      const data = await getDocs(q);
      setDataSearch(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    dataCollection();
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

  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");
  return (
    <Page title="Sistema de Licencia de Motos">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              <Link variant="subtitle2" component={RouterLink} to="/login">
                Iniciar Sessión
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        <Container maxWidth="md">
          <ContentStyle>
            <Stack alignItems="center" mb={5}>
              <Card>
                <CardMedia
                  component="img"
                  height="50"
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
              <Typography variant="h4" gutterBottom>
                Sistema de Licencia de Motos
              </Typography>
              <Card>
                <CardMedia
                  component="img"
                  height="100"
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
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel id="demo-simple-select-label">
                          Tipo Documento
                        </InputLabel>
                        <Select
                          value={tipodoc}
                          required
                          label="Tipo Documento"
                          onChange={handleChangeSelect}
                        >
                          <MenuItem value={"DNI"}>DNI</MenuItem>
                          <MenuItem value={"CARNET"}>
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
                    <Grid item xs={12} sm={5} md={5}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <ReCAPTCHA
                          ref={captcha}
                          sitekey="6Ld9msYhAAAAANXjXz-4QczpfPTVsafTinNrzPQd"
                          onChange={recaptcha}
                        />
                        {captchaValido === false && (
                          <Alert severity="error">
                            Por favor acepta el captcha
                          </Alert>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <Button
                          type="submit"
                          variant="contained"
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
                    <Grid item xs={12} sm={8} md={8}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                          label="Nro. Licencia"
                          variant="outlined"
                          required
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
                    <Grid item xs={12} sm={5} md={5}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <ReCAPTCHA
                          ref={captcha}
                          sitekey="6Ld9msYhAAAAANXjXz-4QczpfPTVsafTinNrzPQd"
                          onChange={recaptcha}
                        />
                        {captchaValido === false && (
                          <Alert severity="error">
                            Por favor acepta el captcha
                          </Alert>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <Button
                          type="submit"
                          variant="contained"
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
                    <Grid item xs={12} sm={8} md={8}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                          label="Nombres y Apellidos"
                          variant="outlined"
                          required
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
                    <Grid item xs={12} sm={5} md={5}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <ReCAPTCHA
                          ref={captcha}
                          sitekey="6Ld9msYhAAAAANXjXz-4QczpfPTVsafTinNrzPQd"
                          onChange={recaptcha}
                        />
                        {captchaValido === false && (
                          <Alert severity="error">
                            Por favor acepta el captcha
                          </Alert>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                      <FormControl fullWidth sx={{ m: 1 }}>
                        <Button
                          type="submit"
                          variant="contained"
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

            {dataSearch.length ? (
              dataSearch.map((data) => {
                return (
                  <Stack alignItems="center" mb={5} key={data.id}>
                    <Typography variant="subtitle2" gutterBottom>
                      Nombres: {data.name}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Nro. Documento de Identidad: {data.docID}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Nro. Licencia: {data.nroLicencia}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Clase y Categoría: {data.classCategory}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Fecha de Expedición:{" "}
                      {moment(
                        new Date(data.fechaEmision.toDate()).toUTCString()
                      ).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Fecha de Revalidación:{" "}
                      {moment(
                        new Date(data.fechaExpedicion.toDate()).toUTCString()
                      ).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Estado de la Licencia: {data.estadoLicencia}
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
                );
              })
            ) : (
              <Stack alignItems="center" mb={5}>
                <Alert severity="error">0 results</Alert>
              </Stack>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}

export default Search;
