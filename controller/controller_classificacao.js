

const classificacaoDAO = require('../model/DAO/classificacao')
const ERROR_Messages = require('../modulo/config.js')


const setNovaClassificacao = async function(dadosClassificacao, content) {
    
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let NovaClassificacaoJson = {}

            if (dadosClassificacao.nome == '' || dadosClassificacao.nome == undefined || dadosClassificacao.nome == null || dadosClassificacao.nome.length > 45 ||
                dadosClassificacao.sigla == '' || dadosClassificacao.sigla == undefined || dadosClassificacao.sigla == null || dadosClassificacao.sigla > 3 ||
                dadosClassificacao.descricao == '' || dadosClassificacao.descricao == undefined || dadosClassificacao.descricao == null || dadosClassificacao.descricao > 400 ||
                dadosClassificacao.icone == '' || dadosClassificacao.icone == undefined || dadosClassificacao.icone == null || dadosClassificacao.icone.length > 4000 
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
               
                    let novaClassificacao = await classificacaoDAO.setNovaClassificacao(dadosClassificacao)

                    if (novaClassificacao) {

                        let idClassificacao = await classificacaoDAO.getId()

                        NovaClassificacaoJson.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                        NovaClassificacaoJson.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                        NovaClassificacaoJson.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                        NovaClassificacaoJson.idNovaClassificacao = idClassificacao
                        NovaClassificacaoJson.classificacao = dadosClassificacao

                        return NovaClassificacaoJson
                    } else {
                        return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
                    }
                
            }
        } else {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }
    } catch (error) {
        console.log(error)
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }

}

const setAtualizarClassificacao = async function(id, dadosClassificacao, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }

        

        if (dadosClassificacao.nome == '' || dadosClassificacao.nome == undefined || dadosClassificacao.nome == null || dadosClassificacao.nome.length > 45 ||
        dadosClassificacao.sigla == '' || dadosClassificacao.sigla == undefined || dadosClassificacao.sigla == null || dadosClassificacao.sigla > 3 ||
        dadosClassificacao.descricao == '' || dadosClassificacao.descricao == undefined || dadosClassificacao.descricao == null || dadosClassificacao.descricao > 400 ||
        dadosClassificacao.icone == '' || dadosClassificacao.icone == undefined || dadosClassificacao.icone == null || dadosClassificacao.icone.length > 4000 
    ) {
        return ERROR_Messages.ERROR_REQUIRED_FIELDS
    } else {
    
        const idClassificacao = id
        const classificacaoAtualizada = await classificacaoDAO.updateClassificacao(idClassificacao,  dadosClassificacao)

        if (classificacaoAtualizada) {
            let NovaClassificacaoJson = {
                status: ERROR_Messages.SUCCESS_UPDATED_ITEM.status,
                status_code: ERROR_Messages.SUCCESS_UPDATED_ITEM.status_code,
                message: ERROR_Messages.SUCCESS_UPDATED_ITEM.message,
                idClassificacaoAtualizada: idClassificacao,
                classificacao: dadosClassificacao
            }
            return NovaClassificacaoJson
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }}
    } catch (error) {
        console.log(error)
        return ERROR_Messages.ERROR_UPDATE_ITEM
    }
}

const setExcluirClassificacao = async function (id) {
    try {
        
        let idClassificacao = id;

        if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await classificacaoDAO.selectClassficationsById(idClassificacao)

            if(chamarConst.length > 0){
                let dadosClassificacao = await filmesDAO.deleteSelectClassificacaoById(id)

                if(dadosClassificacao){
                    return message.SUCCESS_DELETED_ITEM
                }else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            
        }else {
            return message.ERROR_NOT_FOUND
        }
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}


const getListarClassificacao = async function() {

    let classificacoJSON = {};

    let dadosClassificacao = await classificacaoDAO.selectAllClassificacoes();

    if(dadosClassificacao){
        classificacoJSON.classificacao = dadosClassificacao;
        classificacoJSON.quantidade = dadosClassificacao.length;
        classificacoJSON.status_code = 200;
        
        return classificacoJSON
    } else{
        return false;
    }
}


module.exports = {
    getListarClassificacao,
    setNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao
}