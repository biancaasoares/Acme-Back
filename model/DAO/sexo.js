const { PrismaClient } = require('@prisma/client')
const { ERROR_INTERNAL_SERVER_DB } = require('../../modulo/config')



const prisma = new PrismaClient()


const getListarSexo = async function(){
    try {

        let sql = `select * from sexo order by id desc`

        let rsSexo = await prisma.$queryRawUnsafe(sql)
        return rsSexo
    } catch (error) {
        return false
    }
}

const getListarPorIDSexo = async function(id){
    try {

        let sql = `select * from sexo where id = ${id}`

        let rsSexo = await prisma.$queryRawUnsafe(sql)
        return rsSexo
    } catch (error) {
        return false
    }
}


module.exports = {
    getListarSexo,
    getListarPorIDSexo
}