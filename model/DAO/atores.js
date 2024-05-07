const { PrismaClient } = require('@prisma/client')
const { ERROR_INTERNAL_SERVER_DB } = require('../../modulo/config')



const selectAllAtores = async function() {
    try {

        let sql = 'select * from tbl_ator'

        let rsAtores = await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        return false
    }

}


const selectAtorById = async function(id) {

    try {
        let sql = `select * from tbl_ator where id=${id}`

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}

const insertAtor = async function(dadosAtor) {
    

    try {
        let sql

        if (dadosAtor.data_falecimento == null ||
            dadosAtor.data_falecimento == undefined ||
            dadosAtor.data_falecimento == '') {
            
            sql = `insert into tbl_ator (nome, 
                                        nome_artistico,
                                        foto,
                                        data_nascimento,
                                        data_falecimento,
                                        biografia
                                        
        ) values(
            '${dadosAtor.nome}',
            '${dadosAtor.nome_artistico}',
            '${dadosAtor.foto}',
            '${dadosAtor.data_nascimento}',
            null,
            '${dadosAtor.biografia}',
           
        )`
        } else {
            
            sql = `insert into tbl_ator (nome, 
                                        nome_artistico,
                                        foto,
                                        data_nascimento,
                                        data_falecimento,
                                        biografia
                                    ) values(
                                    '${dadosAtor.nome}',
                                    '${dadosAtor.nome_artistico}',
                                    '${dadosAtor.foto}',
                                    '${dadosAtor.data_nascimento}',
                                    null,
                                    '${dadosAtor.biografia}',
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

const updateAtor = async function (id, dadosAtor) {
    let sql
    try{
        if (dadosAtor.data_falecimento != '' &&
        dadosAtor.data_falecimento != null &&
        dadosAtor.data_falecimento != undefined
    ) {
            sql = `UPDATE tbl_ator SET 
            nome = "${dadosAtor.nome}",
            nome_artistico = "${dadosAtor.nome_artistico}",
            foto = '${dadosAtor.foto}',
            data_nascimento = '${dadosAtor.data_nascimento}',
            data_falecimento = '${dadosAtor.data_falecimento}',
            biografia = '${dadosAtor.biografia}'
            WHERE id = ${id}`
    } else {
        sql = `UPDATE tbl_filmes SET 
        nome = "${dadosAtor.nome}",
        nome_artistico = "${dadosAtor.nome_artistico}",
        foto = '${dadosAtor.foto}',
        data_nascimento = '${dadosAtor.data_nascimento}',
        data_falecimento = null,
        biografia = '${dadosAtor.biografia}'
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

const getId = async function() {
    try {
        const sqlGet = 'select cast(id as decimal) as id from tbl_ator order by id desc limit 1'

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

module.exports = {
    selectAllAtores,
    selectAtorById,
    insertAtor,
    updateAtor,
    getId
    
}