

const classificacaoDAO = require('../model/DAO/classificacao')
const ERROR_Messages = require('../modulo/config.js')

// Função para add novo filme
const setNovaClassificacao = async function(dadosClassificacao, content) {
    try {
        if (String(content).toLowerCase() == 'application/json') {

            let statusValidate = false
            let novoclassificacoJSON = {}

            if (dadosClassificacao.nome == '' || dadosClassificacao.nome == undefined || dadosClassificacao.nome == null || dadosClassificacao.nome.length > 80 ||
                dadosClassificacao.sinopse == '' || dadosClassificacao.sinopse == undefined || dadosClassificacao.nome == null || dadosClassificacao.sinopse > 65000 ||
                dadosClassificacao.duracao == '' || dadosClassificacao.duracao == undefined || dadosClassificacao.duracao == null || dadosClassificacao.duracao > 9 ||
                dadosClassificacao.data_lancamento == '' || dadosClassificacao.data_lancamento == undefined || dadosClassificacao.data_lancamento == null || dadosClassificacao.data_lancamento.length != 10 ||
                dadosClassificacao.foto_capa == '' || dadosClassificacao.foto_capa == undefined || dadosClassificacao.foto_capa == null || dadosClassificacao.foto_capa.length > 200 ||
                dadosClassificacao.valor_unitario.length > 8 || isNaN(dadosClassificacao.valor_unitario)
            ) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            } else {
                if (dadosClassificacao.data_relancamento != '' && dadosClassificacao.data_relancamento != null && dadosClassificacao.data_relancamento != undefined) {
                    if (dadosClassificacao.data_relancamento.length != 10) {
                        return ERROR_Messages.ERROR_REQUIRED_FIELDS
                    } else {
                        statusValidate = true
                    }
                } else {
                    statusValidate = true
                }
                if (statusValidate) {
                    let novoFilme = await classificacaoDAO.insertFilme(dadosClassificacao)

                    if (novoFilme) {

                        let idClassificacao = await classificacaoDAO.getId()

                        novoclassificacoJSON.status = ERROR_Messages.SUCCESS_CREATED_ITEM.status
                        novoclassificacoJSON.status_code = ERROR_Messages.SUCCESS_CREATED_ITEM.status_code
                        novoclassificacoJSON.message = ERROR_Messages.SUCCESS_CREATED_ITEM.message
                        novoclassificacoJSON.idNovoFilme = idClassificacao
                        novoclassificacoJSON.filme = dadosClassificacao

                        return novoclassificacoJSON
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

const setAtualizarClassificacao = async function(id, novosDados, content) {
    try {
        if (String(content).toLowerCase() !== 'application/json') {
            return ERROR_Messages.ERROR_INVALID_FORMAT
        }

        const errors = []

        if (!novosDados.nome || novosDados.nome === '' || novosDados.nome.length > 80 ||
            !novosDados.sinopse || novosDados.sinopse === '' || novosDados.sinopse.length > 65000 ||
            !novosDados.duracao || novosDados.duracao === '' || novosDados.duracao > 9 ||
            !novosDados.data_lancamento || novosDados.data_lancamento === '' || novosDados.data_lancamento.length !== 10 ||
            !novosDados.foto_capa || novosDados.foto_capa === '' || novosDados.foto_capa.length > 200 ||
            (novosDados.valor_unitario && (isNaN(novosDados.valor_unitario) || novosDados.valor_unitario.length > 8)) ||
            (novosDados.data_relancamento && novosDados.data_relancamento.length !== 10)
        ) {
            if (!novosDados.data_relancamento || novosDados.data_relancamento.length !== 10) {
                return ERROR_Messages.ERROR_REQUIRED_FIELDS
            }
            return ERROR_Messages.ERROR_REQUIRED_FIELDS
        }

        const idClassificacao = id
        const filmeAtualizado = await classificacaoDAO.updateFilme(idClassificacao, novosDados)

        if (filmeAtualizado) {
            let novoclassificacoJSON = {
                status: ERROR_Messages.SUCCESS_UPDATED_ITEM.status,
                status_code: ERROR_Messages.SUCCESS_UPDATED_ITEM.status_code,
                message: ERROR_Messages.SUCCESS_UPDATED_ITEM.message,
                idClassificacaoAtualizado: idClassificacao,
                filme: novosDados
            }
            return novoclassificacoJSON
        } else {
            return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return ERROR_Messages.ERROR_UPDATE_ITEM
    }
}

const setExcluirClassificacao = async function (id) {
    classificacaoDAO.deleteFilme(id)
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

    
const getBuscarClassificacao = async function(id) {

    try {

        let idClassificacao = id

        let classificacoJSON = {}

        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
            return ERROR_Messages.ERROR_INVALID_ID
        } else {
            let dadosClassificacao = await classificacaoDAO.selectAllClassificacoes()

            if (dadosClassificacao) {

                if (dadosClassificacao.length > 0) {
                    classificacoJSON.filme = dadosClassificacao
                    classificacoJSON.status_code = 200

                    return classificacoJSON

                } else
                    return ERROR_Messages.ERROR_NOTFOUND
            } else {
                return ERROR_Messages.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return ERROR_Messages.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getListarClassificacao,
    getBuscarClassificacao,
}