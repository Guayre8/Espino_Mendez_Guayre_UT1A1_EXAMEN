import './App.css';
import React, { useState } from 'react';
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
} from '@mui/material';
import './App.css';

function App() {
  const dataInicial = {
    nombre: '',
    apellidos: '',
    edad: '',
    genero: '',
    lenguajeFavorito: '',
    rating: 0,
    accept: false,
  };

  const [data, setData] = useState(dataInicial);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRatingChange = (e, value) => {
    setData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const valid =
      data.nombre.trim() !== '' &&
      data.apellidos.trim() !== '' &&
      data.edad !== '' &&
      data.genero !== '' &&
      data.lenguajeFavorito !== '' &&
      data.accept === true;

    if (!valid) return;

    setOpenDialog(true);
  };

  const handleClear = () => {
    setData(dataInicial);
    setSubmitAttempted(false);
  };

  const handleDialogClose = () => setOpenDialog(false);

  const handleConfirm = () => {
    console.log('Datos del formulario:', data);
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{  p: 3, borderRadius: 2, boxShadow: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Nombre"
              name="nombre"
              value={data.nombre}
              onChange={handleChange}
              required
              fullWidth
              error={submitAttempted && data.nombre.trim() === ''}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Apellidos"
              name="apellidos"
              value={data.apellidos}
              onChange={handleChange}
              required
              fullWidth
              error={submitAttempted && data.apellidos.trim() === ''}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              label="Edad"
              name="edad"
              type="number"
              value={data.edad}
              onChange={handleChange}
              required
              fullWidth
              error={submitAttempted && data.edad === ''}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              required
              error={submitAttempted && data.genero === ''}
              fullWidth
            >
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                name="genero"
                value={data.genero}
                onChange={handleChange}
              >
                <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                <FormControlLabel value="otro" control={<Radio />} label="Otro" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl
              required
              fullWidth
              error={submitAttempted && data.lenguajeFavorito === ''}
            >
              <InputLabel id="select-label">
                Lenguaje de programación favorito
              </InputLabel>
              <Select
                labelId="select-label"
                name="lenguajeFavorito"
                value={data.lenguajeFavorito}
                label="Lenguaje de programación favorito"
                onChange={handleChange}
              >
                <MenuItem value="JavaScript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
                <MenuItem value="PHP">PHP</MenuItem>
                <MenuItem value="Java">Java</MenuItem>
                <MenuItem value="C++">C++</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2}} />
          </Grid>

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

          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              flexWrap: 'wrap',
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!data.accept}
              sx={{ px: 5 }}
            >
              ENVIAR
            </Button>
            <Button
              variant="outlined"
              color="warning"
              type="button"
              onClick={handleClear}
              sx={{ px: 5 }}
            >
              LIMPIAR
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas enviar el siguiente formulario?
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Nombre:</strong> {data.nombre} {data.apellidos}
            </Typography>
            <Typography variant="body2">
              <strong>Edad:</strong> {data.edad}
            </Typography>
            <Typography variant="body2">
              <strong>Género:</strong> {data.genero}
            </Typography>
            <Typography variant="body2">
              <strong>Lenguaje:</strong> {data.lenguajeFavorito}
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

export default App;
