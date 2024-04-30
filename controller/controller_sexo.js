const sexoDAO = require('../model/DAO/sexo.js')
const ERROR_Messages = require('../modulo/config.js')


const getListarSexo = async function() {

    let sexoJSON = {};

    let dadosSexo = await sexoDAO.getListarSexo()

    if(dadosSexo){
        sexoJSON.sexo = dadosSexo;
        sexoJSON.quantidade = dadosSexo.length;
        sexoJSON.status_code = 200;
        
        return sexoJSON
    } else{
        return false;
    }
}

const getListarSexoByID = async function(id){
    try {
       
     
    let idSexo = id

    
    let sexoJSON = {}

   
    if(idSexo == '' || idSexo == undefined || isNaN(idSexo)){
        return message.ERROR_INVALID_ID // 400
    }else{
       
        let dadosSexo = await sexoDAO.getListarPorIDSexo(id)
        
        
        
        if(dadosSexo){

           
            if(dadosSexo.length > 0){
                
                sexoJSON.sexo = dadosSexo
                 sexoJSON.status_code = 200
    
                
                return sexoJSON
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



module.exports = {
    getListarSexo,
    getListarSexoByID
}