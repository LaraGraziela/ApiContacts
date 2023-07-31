import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const NovoTelefone = ({ idContato, setNovoTelefone, getTelefones }) => {
  const [numeroTelefone, setNumeroTelefone] = useState("");

  const criarTelefone = async () => {
    await fetch("http://localhost:4000/telefones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idcontato: idContato,
        numero: numeroTelefone,
      }),
    });

    setNovoTelefone(false);
  };

  const onSubmit = async () => {
    await criarTelefone();
    await getTelefones();
  };

  const handleChangeNumeroTelefone = (e) => {
    setNumeroTelefone(e.target.value);
  };

  return (
    <div style={styles.novoContato}>
      <div style={styles.boxForm}>
        <Typography variant="h6" component="h4" gutterBottom>
          Cadastrar telefone
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="telefone-numero"
            style={styles.textField}
            label="Número"
            variant="outlined"
            onChange={handleChangeNumeroTelefone}
            value={numeroTelefone}
            required
          />

          <Button
            variant="contained"
            style={styles.button}
            onClick={() => onSubmit()}
          >
            Cadastrar
          </Button>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => setNovoTelefone(false)}
          >
            Cancelar
          </Button>
        </Box>
      </div>
    </div>
  );
};

const styles = {
  novoContato: {
    display: "flex",
    width: "100%",
  },
  boxForm: {
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.10)",
    borderRadius: "10px",
    padding: "50px",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
};
export default NovoTelefone;
