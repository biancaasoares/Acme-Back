
const { PrismaClient } = require('@prisma/client')
// const { ERROR_INTERNAL_SERVER_DB } = require('../../modulo/config')

const prisma = new PrismaClient()


const selectAllClassificacoes = async function(){
    try {

        let sql = 'select * from tbl_classificacao order by id desc'

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)
        return rsClassificacao
    } catch (error) {
        return false
    }

}

module.exports = {
    selectAllClassificacoes
}