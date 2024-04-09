create schema db_acme_filmes_turma_aa;

use db_acme_filmes_turma_aa;

create table tbl_filme(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    duracao time not null,
    data_lancamento date not null,
    data_relancamento date,
    foto_capa varchar(300) not null,
    valor_unitario float,
    
    unique key (id),
    unique index (id)
);

insert into tbl_filme (nome, sinopse, duracao, data_lancamento, data_relancamento, foto_capa, valor_unitario) values
(
"O Segredo do Vale",
"Um drama emocionante que explora os segredos de uma pequena cidade no interior.",
'02:35:00',
"2022-08-25",
null,
"https://exemplo.com/foto_vale.jpg",
29.99
),
(
"Carros",
"Um carro com vida, correndo.",
'02:10:00',
"2021-12-15",
null,
"https://exemplo.com/foto_vale.jpg",
49.99
);

show tables;

select * from tbl_filme where nome like "%Segredo%"
