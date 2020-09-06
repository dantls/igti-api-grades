import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grade = db.grade;

const create = async (req, res) => {

  const {name,subject,type,value} = req.body;

  const grade = new Grade({
    name,
    subject,
    type,
    value
  });

  try {
     const data = await grade.save();
     res.json(data);
  } catch (error) {
    res.status(500).json({"message": 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};
  try {

  const data = await Grade.find(condition);

  if(!data){
    res.status(404).json({"message": "Nenhum aluno encontrado."});
  }
  res.json(data);
  } catch (error) {
    res.status(500).json({"message":"Erro ao listar todos os documentos" });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findById({_id:id});

    if(!data){
      res.status(404).json({"message": `Aluno do ${id} não encontrado.`});
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({"message": `Erro ao buscar o Grade id: ${id}`});

  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      "message": 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndUpdate({_id:id}, req.body, {new:true});

    if(!data){
      res.status(404).json({"message": `Aluno do ${id} não encontrado para atualizar.`});
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({"message": `Erro ao atualizar a Grade id:  ${id}`});
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grade.findByIdAndDelete({_id:id});

    if(!data){
      res.status(404).json({"message": `Aluno do ${id} não encontrado para excluir.`});
    }

    res.json({ "message":" Excluído com sucesso."});
  } catch (error) {
    res.status(500).json({"message": `Erro ao deletar a Grade id:  ${id}`});
  }
};

const removeAll = async (req, res) => {
  try {

    const data = await Grade.deleteMany();
    if(!data){
      res.status(404).json({"message": `Não foi encontrado nenhuma grade para excluir.`});
    }

    res.json({ "message":" Grades excluidas com sucesso."});
  } catch (error) {
    res.status(500).json({"message": `Erro ao excluir todos as Grades`});
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
