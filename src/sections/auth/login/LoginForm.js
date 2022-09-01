import * as Yup from "yup";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/Iconify";
import { FormProvider, RHFCheckbox } from "../../../components/hook-form";
import { Alert } from "@mui/material";

//TODO FIRESEBAS
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  //TODO LOGIN

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/dashboard/user", { replace: true });
        // ...
      })
      .catch((error) => {
        setError(true);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "",
    password: "",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleLogin}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {error && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            Email o Password incoreccto. Intente Nuevamente!
          </Alert>
        </Stack>
      )}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Recordarme" />
        <Link variant="subtitle2" underline="hover">
          Olvidó su Contraseña?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Iniciar Sessión
      </LoadingButton>
    </FormProvider>
  );
}
