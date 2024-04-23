create database acmeFilmes_bia;

use acmeFilmes_bia;

drop database acmeFilmes_bia;

create table tbl_classificacao(
	id int not null auto_increment primary key,
    sigla varchar(3) not null,
    nome varchar(45) not null,
	descricao varchar(400) not null,
    icone varchar(4000) not null
);


create table tbl_filmes(
	id int not null auto_increment primary key,
    titulo varchar(200) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(4000) not null,
    valor_unitario float,
    id_classificacao int not null,
    
    FOREIGN KEY (id_classificacao)
    REFERENCES tbl_classificacao(id)

);

create table tbl_genero(
id int not null auto_increment primary key,
 nome varchar(45) not null

);

create table filme_genero(
 id int not null auto_increment primary key,
 filme_id int not null,
 id_genero int not null,
 
FOREIGN KEY (filme_id)
REFERENCES tbl_filmes(id),

FOREIGN KEY (id_genero)
REFERENCES tbl_genero(id)

);

create table sexo(
  id  int not null auto_increment primary key,
  sigla varchar(2) not null,
  nome varchar(20) not null
);

create table tbl_ator(
id  int not null auto_increment primary key,
nome varchar(300) not null,
nome_artistico varchar (100),
foto varchar (4000) not null,
data_nascimento date not null,
data_falecimento date,
biografia text,
id_sexo int not null ,

FOREIGN KEY (id_sexo)
REFERENCES sexo(id)
);

create table tbl_filmes_ator(
id  int not null auto_increment primary key,
filmes_id int not null,
ator_id int not null,

FOREIGN KEY (filmes_id)
REFERENCES tbl_filmes(id),

FOREIGN KEY (ator_id)
REFERENCES tbl_ator(id)
);

create table diretor(
  id  int not null auto_increment primary key,
  nome varchar(70) not null,
  foto text,
  data_nascimento date not null,
  data_falecimento date,
  biografia text,
  sexo_id  int not null,
  
FOREIGN KEY (sexo_id)
REFERENCES  sexo(id)
);

create table tbl_diretores_filme(
id int not null auto_increment primary key,
diretor_id int not null,
filmes_id int not null,

FOREIGN KEY (diretor_id)
REFERENCES diretor(id),

FOREIGN KEY (filmes_id)
REFERENCES tbl_filmes(id)

);

create table premiacoes(
  id int not null auto_increment primary key,
  nome varchar(70) not null,
  descricao varchar(400) not null
);

create table tbl_premiacoes_filme(
id int not null auto_increment primary key,
filmes_id int not null,
premiacoes_id int not null,

FOREIGN KEY (filmes_id)
REFERENCES  tbl_filmes(id),

FOREIGN KEY (premiacoes_id)
REFERENCES  premiacoes(id)

);

create table tbl_premiacao_ator(
id int not null auto_increment primary key,
ator_id int not null,
premiacoes_id int not null,

FOREIGN KEY (ator_id)
REFERENCES  tbl_ator(id),

FOREIGN KEY (premiacoes_id)
REFERENCES  premiacoes(id)

);

create table tbl_premiacao_diretor(
 id int not null auto_increment primary key,
 diretor_id int not null,
 premiacoes_id int not null,
 
 FOREIGN KEY (diretor_id)
REFERENCES  diretor(id),

FOREIGN KEY (premiacoes_id)
REFERENCES  premiacoes(id)
);


create table nacionalidade(
id int not null auto_increment primary key,
nome varchar (70) not null
);

create table tbl_nacionalidade_diretor(
 id int not null auto_increment primary key,
 diretor_id int not null,
 nacionalidade_id int not null,
 
 FOREIGN KEY (diretor_id)
REFERENCES  diretor(id),

FOREIGN KEY (nacionalidade_id)
REFERENCES  nacionalidade(id)
);

create table tbl_nacionalidade_ator(
id int not null auto_increment primary key,
ator_id int not null,
nacionalidade_id int not null,

FOREIGN KEY (ator_id)
REFERENCES  tbl_ator(id),

FOREIGN KEY (nacionalidade_id)
REFERENCES  nacionalidade(id)
);


insert into tbl_classificacao( id, sigla, nome, descricao, icone) values(
1,
"L",
"Livre",
"Não expõe crianças á coteúdos potencialmente prejudiciais.",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQThWHDqFQcfC1dnIZqu0BCZIT1uv8CmfD0uD6BvhnSxQ&s"
);


insert into tbl_filmes (id, titulo, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario, id_classificacao) values
(
1,
"10 coisas que eu odeio em você",
"Bianca Stratford é bonita e popular, mas não pode namorar antes que sua irmã mais velha encontre um namorado primeiro. O problema é que nenhum garoto consegue chegar perto da irmã, Kat Stratford. Para resolver a situação,
 um rapaz interessado em Bianca suborna um amigo com passado misterioso para sair com Kat e, quem sabe, tentar conquistá-la.",
 '01:39:00',
 "1999-03-31",
 null,
 "https://br.web.img3.acsta.net/medias/nmedia/18/90/67/52/20107757.jpg",
 29.99,
 1
);


insert into tbl_genero(id,nome) values(
  1,
  "Comédia Romântica"
);


insert into filme_genero( id, filme_id, id_genero) values 
(
1, 
1,
1
);

insert into sexo( id, sigla, nome) values 
(
1,
"F",
"Feminino"
),
(
2,
"M",
"Masculino"
);

insert into tbl_ator( id, nome, nome_artistico, foto, data_nascimento, data_falecimento, biografia, id_sexo) values 
(
1, 
"Jennifer Lawrence",
"Jennifer Lawrence",
"https://veja.abril.com.br/wp-content/uploads/2016/06/celebridades-jennifer-lawrence-oscar-20130224-13-original.jpeg?quality=90&strip=info&w=720&h=440&crop=1",
 "1990-08-15",
 null,
 "Jennifer Shrader Lawrence é uma atriz norte-americana, vencedora do Oscar de Melhor Atriz por Silver Linings Playbook. ",
 1
);

insert into tbl_filmes_ator( id, filmes_id, ator_id) values 
(
1,
1,
1
);


insert into diretor(id, nome, foto, data_nascimento, data_falecimento, biografia, sexo_id) values
(
1,
"Greta Gerwig",
"https://cinepop.com.br/wp-content/uploads/2022/12/Greta-Gerwig-1.jpg",
"1983-04-04",
null,
"Greta Celeste Gerwig é uma atriz, roteirista e diretora norte-americana conhecida pelo seu envolvimento com o movimento cinematográfico nova-iorquino Mumblecore e 
por filmes como To Rome with Love de Woody Allen e Frances Ha de Noah Baumbach.",
1
);

insert into tbl_diretores_filme(id, diretor_id, filmes_id) values 
(
1,
1,
1
);

insert into premiacoes( id, nome, descricao) values
(
1, 
"Prêmio Auteur",
"O Auteur Award é um prêmio honorário Satellite concedido pela International Press Academy para reconhecer as vozes individuais dos cineastas e seu impacto pessoal na indústria."
);

insert into tbl_premiacoes_filme( id, filmes_id, premiacoes_id) values 
(
1,
1,
1
);

insert into tbl_premiacao_ator(id, ator_id, premiacoes_id) values 
(
1,
1,
1
);

insert into nacionalidade(id,nome) values 
(
1,
"Brasileiro"
);

insert into tbl_nacionalidade_diretor( id, diretor_id, nacionalidade_id) values 
(
1,
1,
1
);

insert into  tbl_nacionalidade_ator( id, ator_id, nacionalidade_id) values
(
1,
1,
1
);

show tables;
