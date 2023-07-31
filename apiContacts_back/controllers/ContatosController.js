const database = require("../models");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

class ContatosController {
  static async find(req, res) {
    const options = {
      order: [["createdAt", "DESC"]],
      include: { model: database.Telefone },
    };

    if (req.query.nome) {
      options.where = {
        nome: {
          [Op.like]: `%${req.query.nome}%`,
        },
      };
    }

    try {
      const result = await database.Contato.findAll(options);

      if (!result) {
        return res.status(404).json({ message: "Contato não encontrado" });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "O id é obrigatório" });
      }

      const result = await database.Contato.findOne({
        where: {
          id: Number(id),
        },
        include: { model: database.Telefone },
      });

      if (!result) {
        return res.status(404).json({ message: "Contato não encontrado" });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    try {
      const { nome, idade } = req.body;

      if (!nome || !idade) {
        return res
          .status(400)
          .json({ message: "Os campos nome e idade são obrigatórios" });
      }

      const result = await database.Contato.create({
        nome,
        idade,
      });

      res.status(201).json({
        message: "Contato criado com sucesso",
        contato: result,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, idade } = req.body;

      if (!id) {
        return res.status(400).json({ message: "O id é obrigatório" });
      }

      await database.Contato.update(
        {
          nome,
          idade,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      res.status(200).json({ message: "Contato atualizado com sucesso" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "O id é obrigatório" });
      }

      const telefones = await database.Telefone.findAll({
        where: {
          idcontato: Number(id),
        },
      });

      if (telefones.length > 0) {
        telefones.forEach(async (telefone) => {
          await database.Telefone.destroy({
            where: {
              id: telefone.id,
            },
          });
        });
      }

      await database.Contato.destroy({
        where: {
          id: Number(id),
        },
      });

      let mensagemLog = `Contato de id ${id} deletado com sucesso`;
      const logs = path.join("./", "logs", "excluidos.log.txt");
      const log = `[${new Date().toISOString()}] ${mensagemLog}\n`;
      fs.appendFile(logs, log, (err) => {
        if (err) {
          console.error("Erro ao criar log:", err);
        } else {
          console.log("Log criado com sucesso.");
        }
      });

      res.status(200).json({ message: "Contato deletado com sucesso" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = ContatosController;
