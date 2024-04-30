
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

const selectClassficationsById = async function(){
    
    try {
        let sql = `select * from tbl_classificacao where id = ${id}`

        let rsClassificacao = await prisma.$queryRawUnsafe(sql)

        return rsClassificacao
    } catch (error) {
        return false
    }
}

const setNovaClassificacao = async function(dadosClassificao){

    try {
        const sql = `insert into tbl_classificacao( sigla, nome, descricao, icone)values
        (
        '${dadosClassificao.sigla}',
        '${dadosClassificao.nome}',
        '${dadosClassificao.descricao}',
        '${dadosClassificao.icone}')`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
           return true
        }else{
           return false
        }
    } catch (error) {
        return false
    }

}

const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_classificacao order by id desc limit 1'

        let resultGet = await prisma.$queryRawUnsafe(sqlGet)

        if (resultGet) {
            return resultGet
        } else {
            return false
        }
    } catch (error) {
        return ERROR_INTERNAL_SERVER_DB
    }
}

const updateClassificacao = async function (id, dadosClassificacao){
    let sql
    try{
       
        sql = `UPDATE tbl_classificacao SET 
        nome = "${dadosClassificacao.nome}",
        descricao = "${dadosClassificacao.descricao}",
        sigla = '${dadosClassificacao.sigla}',
        icone = '${dadosClassificacao.icone}'
        
        WHERE id = ${id}`
    
    console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)
        if(result) {
            return true
        } else {
            return false
        }
    } catch (error){
        return false
    }

}


const deleteClassificacao = async function(id){
    try {
         let sql = `delete from tbl_classificacao where id = ${id}`;
         
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }   
}



module.exports = {
    selectAllClassificacoes,
    setNovaClassificacao,
    deleteClassificacao,
    selectClassficationsById,
    getId,
    updateClassificacao
}