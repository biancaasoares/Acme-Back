const { PrismaClient } = require('@prisma/client')
const { ERROR_INTERNAL_SERVER_DB } = require('../../modulo/config')


const prisma = new PrismaClient()

const insertGenero = async function(dadosGenero){
    try {
        const sql = `insert into tbl_genero(nome)values('${dadosGenero.nome}')`
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

const updateGenero = async function(idGenero, dadosGenero){
    let sql
    console.log(sql)
    try {
        sql = `update tbl_genero set nome = '${dadosGenero.nome}' where tbl_genero.id_genero = ${idGenero}`
        
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

const deleteGenero = async function(id){
    try {
        const sql = `delete from tbl_genero where id = ${id}`
        let rsGenero = await prisma.$executeRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }
}

const selectAllGenero = async function(){
    try {
        let  sql = `select * from tbl_genero`
        let rsGenero = await prisma.$queryRawUnsafe(sql)
        
        if (rsGenero.length > 0 )
        console.log(rsGenero);
        return rsGenero
    } catch (error) {
        return false
    }
}

const selectByIdGenero = async function(id){
    try {

        const sql = `select * from tbl_genero where tbl_genero.id = ${id}`

        console.log(sql);
    
        
        let rsFilme = await prisma.$queryRawUnsafe(sql)
    
        return rsFilme
    } catch (error) {
        return false
    }
}

const selectNameGenero = async function(nome){
    try {
        let sql = `select * from tbl_genero where nome like"%${nome}%"`
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

const IDGenero = async function(){
    try {
        let sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_genero limit 1`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
}


module.exports = {
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    selectNameGenero,
    IDGenero,
    deleteGenero
}