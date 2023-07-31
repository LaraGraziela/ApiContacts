const database = require("../models");

class TelefonesController {
  static async find(req, res) {
    try {
      const result = await database.Telefone.findAll({
        order: [["createdAt", "DESC"]],
      });

      if (!result) {
        return res.status(404).json({ message: "Telefone não encontrado" });
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

      const result = await database.Telefone.findOne({
        where: {
          id: Number(id),
        },
      });

      if (!result) {
        return res.status(404).json({ message: "Telefone não encontrado" });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findByContatoId(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "O id é obrigatório" });
      }

      const result = await database.Telefone.findAll({
        where: {
          idcontato: Number(id),
        },
      });

      if (!result) {
        return res.status(404).json({ message: "Telefone não encontrado" });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async create(req, res) {
    try {
      const { idcontato, numero } = req.body;

      if (!idcontato || !numero) {
        return res
          .status(400)
          .json({ message: "Os campos idcontato e numero são obrigatórios" });
      }

      const result = await database.Telefone.create({
        idcontato,
        numero,
      });

      res.status(201).json({
        message: "Telefone criado com sucesso",
        contato: result,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { idcontato, numero } = req.body;

      if (!id) {
        return res.status(400).json({ message: "O id é obrigatório" });
      }

      await database.Telefone.update(
        {
          idcontato,
          numero,
        },
        {
          where: {
            id: Number(id),
          },
        }
      );

      res.status(200).json({ message: "Telefone atualizado com sucesso" });
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

      await database.Telefone.destroy({
        where: {
          id: Number(id),
        },
      });

      res.status(200).json({ message: "Telefone deletado com sucesso" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

module.exports = TelefonesController;
