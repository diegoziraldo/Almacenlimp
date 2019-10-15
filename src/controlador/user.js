'use strict'

var bcrypt=require('bcrypt-nodejs')
var User= require('../modelos/usuario');
var jwt=require('../service/jwt')
var path = require('path');
function saveUser(req,res){
    var params=req.body;
    var user =new User();

    if(params.name && params.surname && params.email && params.password){
        user.name=params.name;
        user.surname=params.surname;
        user.email=params.email;
        user.CreateAt=moment().unix();
        user.role=params.role;
        user.image=null



        User.find({$or: [
                {email: user.email.toLowerCase()}
        ]}).exec((err,users)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion de usuarios'})
            if(users && users.length>=1){
                return res.status(200).send({message:'El usuario que intentas registrar ya existe'})
            }else{
                bcrypt.hash(params.password,null,null,(err,hash)=>{
                    user.password=hash;
        
                    user.save((err,userStored)=>{
                        if(err) return res.status(500).send({message:'Error al guardar el usuario'})
        
                        if(userStored){
                            res.status(200).send({user:userStored})
                        }else{
                            res.status(404).send({message:'No se ha registrado el usuario'})
                        }
                    })
                })
            }
        })

       
    }else{
        res.status(200).send({
            message:'Completa todos los campos'
        })
    }
}
function getLoginUser(req,res){
    res.sendFile(path.join(__dirname + '/vistas/logeo.html'));
}

function getRegisterUser(req,res){
    res.sendFile(path.join(__dirname + '/vistas/registro.html'));
}


function loginUser(req,res){
    var params=req.body;

    var email=params.email;
    var password=params.password;

    User.findOne({email:email},(err,user)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(user){
            bcrypt.compare(password,user.password,(err,check)=>{
                if(check){
                    if(params.gettoken){
                        return res.status(200).send({token:jwt.createToken(user)})
                    }else{
                        user.password=undefined;
                        res.sendFile(path.join(__dirname + '/vistas/bararaNavegacion.html'));
                    }
                }else{
                    return res.status(404).send({message:'el usuario no se puede identificar'})
                }
            })
        }else{
            return res.status(404).send({message:'el usuario no se puede identificar!!'}) 
        }
    })
}

module.exports={

    saveUser,
    loginUser,
    getLoginUser,
    getRegisterUser
   

}





