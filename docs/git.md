# Guia de instalação e configuração do GIT

Instalar e configurar o GIT no path, se o mesmo não estiver configurado

**Windows:** Baixar e instalar o git do [repositório oficial](https://git-scm.com/downloads)  
**Linux:** Instalar utilizando o gerenciador de pacotes do SO (Ex: sudo apt-get install git).

Aplicar as seguintes configurações usando o console (substituir os campos destacados com o nome e login do usuário):

```sh
git config --global user.name "<User Name>"
git config --global user.email "<user.name>@..."
git config --global core.autocrlf input
git config --global core.safecrlf true
git config --global http.sslVerify false
git config --global credential.helper 'cache --timeout=43200'
```
