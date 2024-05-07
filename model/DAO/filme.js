

const { PrismaClient } = require('@prisma/client')
const { ERROR_INTERNAL_SERVER_DB } = require('../../modulo/config')

/**
 * $queryRawUnsafe(sql) --encaminha uma variavel
 * $queryRaw('select * from tbl_filme') -- encaminha o script direto
 */

const prisma = new PrismaClient()

const insertFilme = async function(dadosFilme) {
    console.log('oi1')

    try {
        let sql

        if (dadosFilme.data_relancamento == null ||
            dadosFilme.data_relancamento == undefined ||
            dadosFilme.data_relancamento == '') {
            console.log('oi1')
            sql = `insert into tbl_filmes (titulo, 
                                        sinopse,
                                        duracao,
                                        data_lancamento,
                                        data_relancamento,
                                        foto_capa,
                                        valor_unitario,
                                        id_classificacao
        ) values(
            '${dadosFilme.titulo}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.duracao}',
            '${dadosFilme.data_lancamento}',
            null,
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}',
            '${dadosFilme.id_classificacao}'
        )`
        } else {
            console.log('oi2')
            sql = `insert into tbl_filmes (titulo, 
                                          sinopse,
                                          duracao,
                                          data_lancamento,
                                          data_relancamento,
                                          foto_capa,
                                          valor_unitario,
                                          id_classificacao
                                    ) values(
                                    '${dadosFilme.titulo}',
                                    '${dadosFilme.sinopse}',
                                    '${dadosFilme.duracao}',
                                    '${dadosFilme.data_lancamento}',
                                    null,
                                    '${dadosFilme.foto_capa}',
                                    '${dadosFilme.valor_unitario}',
                                    '${dadosFilme.id_classificacao}'
                                    )`
        }

        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_filmes order by id desc limit 1'

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

const updateFilme = async function (id, dadosFilme) {
    let sql
    try{
        if (dadosFilme.data_relancamento != '' &&
        dadosFilme.data_relancamento != null &&
        dadosFilme.data_relancamento != undefined
    ) {
            sql = `UPDATE tbl_filmes SET 
            titulo = "${dadosFilme.titulo}",
            sinopse = "${dadosFilme.sinopse}",
            duracao = '${dadosFilme.duracao}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            data_relancamento = '${dadosFilme.data_relancamento}',
            foto_capa = '${dadosFilme.foto_capa}',
            valor_unitario = '${dadosFilme.valor_unitario}',
            id_classificacao ='${dadosFilme.id_classificacao}'
            WHERE id = ${id}`
    } else {
        sql = `UPDATE tbl_filmes SET 
        titulo = "${dadosFilme.titulo}",
        sinopse = "${dadosFilme.sinopse}",
        duracao = '${dadosFilme.duracao}',
        data_lancamento = '${dadosFilme.data_lancamento}',
        foto_capa = '${dadosFilme.foto_capa}',
        valor_unitario = '${dadosFilme.valor_unitario}',
        id_classificacao = '${dadosFilme.id_classificacao}'
        WHERE id = ${id}`
    }
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

// const updateFilme = async function(id, novosDados) {
//     try {
//         let sql = `UPDATE tbl_filme SET `
//         const keys = Object.keys(novosDados)

//         keys.forEach((key, index) => {
//             sql += `${key} = '${novosDados[key]}'`
//             if (index !== keys.length - 1) {
//                 sql += `, `
//             }
//         })

//         sql += ` WHERE id = ${id}`

//         let result = await prisma.$executeRawUnsafe(sql)

//         return result
//     } catch (error) {
//         return ERROR_INTERNAL_SERVER_DB
//     }
// }

const deleteFilme = async function (id) {
    try {
        const sql = `DELETE FROM tbl_filmes WHERE tbl_filmes.id = ${id}`;
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

const selectAllFilmes = async function() {
    try {

        let sql = 'select * from tbl_filmes'

        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }

}

const selectFilmeById = async function(id) {

    try {
        let sql = `select * from tbl_filmes where id=${id}`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

const selectFilmeByName = async function(name) {
    try {
        let sql = `select * from tbl_filmes where nome like "%${name}%"`

        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectFilmeById,
    selectFilmeByName,
    getId
}