const atoresDAO = require('../model/DAO/atores')
const ERROR_Messages = require('../modulo/config.js')

const getListarAtores = async function() {

    try {

        let atoresJson = {}

        let dadosAtor = await atoresDAO.selectAllAtores()
     
        if (dadosAtor) {
            if (dadosAtor.length > 0) {
                dadosAtor.atores = dadosAtor
                dadosAtor.status_code = 200
            
                return atoresJson

            } else {
                return ERROR_Messages.ERROR_NOT_FOUND
            }
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const getListarAtoresId = async function(id) {

    try {

        let idAtor = id

        let atoresJson = {}
      
        if (idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
            return ERROR_Messages.ERROR_INVALID_ID
        } else {
            let dadosAtor = await atoresDAO.selectAtorById(idAtor)

            if (dadosAtor) {

                if (dadosAtor.length > 0) {
                    atoresJson.atores = dadosAtor
                    atoresJson.status_code = 200

                    return atoresJson

                } else
                    return ERROR_Messages.ERROR_NOT_FOUND
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarAtor = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }

        const errors = []

        if (!novosDados.nome || novosDados.nome === '' || novosDados.nome.length > 300 ||
            !novosDados.nome_artistico || novosDados.nome_artistico === '' || novosDados.nome_artistico.length > 100 ||
            !novosDados.foto || novosDados.foto === '' || novosDados.foto.length > 4000 ||
            !novosDados.data_nascimento || novosDados.data_nascimento === '' || novosDados.data_nascimento.length !== 10 ||
            (novosDados.data_falecimento && novosDados.data_falecimento.length !== 10)
        ) {
            if (!novosDados.data_falecimento || novosDados.data_falecimento.length !== 10) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            }
            return ERROR_Messages.ERROR_REQUIRED_FIELDS
        }

        const idAtor = id
        const atorAtualizado = await atoresDAO.updateAtor(idAtor, novosDados)

        if (atorAtualizado) {
            let novoAtorJson = {
                status: ERROR_Messages.SUCCESS_UPDATED_ITEM.status,
                status_code: ERROR_Messages.SUCCESS_UPDATED_ITEM.status_code,
                message: ERROR_Messages.SUCCESS_UPDATED_ITEM.message,
                idAtorAtualizado: idAtor,
                atores: novosDados
            }
            return novoAtorJson
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM
    }
}


const setNovoAtor = async function(dadosAtor, content) {
    
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novoAtorJson = {}

            if (dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 300 ||
                dadosAtor.nome_artistico == '' || dadosAtor.nome_artistico == undefined || dadosAtor.nome_artistico == null || dadosAtor.nome_artistico > 100 ||
                dadosAtor.foto == '' || dadosAtor.foto == undefined || dadosAtor.foto == null || dadosAtor.foto.length > 4000 ||
                dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento == null || dadosAtor.data_nascimento.length != 10 ||
                dadosAtor.biografia == '' || dadosAtor.biografia == undefined || dadosAtor.biografia == null || dadosAtor.biografia > 65000 
                
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
                if (dadosAtor.data_falecimento != '' && dadosAtor.data_falecimento != null && dadosAtor.data_falecimento != undefined) {
                    if (dadosAtor.data_falecimento.length != 10) {
                        return ERROR_Messages.ERROR_REQUIRED_FIELDS
                    } else {
                        statusValidate = true
                    }
                } else {
                    statusValidate = true
                }
                if (statusValidate) {
                    let novoAtor = await atoresDAO.insertAtor(dadosAtor)

                    if (novoAtor) {

                        let idAtor = await atoresDAO.getId()

                        novoAtorJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                        novoAtorJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                        novoAtorJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                        novoAtorJson.idNovoFilme = idAtor
                        novoAtorJson.filme = dadosAtor

                        return novoAtorJson
                    } else {
                        return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }

}


module.exports = {
   setNovoAtor,
   getListarAtoresId,
   setAtualizarAtor,
   getListarAtores
}