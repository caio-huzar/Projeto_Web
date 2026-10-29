const Cargo = require('../models/Cargo');

async function listar(req,res){

    try{

        const cargos = await Cargo.findAll();

        res.json(cargos);

    }catch(erro){

        res.status(500).json({erro:erro.message});

    }

}

async function buscar(req,res){

    try{

        const cargo = await Cargo.findByPk(req.params.id);

        res.json(cargo);

    }catch(erro){

        res.status(500).json({erro:erro.message});

    }

}

async function inserir(req,res){

    try{

        const cargo = await Cargo.create({

            car_nome:req.body.car_nome

        });

        res.status(201).json(cargo);

    }catch(erro){

        res.status(500).json({erro:erro.message});

    }

}

async function atualizar(req,res){

    try{

        const cargo = await Cargo.findByPk(req.params.id);

        await cargo.update({

            car_nome:req.body.car_nome

        });

        res.json(cargo);

    }catch(erro){

        res.status(500).json({erro:erro.message});

    }

}

async function excluir(req,res){

    try{

        const cargo = await Cargo.findByPk(req.params.id);

        await cargo.destroy();

        res.json({
            mensagem:"Cargo removido."
        });

    }catch(erro){

        res.status(500).json({erro:erro.message});

    }

}

module.exports = {
    listar,
    buscar,
    inserir,
    atualizar,
    excluir
};