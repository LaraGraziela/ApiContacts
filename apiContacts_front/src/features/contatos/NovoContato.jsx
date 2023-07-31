import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const NovoContato = ({ setNovoContato, getContatos, setMostrarTabela }) => {
  const [nomeContato, setNomeContato] = useState("");
  const [idadeContato, setIdadeContato] = useState();

  const criarContato = async () => {
    await fetch("http://localhost:4000/contatos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeContato,
        idade: idadeContato,
      }),
    });

    setNovoContato(false);
  };

  const onSubmit = async () => {
    await criarContato();
    setMostrarTabela(true);
    await getContatos();
  };

  const onClose = () => {
    setNovoContato(false);
    setMostrarTabela(true);
  };

  const handleChangeNomeContato = (e) => {
    setNomeContato(e.target.value);
  };

  const handleChangeIdadeContato = (e) => {
    setIdadeContato(e.target.value);
  };

  return (
    <div style={styles.novoContato}>
      <div style={styles.boxForm}>
        <Typography variant="h4" component="h4" gutterBottom>
          Cadastrar contato
        </Typography>
        <Typography component="h4" gutterBottom>
          Após cadastrar um contato, selecione o botão "Editar" na tabela para
          editar um contato e respectivamente adicionar telefones ao mesmo.
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
            id="contato-nome"
            style={styles.textField}
            label="Nome do contato"
            variant="outlined"
            onChange={handleChangeNomeContato}
            value={nomeContato}
            required
          />
          <TextField
            id="contato-idade"
            style={styles.textField}
            label="Idade"
            type="number"
            variant="outlined"
            onChange={handleChangeIdadeContato}
            value={idadeContato}
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
            onClick={() => onClose()}
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
    alignItems: "center",
    justifyContent: "center",
  },
  boxForm: {
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.10)",
    borderRadius: "10px",
    padding: "50px",
    margin: "50px",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
};
export default NovoContato;
