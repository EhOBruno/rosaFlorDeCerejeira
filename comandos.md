# Introdução

Nesse primeira parte de git comandos explicarei um pouco sobre os comandos mais importantes do git(para a gente), lembrando que existem muitas variações dos comandos e tbm muitos outros comandos. na segunda parte usamos os comandos na pratica.
    
# GIT COMANDOS

Leitura (e prática!) recomendada: https://www.atlassian.com/git/tutorials

OBS: O git é um software muito profundo e cheio de nuances! Esse tutorial é beeeem básico!

Dito isso, boa leitura! :)

## GIT CLONE

O comando `git clone` faz a cópia de um repositório _REMOTO_ git já existente.

## GIT STATUS

O comando `git status` retorna o status da branch em que o usuário se encontra, i.e., se existem arquivos que foram ou não foram adicionados à área de staging, qual branch vc está, etc

## GIT ADD

O commando `git add <nome_do_arquivo>` adiciona um arquivo à área de staging. Os arquivos que podem ser adicionados a essa área são aqueles que foram alterados pelo usuário, e podem ser encontrados com o comando `git status`. Caso queira adicionar todos os arquivos alterados ao staging, utilize `git add .` ou `git add *`. Caso contrário, indique, um por um, os arquivos a serem adicionados.

## GIT COMMIT

O comando `git commit` faz com que todos os arquivos presentes na área de staging sejam adicionados, de fato, ao projeto, na branch atual. 

* _OBS: ISSO NÃO FAZ COM QUE OS ARQUIVOS COMMITADOS SEJAM ADICIONADOS AO REPOSITÓRIO GIT REMOTO._

* OBS: UTILIZE O COMANDO `git commit -m '<texto>'` PARA COMMITAR. ESCREVA, EM < texto >, algo sucinto descrevendo as alterações feitas.



## GIT PUSH

O comando `git push` atualiza aquilo que foi commitado no repositório local para o repositório remoto. 

* OBS: utilize `git push origin <nome_da_branch>` para ser claro qual branch deve receber os commits. O comando como um todo significa: git(chamando o git para fazer algo) push(realizando o comando push) origin(o push deve ser feito na branch remota original) <nome_da_branch>(branch que vai receber o push).



## GIT PULL

O comando `git pull` atualiza a branch atual com as alterações da branch original.



## GIT CHECKOUT

O comando `git checkout <nome_da_branch>` faz com que ocorra a troca da branch atual para a branch <nome_da_branch>. Ou seja, se eu estou, por exemplo, na branch 'main', utilizando `git checkout dev`, eu troco para a branch 'dev'.

*  OBS: O COMANDO `git checkout -b <nome_da_branch>` cria, a partir da branch atual, uma branch de nome <nome_da_branch>. Esta, por sua vez, é uma 'cópia' da branch atual, mas o que for feito na branch atual não afeta a nova branch e vice-versa.



## GIT MERGE 

### <font color="red">muito cuiado com esse comando</font>

O comando `git merge <nome_da_branch>` faz a mescla da branch atual com a branch 'nome_da_branch'. Ou seja: todas as adições e alterações feitas em <nome_da_branch> passam pra branch atual. No entanto, <nome_da_branch> continua inalterada.

* OBS: isso pode gerar conflitos. "Conflito", no caso, é quando, ao mesclar duas branches, as duas realizam alterações no mesmo arquivo e, no fim das contas, essas duas versões do arquivo são diferentes. A resolução do conflito é escolher quais alterações queremos.
# Primeiro acesso
1. Abre o CMD e navegue até o local que vc  deseja ter a pasta do seu repositorio.<br>
    ex: area de trabalho

    * Para navegar no CMD use:
        ~~~cmd
        cd <nomedodiretorio>
        ~~~~
        No caso da area de trabalho provavelmente o comando sera:
        ~~~cmd
        cd desktop
        ~~~~
2. Quando estiver no local adequado usar o comando git clone.
    * git clone 
        ~~~cmd
        git clone <linkDoRepositorio>
        ~~~~
    Depois desse comando todas as pastas e arquivos do repositório serão copiadas para o seu dispositivo, após isso para utilizar os outros comandos para esse repositório, é necessário mudar o terminal para a pasta clonada:
    * Para mudar o diretório novamente:
        ~~~cmd
        cd <nomedorepositorioclonado>
        ~~~
3. Quando estiver no local do repositorio:
    * git pull para poder verificar a pasta `.git` e se está tudo atualizado
        ~~~cmd
        git pull
        ~~~