
/**
 * npm install prisma --save (realiza a conexão com o banco)
 * npm install @prisma/client --save (executa os scripts SQL)
 * npx prisma init
 */

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const funcoes = require('./controller/funcoes.js')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()

})

const bodyParserJSON = bodyParser.json()

app.use(bodyParserJSON)

/*imports dos arquivos internos*/

const controllerFilmes = require('./controller/controller_filme.js')

const controllerClassificacao = require('./controller/controller_classificacao.js')

const controllerNacionalidade = require('./controller/controller_nacionalidade.js')

const controllerSexo = require('./controller/controller_sexo.js')

const controllerGenero =  require('./controller/controller_genero.js')



                                            // filmes //
app.get('/v1/acmefilmes/filmes', cors(), async(request, response, next) => {
    response.json(funcoes.getListaFilmes())
    response.status(200)
})

app.get('/v1/acmefilmes/filme/:id', cors(), async(request, response, next) => {

    let idFilme = request.params.id

    response.json(funcoes.getFilme(idFilme))
    response.status(200)
})


app.get('/v2/acmefilmes/filmes', cors(), async(request, response, next) => {
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if (dadosFilmes) response.json(dadosFilmes), response.status(200)
    else response.json({ message: "nenhum registro encontrado" }), response.status(404)
})

app.get('/v2/acmefilmes/filme/:id', cors(), async(request, response, next) => {
    let idFilme = request.params.id

    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.get('/v2/acmefilmes/filtro/filme/', cors(), async(request, response, next) => {
    let name = request.query.nome

    console.log(name)
    let dadosFilme = await controllerFilmes.getFilmeNome(name)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.post('/v2/acmefilmes/filme', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerFilmes.setNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})

app.delete('/v2/acmefilmes/filme/:id', cors(), async function(request,response){

    let filmeId = request.params.id
    let resultDadosExcluirFilme = await controllerFilmes.setExcluirFilme(filmeId)

    // console.log(resultDadosExcluirFilme)
    response.json(resultDadosExcluirFilme)
})

app.put('/v2/acmefilmes/filme/:id', cors(), bodyParserJSON, async(request, response, next) => {

    const id = request.params.id

    let contentType = request.headers['content-type']
    let novosDados = request.body

    let resultDados = await controllerFilmes.setAtualizarFilme(id, novosDados, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})


                                                    // classificacao //

app.get('/v2/acmefilmes/classificacao', cors(), async function(request, response, next) {

    let dadosClassificacao = await controllerClassificacao.getListarClassificacao();

    if(dadosClassificacao){
        response.json(dadosClassificacao)
        response.status(200)
    }else {
        response.json({message: "nenhum registro encontrado"})
        response.status();
    }

   

})


app.get('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response, next) {

    const idClassificacao = request.params.id

    let dadosClassificacao = await controllerClassificacao.getListarClassificacao();

    if(dadosClassificacao){
        response.json(dadosClassificacao)
        response.status(200)
    }else {
        response.json({message: "nenhum registro encontrado"})
        response.status();
    }

   

})

app.post('/v2/acmefilmes/insertclassificacao', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerClassificacao.setNovaClassificacao(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)

})


app.put('/v2/acmefilmes/atualizarclassificacao/:id', cors(), bodyParserJSON, async(request, response, next) => {

    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let id = request.params.id

    let resultDados = await controllerClassificacao.setAtualizarClassificacao( id, dadosBody, contentType,)

    response.status(resultDados.status_code)
    response.json(resultDados)

})


app.delete('/v2/acmefilmes/classificacao/:id', cors(), async function(request,response, next){

    let idClassificacao = request.params.id
    let resultDadosExcluirClassificacao = await controllerClassificacao.setExcluirClassificacao(idClassificacao)

    // console.log(resultDadosExcluirFilme)
    response.json(resultDadosExcluirClassificacao.status_code)
    response.json(resultDadosExcluirClassificacao)
})


                                                  // nacionalidade //

app.get('/v2/acmefilmes/nacionalidade', cors(), async function(request, response, next) {

    let dadosNacionalidade = await controllerNacionalidade.getListarNacionalidade()

    if(dadosNacionalidade){
        response.json(dadosNacionalidade)
        response.status(dadosNacionalidade.status_code)
    }else {
        response.json({message: "nenhum registro encontrado"})
        response.status();
    }

   

})

app.get('/v2/acmefilmes/nacionalidade/:id', cors(), async function(request, response, next) {

    const idNacionalidade = request.params.id

    let dadosNacionalidade = await controllerNacionalidade.getListarNacionalidadeByID(idNacionalidade)

    if(dadosNacionalidade){
        response.json(dadosNacionalidade)
        response.status(200)
    }else {
        response.json({message: "nenhum registro encontrado"})
        response.status();
    }

   

})

                                                     // sexo //

app.get('/v2/acmefilmes/sexo', cors(), async function(request, response, next) {

    let dadosSexo = await controllerSexo.getListarSexo()

    if(dadosSexo){
        response.json(dadosSexo)
        response.status(dadosSexo.status_code)
    }else {
        response.json({message: "nenhum registro encontrado"})
        response.status();
    }

})

app.get('/v2/acmefilmes/sexo/:id', cors(), async function(request, response, next) {

    const idSexo = request.params.id

    let dadosSexo = await controllerSexo.getListarSexoByID(idSexo)

    if(dadosSexo){
        response.json(dadosSexo)
        response.status(200)
    }else {
        response.json({message: "nenhum registro encontrado"})
        response.status();
    }

})

                                                    // Gênero //
app.get('/v2/acmeFilmes/genero', cors(), async function(request, response){

    let dadosGenero = await controllerGenero.getListarGenero()

    if(dadosGenero){
        response.json(dadosGenero);
        response.status(200);
    } else {
            response.json({message: 'Nenhum registro nessa porra'})
            response.status(404)
    }
})

app.delete('/v2/acmeFilmes/genero/:id', cors(), async function(request, response, next){
    let idGenero = request.params.id

    let dadosGenero = await controllerGenero.setExcluirGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.post('/v2/acmeFilmes/insert', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultDadosNovoGenero = await controllerGenero.setInserirNovoGenero(dadosBody, contentType)
    
    console.log(resultDadosNovoGenero);
    response.status(200)
    response.json(resultDadosNovoGenero)
})

app.put('/v2/acmeFilmes/genero/:id', cors(), bodyParserJSON, async function(request, response){
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let idGenero = request.params.id

    let dadosGenero = await controllerGenero.setAtualizarGenero(idGenero, dadosBody, contentType)

    console.log(dadosGenero)
    response.status(200)
    response.json(dadosGenero)
})

app.get('/v2/acmeFilmes/genero/Filtro', cors(), async function(request, response){
    let nome = request.query.nome
    let dadosGenero = await controllerGenero.getNomeGenero(nome)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.get('/v2/acmeFilmes/genero/:id', cors(), async function(request, response, next){

    
    let idGenero = request.params.id
    
    let dadosGenero = await controllerGenero.getBuscarGenero(idGenero)

    
    response.status(200)
    response.json(dadosGenero)
})


console.log("API funcionando na porta 8080")
app.listen(8080, () => {})