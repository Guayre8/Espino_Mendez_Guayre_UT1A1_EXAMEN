import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
  Rating,
  Divider,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

export function Prueba() {
  const initialData = {
    name: "",
    surname: "",
    age: "",
    gender: "",
    favoriteLanguage: "",
    rating: 0,
    accept: false,
  };

  const [data, setData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRatingChange = (e, value) => {
    setData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const valid =
      data.name.trim() !== "" &&
      data.surname.trim() !== "" &&
      data.age !== "" &&
      data.gender !== "" &&
      data.favoriteLanguage !== "" &&
      data.accept === true;

    if (!valid) return;

    setOpenDialog(true);
  };

  const handleClear = () => {
    setData(initialData);
    setSubmitAttempted(false);
  };

  const handleDialogClose = () => setOpenDialog(false);
  const handleConfirm = () => {
    console.log("Datos del formulario:", data);
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Encuesta - Formulario
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* --- Primera fila: Nombre, Apellidos, Edad --- */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nombre"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              fullWidth
              error={submitAttempted && data.name.trim() === ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Apellidos"
              name="surname"
              value={data.surname}
              onChange={handleChange}
              required
              fullWidth
              error={submitAttempted && data.surname.trim() === ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Edad"
              name="age"
              type="number"
              value={data.age}
              onChange={handleChange}
              required
              fullWidth
              error={submitAttempted && data.age === ""}
            />
          </Grid>

          {/* --- Segunda fila: Género y Lenguaje favorito --- */}
          <Grid item xs={12} sm={6}>
            <FormControl
              required
              error={submitAttempted && data.gender === ""}
              fullWidth
            >
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={data.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="femenino"
                  control={<Radio />}
                  label="Femenino"
                />
                <FormControlLabel
                  value="masculino"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel value="otro" control={<Radio />} label="Otro" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              required
              error={submitAttempted && data.favoriteLanguage === ""}
            >
              <InputLabel id="select-label">
                Lenguaje de programación favorito
              </InputLabel>
              <Select
                labelId="select-label"
                name="favoriteLanguage"
                value={data.favoriteLanguage}
                label="Lenguaje de programación favorito"
                onChange={handleChange}
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
                <MenuItem value="csharp">C#</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* --- Rating + Checkbox --- */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography>Puntúa esta encuesta:</Typography>
              <Rating
                name="rating"
                value={data.rating}
                onChange={handleRatingChange}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.accept}
                    onChange={handleChange}
                    name="accept"
                  />
                }
                label="He leído los términos y condiciones"
              />
            </FormGroup>
          </Grid>

          {/* --- Divider --- */}
          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* --- Botones --- */}
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!data.accept}
              sx={{ px: 4 }}
            >
              ENVIAR
            </Button>
            <Button
              variant="outlined"
              color="warning"
              type="button"
              onClick={handleClear}
              sx={{ px: 4 }}
            >
              LIMPIAR
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* --- Diálogo Modal --- */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmar envío</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas enviar tus respuestas? Los datos se mostrarán en consola.
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Nombre:</strong> {data.name} {data.surname}
            </Typography>
            <Typography variant="body2">
              <strong>Edad:</strong> {data.age}
            </Typography>
            <Typography variant="body2">
              <strong>Género:</strong> {data.gender}
            </Typography>
            <Typography variant="body2">
              <strong>Lenguaje:</strong> {data.favoriteLanguage}
            </Typography>
            <Typography variant="body2">
              <strong>Valoración:</strong> {data.rating} estrellas
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>NO</Button>
          <Button onClick={handleConfirm} autoFocus>
            SÍ
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

