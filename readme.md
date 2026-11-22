# PetShop — Plataforma Web


* **Site publicado:** https://grassi-labs.github.io/petshop/

---

## 🎯 Objetivo
Evoluir a plataforma web do PetShop desenvolvida na Fase 1 utilizando CSS3, Bootstrap 5, JavaScript e diretrizes de acessibilidade, tornando a página mais dinâmica, interativa e acessível, conforme as Aulas 6 a 10.

---

## ⚙️ Funcionalidades da Página
* **Carrossel de destaques:** Exibição rotativa de imagens e informações de produtos e serviços usando Bootstrap.
* **Funções temporais em JavaScript:** Atualização contínua da data, hora e status de atendimento no cabeçalho (`setInterval`) e exibição temporária de aviso após o envio do formulário (`setTimeout`).
* **Catálogo de produtos e serviços:** Visualização de 6 produtos em 3 categorias (Acessórios, Rações Não Perecíveis e Higiene/Limpeza) com imagem, descrição e valor, além da tabela de serviços de banho e tosa com valores para atendimento no local e tele-busca.
* **Cadastro e agendamento:** Formulário com dados do cliente e do pet, escolha de serviço, opção entre entrega no local ou tele-busca, seleção de data e horário no calendário e cálculo automático do valor estimado.
* **Acessibilidade:** Barra superior com ajuste de fonte (`A+` / `A-`) e alto contraste, audiodescrição no atributo `alt` das imagens, navegação por teclado (`tabindex` e `:focus`) e marcação de idioma estrangeiro (`lang="en"`).

---

## 🔧 Ajustes Realizados
* Separação do código em arquivos próprios para HTML, CSS, JavaScript e imagens.
* Substituição de atributos de formatação inline por classes do Bootstrap e folha de estilos externa (`css/estilos.css`), ajustando o foco para não interferir na marcação de `checkbox` e `radio`.
* Organização dos serviços em tabela e inclusão do formulário completo de cadastro e agendamento com calendário.
* Adaptação da página para acessibilidade visual e navegação por teclado.
* Manutenção da linha de autoria no rodapé no padrão da Fase 1.

---

## 📁 Arquivos do Projeto
* `index.html`: Código-fonte principal da página.
* `css/estilos.css`: Estilos da página, animações e modo de alto contraste.
* `js/script.js`: Funções temporais, cálculo do agendamento e controles de acessibilidade.
* `imagens/`: Diretório contendo as imagens dos produtos.
* `readme.md`: Documentação e guia de funcionalidades.