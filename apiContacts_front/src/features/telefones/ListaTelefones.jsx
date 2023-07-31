import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import EditarTelefone from "./EditarTelefone";

const cabecalhoTelefones = [
  {
    label: "Número",
  },
  {
    label: "Ações",
  },
];

export const ListaTelefones = ({ idContato, telefones, getTelefones }) => {
  const [editarTelefone, setEditarTelefone] = useState(false);
  const [telefoneParaEditar, setTelefoneParaEditar] = useState({});

  const deletarTelefone = async (id) => {
    await fetch(`http://localhost:4000/telefones/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const editandoTelefone = async (telefone) => {
    setEditarTelefone(true);
    setTelefoneParaEditar(telefone);
  };

  const handleDeletar = async (id) => {
    await deletarTelefone(id);
    await getTelefones();
  };

  return (
    <>
      {editarTelefone && (
        <EditarTelefone
          telefoneParaEditar={telefoneParaEditar}
          setEditarTelefone={setEditarTelefone}
          idContato={idContato}
          getTelefones={getTelefones}
        />
      )}
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              {cabecalhoTelefones.map((cell) => (
                <TableCell key={cell.label}>{cell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {telefones &&
              telefones.map((telefone, index) => (
                <TableRow key={index}>
                  <TableCell>{telefone.numero}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => editandoTelefone(telefone)}
                    >
                      Editar
                    </Button>
                    <Button
                      style={{ marginLeft: "10px" }}
                      variant="contained"
                      onClick={() => handleDeletar(telefone.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
