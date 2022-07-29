# Listagem dos fatos

A tela inicial apresenta duas opções de listas (01 e 02) que irão retornar a listagem de todos os fatos, filtrados ou não pela aba "buscar". E para isso é feita uma sequencia de funções para montar estas listas.

- Primeiramente é feita uma requisição a API pública `https://catfact.ninja/facts` que irá retornar uma lista de fatos sobre gatos de estimação.
Como esta listagem é limitada a 10 fatos por página, são feitas 10 requisições em 10 páginas diferentes `https://catfact.ninja/facts?page=X` totalizando 100 fatos.

- Em seguida é chamada uma function denominada "listagemFatos" que irá fazer um .map em todos os fatosFiltrados de ambas as listas, retornando cada uma
um componente "card" que contem o fato e sua index.

O [compontente de busca](docs/busca.md) é responsavel por filtrar os fatos que irão ser apresentados em ambas as listas