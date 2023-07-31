import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography } from "@mui/material";
import NovoContato from "./NovoContato";
import EditarContato from "./EditarContato";

const cabecalhoContatos = [
  {
    label: "Nome",
  },
  {
    label: "Idade",
  },
  {
    label: "Telefones",
  },
  {
    label: "Ações",
  },
];

const ContatosDashboard = () => {
  const [nomeBusca, setNomeBusca] = useState("");

  const [novoContato, setNovoContato] = useState(false);
  const [editarContato, setEditarContato] = useState(false);
  const [contatoParaEditar, setContatoParaEditar] = useState({});
  const [contatos, setContatos] = useState([]);
  const [mostrarTabela, setMostrarTabela] = useState(true);

  const getContatos = async () => {
    const response = await fetch(
      `http://localhost:4000/contatos?nome=${nomeBusca}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    setContatos(data);
  };

  const editandoContato = async (contato) => {
    setEditarContato(true);
    setContatoParaEditar(contato);
    setMostrarTabela(false);
  };

  const cadastrarContato = () => {
    setNovoContato(!novoContato);
    setMostrarTabela(false);
  };

  const deletarContato = async (id) => {
    await fetch(`http://localhost:4000/contatos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleDeletar = async (id) => {
    await deletarContato(id);
    await getContatos();
  };

  const handleGetContatos = (nome) => {
    setNomeBusca(nome);
  };

  useEffect(() => {
    getContatos();
  }, []);

  return (
    <div className={"contatos-dashboard"}>
      {novoContato && (
        <NovoContato
          setNovoContato={setNovoContato}
          getContatos={getContatos}
          setMostrarTabela={setMostrarTabela}
        />
      )}
      {editarContato && (
        <EditarContato
          setEditarContato={setEditarContato}
          contatoParaEditar={contatoParaEditar}
          getContatos={getContatos}
          setMostrarTabela={setMostrarTabela}
        />
      )}
      {mostrarTabela && (
        <div style={styles.contatosBox}>
          <Typography variant="h4" component="h4" gutterBottom>
            Contatos
          </Typography>
          <div style={styles.bar}>
            <Button
              variant="contained"
              style={{ marginBottom: "30px" }}
              onClick={() => cadastrarContato()}
            >
              Cadastrar contato
            </Button>
            <div>
              <TextField
                id="outlined-basic"
                style={{ width: "300px", marginBottom: "20px" }}
                label="Buscar contato por nome"
                onChange={(e) => handleGetContatos(e.target.value)}
                value={nomeBusca}
                variant="outlined"
              />
              <Button
                variant="contained"
                style={{ marginLeft: "30px", height: "55px" }}
                onClick={() => getContatos()}
              >
                Buscar
              </Button>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {cabecalhoContatos.map((cell) => (
                    <TableCell key={cell.label}>{cell.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {contatos.map((contato, index) => (
                  <TableRow key={index}>
                    <TableCell>{contato.nome}</TableCell>
                    <TableCell
                      style={{ wordWrap: "break-word", maxWidth: "500px" }}
                    >
                      {contato.idade}
                    </TableCell>
                    <TableCell>
                      {contato.Telefones && contato.Telefones.length > 0
                        ? contato.Telefones.map(
                            (telefone) => telefone.numero
                          ).join(", ")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => editandoContato(contato)}
                      >
                        Editar
                      </Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        variant="contained"
                        onClick={() => handleDeletar(contato.id)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

const styles = {
  contatosBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "50px",
  },
  bar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
};
export default ContatosDashboard;
