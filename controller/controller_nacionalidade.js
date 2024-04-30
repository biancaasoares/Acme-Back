const nacionalidadeDAO = require('../model/DAO/nacionalidade')
const ERROR_Messages = require('../modulo/config.js')



const getListarNacionalidade = async function() {

    let nacionalidadeJSON = {};

    let dadosNacionalidade = await nacionalidadeDAO.getListarNacionalidade()

    if(dadosNacionalidade){
        nacionalidadeJSON.nacionalidade = dadosNacionalidade;
        nacionalidadeJSON.quantidade = dadosNacionalidade.length;
        nacionalidadeJSON.status_code = 200;
        
        return nacionalidadeJSON
    } else{
        return false;
    }
}

const getListarNacionalidadeByID = async function(id){
    try {
       
     
    let idNacionalidade = id

   
    let nacionalidadeJSON = {}

    console.log(idNacionalidade)

    
    if(idNacionalidade == '' || idNacionalidade == undefined || isNaN(idNacionalidade)){
        return ERROR_Messages.ERROR_INVALID_ID // 400
    }else{
        
        
        let dadosNacionalidade = await nacionalidadeDAO.getListarPorIDNacionalidade(id)
        
        
        
        if(dadosNacionalidade){

            
            if(dadosNacionalidade.length > 0){
                
                nacionalidadeJSON.nacionalidade = dadosNacionalidade
                 nacionalidadeJSON.status_code = 200
    
                
                return nacionalidadeJSON
            }else{
                return ERROR_Messages.ERROR_NOTFOUND // 404
            }

        }else{
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB // 500
        }
    }
   } catch (error) {
       return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
   }
}



module.exports = {
    getListarNacionalidade,
    getListarNacionalidadeByID
}