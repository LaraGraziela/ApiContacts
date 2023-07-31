import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ListaTelefones } from "../telefones/ListaTelefones";
import NovoTelefone from "../telefones/NovoTelefone";

const EditarContato = ({
  setEditarContato,
  getContatos,
  contatoParaEditar,
  setMostrarTabela,
}) => {
  const [nomeContato, setNomeContato] = useState("");
  const [idadeContato, setIdadeContato] = useState("");
  const [novoTelefone, setNovoTelefone] = useState(false);
  const [telefonesContato, setTelefonesContato] = useState([]);

  const contatoId = contatoParaEditar.id;

  const getTelefones = async () => {
    const response = await fetch(
      `http://localhost:4000/telefones/contato/${contatoId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setTelefonesContato(data);
  };

  const editandoContato = async () => {
    await fetch(`http://localhost:4000/contatos/${contatoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeContato ? nomeContato : contatoParaEditar.nome,
        idade: idadeContato ? idadeContato : contatoParaEditar.idade,
      }),
    });

    setEditarContato(false);
  };

  useEffect(() => {
    getTelefones();
  }, []);

  const onSubmit = async () => {
    await editandoContato();
    await getContatos();
    setMostrarTabela(true);
    await getTelefones();
  };

  const onClose = () => {
    setEditarContato(false);
    setMostrarTabela(true);
  };

  const handleChangeNomeContato = (e) => {
    setNomeContato(e.target.value);
    contatoParaEditar.nome = e.target.value;
  };

  const handleChangeIdadeContato = (e) => {
    setIdadeContato(e.target.value);
    contatoParaEditar.idade = e.target.value;
  };

  return (
    <div style={styles.editarContato}>
      <div style={styles.boxForm}>
        <Typography variant="h4" component="h4" gutterBottom>
          Editar contato
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
            value={contatoParaEditar.nome}
            required
            InputLabelProps={{
              shrink: contatoParaEditar.nome !== "",
            }}
          />
          <TextField
            id="contato-idade"
            style={styles.textField}
            label="Idade"
            variant="outlined"
            onChange={handleChangeIdadeContato}
            value={contatoParaEditar.idade}
            required
            InputLabelProps={{
              shrink: contatoParaEditar.idade !== "",
            }}
          />
          <Typography variant="h6" component="h4" gutterBottom>
            Telefones
          </Typography>
          <Button
            variant="contained"
            onClick={() => setNovoTelefone(!novoTelefone)}
          >
            Inserir telefone
          </Button>
          {novoTelefone && (
            <NovoTelefone
              idContato={contatoParaEditar.id}
              setNovoTelefone={setNovoTelefone}
              getTelefones={getTelefones}
            />
          )}
          {telefonesContato && telefonesContato.length > 0 && (
            <ListaTelefones
              idContato={contatoParaEditar.id}
              telefones={telefonesContato}
              getTelefones={getTelefones}
            />
          )}

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
            onClick={() => onClose()}
          >
            Voltar
          </Button>
        </Box>
      </div>
    </div>
  );
};

const styles = {
  editarContato: {
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
export default EditarContato;
