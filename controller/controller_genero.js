
const { application } = require('express')
const generoDAO = require('../model/DAO/genero.js')

const message = require('../modulo/config.js')
const { join } = require('@prisma/client/runtime/library.js')
const { json } = require('body-parser')

const setInserirNovoGenero = async function(dadosGenero, contentType){
    try{
        
        if(String(contentType).toLowerCase() == 'application/json'){
    
            
            console.log(dadosGenero)
                let novoGeneroJSON = {}
            
                
                if(dadosGenero.nome == ''                  || dadosGenero.nome == undefined            || dadosGenero.nome == null            || dadosGenero.nome.length > 45           
                ){
                    return message.ERROR_REQUIRED_FIELDS
                }
            
                else{
            
                    let validateStatus = true
            
                    
                    if(validateStatus){
            
                        
                        let novoGenero = await generoDAO.insertGenero(dadosGenero)
                        
                        if(novoGenero){
                            let idGenero = await generoDAO.IDGenero()
                            dadosGenero.id = Number(idGenero[0].id)
                        }
                
                        
                        if(novoGenero){
                
                            
                            novoGeneroJSON.filme       = dadosGenero
                            novoGeneroJSON.status      = message.SUCCESS_CREATED_ITEM.status
                            novoGeneroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                            novoGeneroJSON.message     = message.SUCCESS_CREATED_ITEM.message
                
                            return novoGeneroJSON //201
                            
                        }else{
                            return message.ERROR_INTERNAL_SERVER_DB //500
                        }
                    }else{
                        validateStatus = false
                    }
            
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 
    }

}

const setAtualizarGenero = async function(id, dadoAtualizado, contentType){

    try{

        let idGenero = id

       
        if(String(contentType).toLowerCase() == 'application/json'){
            let dadosID = generoDAO.selectByIdGenero()
            
            if(idGenero == '' || idGenero == undefined || idGenero == isNaN(idGenero) || idGenero == null){
                return message.ERROR_INVALID_ID

            }else if(idGenero>dadosID.length){
                return message.ERROR_NOT_FOUND
            }else{
               
                    let atualizarGeneroJSON = {}

                    
                    if(dadoAtualizado.nome == ''                  || dadoAtualizado.nome == undefined            || dadoAtualizado.nome == null            || dadoAtualizado.nome.length > 80          
                    ){
                        return message.ERROR_REQUIRED_FIELDS
                    }
                
                    else{
                        let validateStatus = true

                          
                
                        
                        if(validateStatus){
                           
                            let dadosGenero = await generoDAO.updateGenero(idGenero, dadoAtualizado)
                            
                            
                            console.log(dadosGenero)
                            if(dadosGenero){
                    
                              
                                atualizarGeneroJSON.filme       = dadosGenero
                                atualizarGeneroJSON.status      = message.SUCCESS_UPDATED_ITEM.status
                                atualizarGeneroJSON.status_code = message.SUCCESS_UPDATED_ITEM.status_code
                                atualizarGeneroJSON.message     = message.SUCCESS_UPDATED_ITEM.message
                                return atualizarGeneroJSON //201
                                
                            }else{
                                return message.ERROR_INTERNAL_SERVER_DB //500
                            }
                        }else{
                            validateStatus = false
                        }
                
                    }
                    
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }


        }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 
    }
}

const setExcluirGenero = async function(id){
try {
    let idGenero = id

    if(idGenero == '' || idGenero == undefined || idGenero == isNaN(idGenero) || idGenero == null){
        return message.ERROR_INVALID_ID
    }else{
        let dadosGenero = await generoDAO.deleteGenero(idGenero)

        if(dadosGenero){
           return message.SUCCESS_DELETED_ITEM
        }else{
            return message.ERROR_NOT_FOUND
        }
    }
} catch (error) {
    return message.ERROR_INTERNAL_SERVER
}
}

const getListarGenero = async function(){
  

    try {
        let generoJSON = {}

   let dadosGenero = await generoDAO.selectAllGenero()
   {
    if(dadosGenero){

        if(dadosGenero.length> 0){
            generoJSON.generos = dadosGenero
            generoJSON.quantidade = dadosGenero.length
            generoJSON.status_code = 200
            return generoJSON
        }else{
            return message.ERROR_NOT_FOUND
        }
    }else{
        return message.ERROR_INTERNAL_SERVER_DB
    }

    } 
    }
    catch (error) {
        return message.ERROR_INTERNAL_SERVER
}}

const getBuscarGenero = async function(id){
    try {
         
      
     let idGenero = id

     
     let generoJSON = {}
 
 
     
     if(idGenero == '' || idGenero == undefined || isNaN(idGenero)){
         return message.ERROR_INVALID_ID // 400
     }else{
 
          
         let dadosGenero = await generoDAO.selectByIdGenero(id)
 
         
         if(dadosGenero){
 
             
             if(dadosGenero.length > 0){
                 
                 generoJSON.genero = dadosGenero
                 generoJSON.status_code = 200
     
                 
                 return generoJSON
             }else{
                 return message.ERROR_NOT_FOUND // 404
             }
 
         }else{
             return message.ERROR_INTERNAL_SERVER_DB // 500
         }
     }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_DB
    }
    
}

const getNomeGenero = async function(nome){
    let nomeGenero = nome

    let generoJSON = {}

    if(nomeGenero == '' || nomeGenero == undefined){
        return message.ERROR_INVALID_ID // 400
    }else{
        let dadosGenero = await generoDAO.selectNameGenero(nome)
    
        if(dadosGenero){
    
            if(dadosGenero.length > 0){
                generoJSON.nome = dadosGenero
                generoJSON.quantidade = dadosGenero.length
                generoJSON.status_code = 200
                
                return generoJSON
            }else{
                return message.ERROR_NOT_FOUND // 404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB // 500
        }
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getListarGenero,
    getBuscarGenero,
    getNomeGenero
    
}