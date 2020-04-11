# bexs

## Documentação do Projeto de Teste

Bem vindo ao projeto de teste para BEXS. Refere-se a uma tela de simulação de pagamento baseada no Ui a seguir:
(Adobe Xd)[https://xd.adobe.com/spec/9c4a9206-ac61-4050-796d-89c00fb79e91-ea7b/]

A tecnologia utilizada para realização desse projeto foi um sistema em Vue.js configurado com Vuex, Router, Eslint + Prettier e o framework de testes unitários Jest. Também foi utilizado como pré processador de CSS o SCSS e a estruturação lógica feita em Javascript. Abaixo segue instruções para rodar o projeto e detalhamento de arquitetura.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

## Como trabalhar com cada componente

Os componentes são estruturados com HTML, scripts e estilo em SCSS no mesmo arquivo. Para isso mantemos os arquivos com o mínimo de conteúdo possível e alta componentização (o que diminui código duplicado e permite maior escalabilidade). Na criação das classes de CSS seguimos o modelo BEM CSS e no script a ideia de mínimo acesso ao DOM para usar bem os recursos de reatividade que o Vue proporciona.
Outra boa prática que seguimos é evitar ao máximo escrever lógica no HTML, usando para isso recursos disponíveis no Vue como o computed. 
Além disso boa parte da estrutura é feita com CSS Grid. O que permite maior controle das variações responsivas e dinamismo visual no código.

Veja um exemplo de componente:
```vue
<template>
    <section class="BaseComponent">
        <h1 class="BaseComponent__title">Hello World</h1>
    </section>
<template>

<script>
export default {
    name: 'BaseComponent'
}
</script>

<style lang="scss" scoped>
.BaseComponent {
    display: grid;
    &__title {
        color: red;
    }
}
</style>
```

## Estilos globais

Os estilos globais, variáveis e funções de SCSS estão na estrutura de assets/scss. O estilo *main.scss* é carregado no arquivo principal da aplicação App.vue. Ele contém resets.css e estilos de formulários globais.
O arquivo *scoped.scss* contém um exportador para cada componente com as váriaveis de CSS para cores, fontes, mixings, variávies de espaçamento e padrões de z-index. Dessa forma cada componente tem um estilo nunca compartilhado no formato *scoped*.

## Componentização

Para montar a biblioteca de componentes desse projeto usamos a arquitetura Atomic Design, disponível na pasta */components*. Cada tipo de componente segue um prefixo para fácil identificação:
* Átomos (Base)
* Moleculas (Sem prefixo)
* Organismos (The)

Como o projeto contém apenas um template não adicionamos essa camada no Atomic Design. Porém adicionamos a camada de *Photons* responsável por elementos tão comuns dentro de outros componentes que são registrados diretamente no main.js. Esse é o caso do componente de ícone de svg. Utilizamos esse recurso a fim de manter os átomos sem importação de outros componentes.

## Ícones

Os ícones SVG do projeto estão organizados em geral na pasta *assets/icons*. Porém o componente global de ícones também aceita ícones vindo de outras pastas, basta apontar a propriedade path no componente. Utilizamos vários desses ícones para gerar as variações de cartões de crédito que estão na pasta *assets/images/cards*.

## Máscaras e Validações

Para máscaras criamos um plugin Mask no projeto, que recebe o conteúdo e o retorna com as máscaras. Assim podemos controlar cada máscara necessária nos formulários usando regex quando necessário.

Para validações usamos o plugin externo no qual eu contribuo Flux Validator com validações para documentos, cartões de crédito entre outros. Esse plugin contém uma camada de validação em cartões de crédito que retorna num objeto sua bandeira. Eu utilizo esse recurso para montar as variações de bandeiras em cartões de crédito no visualizador.

## Dynamic Form

Para criar formulários dinâmicos e escaláveis criei o componente DynamicForm. Esse componente consegue carregar todos os itens de um formulários criados no Atomic Design, e mantém o funcionamento reativo do v-model. Para criar conteúdos nele, carregamos os elementos do formulário através de um blueprint.

O blueprint nada mais é um um objeto dinâmico onde pode ser adicionadas as propriedades, validações e máscaras de cada item do formulário. Veja um exemplo de blueprint abaixo:

```javascript
export default invalidLabelText => [
  {
    id: 'card_number',
    tag: 'InputGroup',
    model: 'card_number',
    rules: ['required'],
    props: {
      mask: 'card',
      label: 'Número do cartão',
      type: 'text',
      floatingLabel: true,
      invalidLabel: invalidLabelText
    },
    events: {
      input: 'getCardType'
    }
  },
  {
    id: 'send',
    tag: 'BaseButton',
    props: {
      label: 'Continuar',
      type: 'submit'
    }
  }
]
```

O blueprint é importado e adicionado ao methods da página para poder receber parâmetros. O valor na propriedade model em cada objeto do blueprint precisa ser igual ao model da página para funcionar corretamente. Para criar a variação visual dos formulários utilizamos CSS Grid. Onde cada área do template é igual ao valor da propriedade id no blueprint. Isso permite que o visual do formulário possa ser completamente independente de sua estrutura física.

## Cartão de Crédito

Para criar o cartão de crédito aproveitei a reatividade dos elementos do formulário e a validação dos números do cartão para saber sua bandeira. As animações foram feitas com CSS e sua versão responsiva também.



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
