## PEB — Site (Projeto Integrador)

Resumo rápido

Este repositório contém o front-end estático do projeto PEB — Programa Educar Brincando. É um site estático (HTML/CSS/JS) organizado com estilos base em `assets/css/base.css` e componentes em `assets/css/componentes/`.

## Estrutura principal

- `index.html` — página inicial
- `assets/css/base.css` — variáveis globais, reset e utilitários de layout (grid, containers, gutters, etc.)
- `assets/css/main.css` — CSS principal do projeto
- `assets/css/componentes/` — estilos por componentes reutilizáveis em mais de uma página (header, footer)
- `assets/css/paginas/` — estilos específicos para páginas individuais e suas seções
- `assets/imagens/` — imagens do site
- `js/main.js` — scripts JavaScript

## Guideline de desenvolvimento

Diretriz curta para manter consistência no projeto:

- Prefira reutilizar variáveis CSS definidas em `:root` (em `assets/css/base.css`) para cores, espaçamentos, radius e sombras. Evite valores hex/rgba inline.
- Use as classes utilitárias de grid definidas no projeto em vez de reinventar regras de layout (veja seção Grid e Containers abaixo).
- Separe estilos por componente dentro de `assets/css/componentes/` e mantenha `base.css` apenas para variáveis, reset e utilitários comuns.
- Ao adicionar novas variáveis (cores, espaçamentos, etc.), registre-as em `:root` em `base.css` com um comentário explicando o uso.
- Evite estilizar elementos diretamente por seletor global (por exemplo, não sobrescreva `a`, `button`, etc.) a menos que seja uma mudança global intencional.

Commit messages

- Use mensagens curtas e descritivas: "feat(header): adicionar versão responsiva" ou "fix(layout): corrigir espaçamento em .hero".

## Grid e utilitários (estilo Bootstrap-like)

O projeto inclui utilitários de grid inspirados no Bootstrap. Use-os assim:

- Containers
  - `.container` — centraliza o conteúdo e limita a largura a `--container-width` (definido em `base.css`).
  - Observação: não existe `container-fluid` por padrão; para largura total, pode-se usar um elemento sem `.container`.

- Linhas e colunas
  - `.row` — cria uma linha flex que respeita `--gutter-x` e `--gutter-y`.
  - `.col` — coluna flexível (cresce para preencher o espaço disponível).
  - `.col-auto` — coluna de largura automática.
  - `.col-1` .. `.col-12` — colunas com larguras fixas (sistema de 12 colunas).
  - Breakpoints: existe suporte para classes `col-sm`, `col-sm-1`..`col-sm-12` (aplicam-se em min-width: 576px). Há variantes análogas para outros breakpoints definidos no CSS.

- Gutter / espaçamento entre colunas
  - Classes: `.g-0`..`.g-5`, `.gx-*` e `.gy-*` — ajustam `--gutter-x` e `--gutter-y` dinamicamente.

- Offset
  - `.offset-1` .. `.offset-11` — aplicam margem-left para deslocar colunas.

- Alinhamento e justificativa
  - O CSS base segue a convenção do Bootstrap para nomeclatura: `align-items-*` e `justify-content-*` podem ser usados quando aplicáveis. Caso faltem utilitários específicos, prefira criar classes pequenas e documentadas em `assets/css/base/`.

Exemplos

HTML básico com grid:

```html
<div class="container">
  <div class="row">
    <div class="col-6">Coluna 1</div>
    <div class="col-6">Coluna 2</div>
  </div>
</div>
```

Usando gutters:

```html
<div class="row g-3">
  <div class="col-4">A</div>
  <div class="col-4">B</div>
  <div class="col-4">C</div>
</div>
```

## Cores e variáveis (extraídas de `assets/css/base.css`)

As cores e variáveis principais definidas em `:root` em `base.css` são:

- Cores primárias (escala):
  - `--color-primary-50`: #f3c294
  - `--color-primary-100`: #f0b57f
  - `--color-primary-200`: #eea969
  - `--color-primary-300`: #eb9d54
  - `--color-primary-400`: #e9903e
  - `--color-primary-500`: #E68429  (primária)
  - `--color-primary-600`: #cf7725
  - `--color-primary-700`: #b86a21
  - `--color-primary-800`: #a15c1d
  - `--color-primary-900`: #8a4f19

- Segunda / accent:
  - `--color-secondary`: #5F2EE6
  - `--color-accent`: #09BA45

- Neutras / texto / fundo:
  - `--color-bg`: #ffffff
  - `--color-surface`: #f8fafc
  - `--color-muted`: #6b7280
  - `--color-text`: #0f172a
  - `--color-border`: #e6e9ee

- Status:
  - `--color-success`: #09BA45
  - `--color-warning`: #f59e0b
  - `--color-danger`: #ef4444

- Escala de espaçamento (use `var(--space-*)`):
  - `--space-xs`: 4px
  - `--space-sm`: 8px
  - `--space-md`: 16px
  - `--space-lg`: 24px
  - `--space-xl`: 32px

- Container / gutters / tipografia / radius / sombras:
  - `--container-max` / `--container-width`: 1200px
  - `--gutter-x`: 24px (padrão)
  - `--gutter-y`: 0px (padrão)
  - `--radius-sm`: 4px
  - `--radius-md`: 8px
  - `--radius-lg`: 12px
  - `--shadow-sm`: 0 1px 2px rgba(15, 23, 42, 0.04)
  - `--shadow-md`: 0 6px 18px rgba(15, 23, 42, 0.08)
  - `--font-sans`: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial

Recomendações de uso das cores

- Use `--color-primary-500` como cor principal (botões primários, links em destaque).
- Use `--color-secondary` e `--color-accent` para elementos de destaque ou interação (CTA secundários, badges).
- `--color-text` para texto principal e `--color-muted` para texto menos importante.
- `--color-surface` como fundo de cartões e seções, `--color-bg` para o fundo da página.

## Como testar localmente

- Abrir `index.html` no navegador.
- Recomendo usar uma extensão como Live Server (VS Code) ou um servidor HTTP simples.

## Boas práticas ao adicionar código

- Sempre reutilize variáveis CSS existentes quando possível.
- Mantenha classes de utilitários pequenas e documentadas.
- Evite !important salvo em casos muito específicos documentados.

## Contribuição
{pendente}

