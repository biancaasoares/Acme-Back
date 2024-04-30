const { PrismaClient } = require('@prisma/client') 
 const prisma = new PrismaClient() 

  

const insertDiretor = async function(dadosDiretor){ 
    let sql 

  

     try { 

        if(dadosDiretor.data_falecimento != '' && 

         dadosDiretor.data_falecimento   != null && 

         dadosDiretor.data_falecimento  != undefined){ 

             sql = `insert into diretor (nome, foto, data_nascimento, data_falecimento, biografia, sexo_id )values( 

                                           '${dadosDiretor.nome}', 

                                           '${dadosDiretor.foto}',

                                           '${dadosDiretor.data_nascimento}', 

                                           '${dadosDiretor.data_falecimento}', 

                                           '${dadosDiretor.biografia}', 

                                           '${dadosDiretor.sexo_id}'  )`;

        }else{      

            sql = `insert into diretor (nome, foto, data_nascimento, data_falecimento, biografia, sexo_id )values( 

)values( 

    '${dadosDiretor.nome}', 

    '${dadosDiretor.foto}',

    '${dadosDiretor.data_nascimento}', 

     null

    '${dadosDiretor.biografia}', 

    '${dadosDiretor.sexo_id}'  )`;

        } 


 let final = await prisma.$executeRawUnsafe(sql) 

    
            return !!final

     } catch (error) { 

        return false 

     } 

} 


const updateDiretor = async function(UpdateDado, idDiretor) { 

    let sql 

    try{ 

        if(UpdateDado.data_falecimento != '' && 

        UpdateDado.data_falecimento   != null && 

        UpdateDado.data_falecimento   != undefined){ 

            sql = `update diretor set  

            nome = '${UpdateDado.nome}', 

            foto = '${UpdateDado.foto}',

            data_nascimento = '${UpdateDado.data_nascimento}', 

            data_falecimento = '${UpdateDado.data_falecimento}', 

            biografia = '${UpdateDado.biografia}', 

            id_sexo = '${UpdateDado.sexo_id}' 

            where diretor.id = ${idDiretor}` 

        }else{ 

            sql = `update diretor set  

            nome = '${UpdateDado.nome}', 

            foto = '${UpdateDado.foto}',

            data_nascimento = '${UpdateDado.data_nascimento}', 

            data_falecimento = '${UpdateDado.data_falecimento}', 

            biografia = '${UpdateDado.biografia}', 

            id_sexo = '${UpdateDado.sexo_id}' 

            where diretor.id = ${idDiretor}`
        } 

        console.log(sql) 

        let result = await prisma.$executeRawUnsafe(sql) 


        if(result){ 

           return true 

        }else{ 

           return false 

        } 

    }catch(error){ 

        return false 

    }  

} 

  

const deleteDiretor = async function(id){ 

    try { 

        const sql = `delete from diretor where id = ${id}` 

        let rsFilme = await prisma.$executeRawUnsafe(sql) 

        return rsFilme 

  

    } catch (error) { 

        return false 

    } 

} 

 

const selectAllDiretor = async function(){ 

    try { 

        let sql = 'select * from diretor' 

     

        
        let rsFilmes = await prisma.$queryRawUnsafe(sql)  

        return rsFilmes 

    } catch (error) { 

        return false 

    } 

  

} 

  

const selectDiretorById = async function(id){ 

  

    try { 
  
        const sql = `select * from diretor where id = ${id}` 

        let rsFilme = await prisma.$queryRawUnsafe(sql) 


        return rsFilme 

    } catch (error) { 

        return false 

    } 

} 

 

module.exports = { 

    selectAllDiretor, 
    selectDiretorById,
    deleteDiretor, 
    insertDiretor, 
    updateDiretor, 

} 

 

 