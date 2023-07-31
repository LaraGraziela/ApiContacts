import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const EditarTelefone = ({
  setEditarTelefone,
  getTelefones,
  telefoneParaEditar,
  idContato,
}) => {
  const [numeroTelefone, setNumeroTelefone] = useState("");

  const telefoneId = telefoneParaEditar.id;

  const editandoTelefone = async () => {
    await fetch(`http://localhost:4000/telefones/${telefoneId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idcontato: idContato,
        numero: numeroTelefone ? numeroTelefone : telefoneParaEditar.numero,
      }),
    });

    setEditarTelefone(false);
  };

  useEffect(() => {
    getTelefones();
  }, []);

  const onSubmit = async () => {
    await editandoTelefone();
    await getTelefones();
  };

  const handleChangeNumeroTelefone = (e) => {
    setNumeroTelefone(e.target.value);
    telefoneParaEditar.numero = e.target.value;
  };

  return (
    <div style={styles.editarContato}>
      <div style={styles.boxForm}>
        <Typography variant="h6" component="h4" gutterBottom>
          Editar Telefone
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
            value={telefoneParaEditar.numero}
            required
            InputLabelProps={{
              shrink: telefoneParaEditar.numero !== "",
            }}
          />

          <Button
            variant="contained"
            style={styles.button}
            onClick={() => onSubmit()}
          >
            Salvar
          </Button>
          <Button
            variant="contained"
            style={styles.button}
            onClick={() => setEditarTelefone(false)}
          >
            Cancelar
          </Button>
        </Box>
      </div>
    </div>
  );
};

const styles = {
  editarContato: {
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
export default EditarTelefone;
