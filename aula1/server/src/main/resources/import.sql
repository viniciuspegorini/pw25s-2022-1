insert into categoria (nome) values ('Informática');
insert into categoria (nome) values ('UD');
insert into categoria (nome) values ('Cozinha');
insert into categoria (nome) values ('Móveis');
insert into categoria (nome) values ('Categoria 5');
insert into categoria (nome) values ('Categoria 6');
insert into categoria (nome) values ('Categoria 7');
insert into categoria (nome) values ('Categoria 8');
insert into categoria (nome) values ('Categoria 9');
insert into categoria (nome) values ('Categoria 10');
insert into categoria (nome) values ('Categoria 11');

insert into marca (nome) values ('GL');
insert into marca (nome) values ('Reizer');
insert into marca (nome) values ('Ynos');

insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Refrigerador 429L','Refrigerador 429L Branco, duplex....',1990.0,2,1);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Notebook Arus 15.6','Notebook Arus 15.6 Core I7, 16Gb Ram...',2449.0,1,3);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Monitor 27pol','Monitor Gamer 27pol 144Hz, 1ms',1129.99,1,2);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Kit Teclado e Mouse','Kit com teclado ABNT e mouse com 5 botões',199.0,1,1);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Produto 5','Descricao do produto 5...',499.0,2,3);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Produto 6','Descricao do produto 6...',333.0,4,5);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Produto 7','Descricao do produto 7...',555.0,4,4);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Produto 8','Descricao do produto 8...',433.0,2,3);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Produto 9','Descricao do produto 9...',788.0,4,4);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Produto 10','Descricao do produto 10...',849.0,3,1);
insert into produto (nome, descricao, valor, categoria_id, marca_id) values ('Produto 11','Descricao do produto 11...',732.0,1,4);


INSERT INTO permissao (nome) values('ROLE_ADMIN');
INSERT INTO permissao (nome) values('ROLE_USER');
INSERT INTO permissao (nome) values('ROLE_GERENTE');
INSERT INTO permissao (nome) values('ROLE_ALUNO');
INSERT INTO permissao (nome) values('ROLE_PROFESSOR');

INSERT INTO usuario(nome, username, password) VALUES ('Administrador', 'admin','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');
INSERT INTO usuario(nome, username, password) VALUES ('Teste', 'teste','$2a$10$.PVIfB07x.SfMYTcToxL0.yxcLWU0GbS2NUO1W1QAvqMm/TsFhVem');

INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 1);
INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (1, 2);
INSERT INTO usuario_permissoes(usuario_id, permissoes_id) VALUES (2, 2);