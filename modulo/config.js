

/***********************Mensagens de erro******************************* */
const ERROR_INVALID_ID = { status: false, status_code: 400, message: "Id invalido" }

const ERROR_NOT_FOUND = { status: false, status_code: 404, message: "Nenhum item encontrado" }

const ERROR_INTERNAL_SERVER_DB = { status: false, status_code: 500, message: "Ocorreram erros no processamento da DB. Contate o administrador da API" }

const ERROR_INVALID_NAME = { status: false, status_code: 400, message: "Formato de Nome Invalido" }

const ERROR_REQUIRED_FIELDS = { status: false, status_code: 400, message: "Existem campos obrigatórios que não foram preenchidos ou ultrapassaram o limite de caracteres" }

const ERROR_INVALID_FORMAT = { status: false, status_code: 415, message: "Foi enviado um formato invalido de arquivo" }

const ERROR_INTERNAL_SERVER = { status: false, status_code: 500, message: "Ocorreram erros no processamento da API. Contate o administrador " }

const ERROR_UPDATE_ITEM = { status: false, status_code: 428, message: "Não foi possivel atualizar o item no banco de dados." }


/**********************Mensagens de sucesso************************** */

const SUCCESS_CREATED_ITEM = { status: true, status_code: 201, message: "Dados inseridos com sucesso!!!" }

const SUCCESS_UPDATED_ITEM = { status: true, status_code: 200, message: "Dados atualizados com sucesso!!" }

const SUCCESS_DELETED_ITEM = {status: true, status_code: 200, message: "Item deletado com sucesso"}

module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID_NAME,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATED_ITEM,
    ERROR_INVALID_FORMAT,
    ERROR_INTERNAL_SERVER,
    SUCCESS_UPDATED_ITEM,
    ERROR_UPDATE_ITEM,
    SUCCESS_DELETED_ITEM
}