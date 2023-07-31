const express = require("express");
const { Router } = require("express");
const ContatosController = require("../controllers/ContatosController");
const TelefonesController = require("../controllers/TelefonesController");

const router = Router();

//Rotas Contatos
router.get("/contatos", ContatosController.find);
router.get("/contatos/:id", ContatosController.findById);
router.post("/contatos", ContatosController.create);
router.put("/contatos/:id", ContatosController.update);
router.delete("/contatos/:id", ContatosController.delete);

//Rotas Telefones
router.get("/telefones", TelefonesController.find);
router.get("/telefones/:id", TelefonesController.findById);
router.post("/telefones", TelefonesController.create);
router.put("/telefones/:id", TelefonesController.update);
router.delete("/telefones/:id", TelefonesController.delete);
router.get("/telefones/contato/:id", TelefonesController.findByContatoId);

module.exports = router;
