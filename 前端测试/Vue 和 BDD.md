# Vue 和 BDD



## 介绍



**TDD 的问题：**



- 由于是以单元测试为主，会导致做出来的东西和实际功能需求相偏离
- 过于依赖被测试功能的实现逻辑导致测试代码和实现代码耦合太高难以维护



**BDD 行为驱动开发：**



- 不需要再面向实现细节设计测试，取而代之的是面向行为来测试
-  BDD 的核心是关注软件的功能测试，所以 BDD 更多的是结合集成测试进行



**BDD 开发流程：**



1、开发人员和非开发人员一起讨论确认需求

2、以一种自动化的方式将需求建立起来，并确认是否一致

3、最后，实现每个文档示例描述的行为，并从自动化测试开始以指导代码的开发

4、功能验收



**BDD 解决方案：**



- [Cucumber](https://cucumber.io/)

- - 需求分析
  - 使用 [Gherkin](https://cucumber.io/docs/gherkin/) 语法描述需求
  - 将 Gherkin 描述的需求文档映射为自动化测试用例
  - 编写代码以通过测试
  - 功能验收



- BDD + TDD

- - 需求分析
  - 将需求映射为集成测试用例

- - - 单元测试
    - 编写代码以通过单元测试

- - 验证集成测试
  - 功能验收



- 轻量级 BDD 方案

- - 需求分析
  - 将需求映射为测试用例
  - 编写代码以通过测试
  - 功能验收



- TDD + BDD

- - 需求分析
  - TDD 测试驱动开发

- - - 编写单元测试
    - 编写代码以使测试通过

- - 编写集成测试验证功能需求



BDD 的核心是关注功能需求是否正确，所以先写测试后写测试都可以，但是通常情况下先写测试有助于对需求的理解，从而朝着正确的目标前进。



**Vue 中的 BDD 技术栈：**



- Jest + Vue Test Utils

- - 可以做单元测试
  - 也可以做集成测试

- Jest + Vue Testing Library

- - 只能做集成测试



## 配置测试环境



方式一：使用 Vue CLI 创建项目。

```shell
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, Vuex, Linter, Unit
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback in production) No
? Pick a linter / formatter config: Standard
? Pick additional lint features: Lint on save, Lint and fix on commit
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```



方式二：在一个已有的 Vue 项目中配置 Jest。

```shell
vue add unit-jest
```



方式三：[手动配置](https://vue-test-utils.vuejs.org/zh/installation/)。





测试环境准备完成之后需要简单配置一下功能测试代码结构及测试命令。



1、约定将所有的功能测试模块文件放到 /tests/feature 目录中

2、配置 npm scripts 脚本运行功能测试

```json
"scripts": {
  "test:unit": "vue-cli-service test:unit",
  "coverage": "vue-cli-service test:unit --coverage",
	"test:feature": "test:feature": "vue-cli-service test:unit --testMatch **/tests/feature/**/*.spec.[jt]s?(x)",
}
```

3、修改 ESLint 配置文件忽略 Jest 代码监测（可选）

```javascript
// .eslintrc
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '**/tests/feature/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
```



运行测试：

```shell
npm run test:feature
```

## 需求分析及编写功能测试用例







## 使用 Vue Test Utils 进行功能测试



## 使用 Vue Testing Library 进行功能测试



参考：https://testing-library.com/docs/vue-testing-library/intro/。



Vue Testing Library 是一组专注于测试组件而不依赖实现细节的工具。由于在设计时就充分考虑了可访问性，它采用的方案也使重构变得轻而易举。



它的指导原则是，与软件使用方式相似的测试越多，它们提供的可信度就越高。



- [官方文档](https://testing-library.com/docs/vue-testing-library/intro/)
- [GitHub 仓库](https://github.com/testing-library/vue-testing-library)
- 基于 DOM Testing Library 构建
- 基于官方的 [@vue/test-utils](https://github.com/vuejs/vue-test-utils) 构建



Vue Testing Library 做三件事：

- 从 DOM Testing Library 重新导出查询实用程序和帮助程序。
- 隐藏与测试库指导原则冲突的 `@vue/test-utils` 方法。
- 从这两个来源调整了一些方法。



### [指导原则（思想）](https://testing-library.com/docs/guiding-principles/)

测试越类似于您的软件使用方式，它们就可以给您带来更多的信心。

我们尝试仅公开鼓励您编写与网页使用方式非常相似的测试的方法和实用程序。



根据以下指导原则，实用程序包括在该项目中：

- 如果涉及渲染组件，则它应处理 DOM 节点而不是组件实例，并且不应鼓励处理组件实例。
- 对于以用户使用它的方式测试应用程序组件，它通常应该是有用的。我们在这里进行权衡是因为我们使用的是计算机，通常是模拟的浏览器环境，但总的来说，实用程序应鼓励按预期使用组件的方式进行测试。
- 实用程序的实现和 API 应该简单灵活。



归根结底，我们想要的是使此库轻巧，简单并且易于理解。



Vue 测试库是用于测试 Vue 组件的非常轻巧的解决方案。它在 @vue/test-utils 之上提供了轻量级的实用程序功能，以鼓励更好的测试实践的方式。



它的核心思想是：

测试越类似于您的软件使用方式，它们就可以给您带来更多的信心。



因此，您的测试将不使用渲染的 Vue 组件实例，而是使用实际的 DOM 节点。



该库提供的实用程序使用户以与查询用户 DOM 相同的方式方便地查询 DOM。它们使您可以通过其标签文本查找元素，从其文本中查找链接和按钮，并断言您的应用程序可访问。



它还公开了一种建议的方式，即通过 `data-testid` 查找元素，以作为文本内容和标签不合理或不实际的元素的“转义阴影线”。



### 安装



```shell
npm install --save-dev @testing-library/vue
```



### 基本示例

```html
<template>
  <div>
    <p>Times clicked: {{ count }}</p>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
  export default {
    data: () => ({
      count: 0,
    }),

    methods: {
      increment() {
        this.count++
      },
    },
  }
</script>
```



```javascript
import { render, fireEvent } from '@testing-library/vue'
import Component from './Component.vue'

test('increments value on click', async () => {
  // render 方法返回一组用于查询组件的实用程序。
  const { getByText } = render(Component)

	// getByText 返回所提供文本的第一个匹配节点
  // 如果没有匹配到任何元素或者找到了多个匹配，则抛出错误。
  getByText('Times clicked: 0')

  const button = getByText('increment')

  // Dispatch a native click event to our button element.
  await fireEvent.click(button)
  await fireEvent.click(button)

  getByText('Times clicked: 2')
})
```



### 查询操作

单元素查询：

- getBy ...：返回查询的匹配节点，如果没有元素匹配或找到多个匹配项，则抛出描述性错误（如果期望多个元素，则使用getAllBy代替）。
- queryBy ...：返回查询的第一个匹配节点，如果没有元素匹配，则返回null。这对于声明不存在的元素很有用。如果找到多个匹配项，则会引发错误（如果可以，请使用queryAllBy代替）。
- findBy ...：返回一个Promise，该Promise在找到与给定查询匹配的元素时进行解析。如果未找到任何元素，或者在默认的1000ms超时后找到一个以上的元素，则拒绝诺言。如果需要查找多个元素，请使用findAllBy。





多元素查询：

- getAllBy ...：返回查询的所有匹配节点的数组，如果没有元素匹配，则引发错误。
- queryAllBy ...：返回查询的所有匹配节点的数组，如果没有元素匹配，则返回一个空数组（[]）。
- findAllBy ...：返回一个promise，当找到与给定查询匹配的任何元素时，该promise将解析为元素数组。如果在默认的1000ms超时后未找到任何元素，则承诺将被拒绝。

- - findBy方法是getBy *查询和waitFor的组合。他们接受waitFor选项作为最后一个参数（即await screen.findByText（'text'，queryOptions，waitForOptions））



| Type of Query   | 0 匹配      | 1 匹配   | 大于 1 个匹配 | 重试 |
| --------------- | ----------- | -------- | ------------- | ---- |
| **单节点查询**  |             |          |               |      |
| `getBy...`      | 抛出异常    | 返回元素 | 抛出异常      | 否   |
| `queryBy...`    | 返回 `null` | 返回元素 | 抛出异常      | 否   |
| `findBy...`     | 抛出异常    | 返回元素 | 抛出异常      | 是   |
| **多节点查询**  |             |          |               |      |
| `getAllBy...`   | 抛出异常    | 返回数组 | 返回数组      | 否   |
| `queryAllBy...` | 返回 `[]`   | 返回数组 | 返回数组      | 否   |
| `findAllBy...`  | 抛出异常    | 返回数组 | 返回数组      | 是   |



### 查询使用建议



根据指导原则，您的测试应尽可能类似于用户与您的代码（组件，页面等）的交互方式。考虑到这一点，我们建议按以下优先顺序：



**1、每个人均可访问的查询，这些查询反映了视觉/鼠标用户以及使用辅助技术的用户的体验**



- getByRole：可用于查询可访问性树中公开的每个元素。使用名称选项，您可以按其可访问名称过滤返回的元素。对于几乎所有内容，这应该是您的首选。没有太多您无法做到的（如果无法做到，则可能无法访问您的UI）。通常，它将与name选项一起使用，例如：getByRole（'button'，{name：/ submit / i}）。检查角色列表。
- getByLabelText：仅对表单字段真正有用，但这是用户找到这些元素的第一方法，因此它应该是您的首选。
- getByPlaceholderText：占位符不能替代标签。但是，如果您仅此而已，那么它会比其他方法更好。
- getByText：对表单无用，但这是用户找到大多数非交互式元素（例如div和spans）的数字1方法。
- getByDisplayValue：导航带有填充值的页面时，表单元素的当前值会很有用。



**2、语义查询HTML5和ARIA兼容的选择器。请注意，在浏览器和辅助技术之间，与这些属性进行交互的用户体验差异很大。**



- getByAltText：如果您的元素是支持替代文本（img，区域和输入）的元素，则可以使用它来查找该元素。
- getByTitle：屏幕阅读器无法始终读取title属性，默认情况下，视觉属性不可见的用户看不到该属性



**3、Test IDs**



- getByTestId：用户看不到（或听到）这些内容，因此仅在您无法按角色或文本进行匹配或没有意义（例如文本是动态的）的情况下才建议使用此方法。



### debug

为了方便起见，除了查询之外，屏幕还公开了调试方法。此方法本质上是console.log（prettyDOM（））的快捷方式。它支持调试文档，单个元素或元素数组。 

```javascript
import { screen } from '@testing-library/dom'

document.body.innerHTML = `
  <button>test</button>
  <span>multi-test</span>
  <div>multi-test</div>
`

// debug document
screen.debug()
// debug single element
screen.debug(screen.getByText('test'))
// debug multiple elements
screen.debug(screen.getAllByText('multi-test'))
```

对于使用test-playground进行调试，屏幕显示了这种方便的方法，该方法记录了可以在浏览器中打开的URL。 

```javascript
import { screen } from '@testing-library/dom'

document.body.innerHTML = `
  <button>test</button>
  <span>multi-test</span>
  <div>multi-test</div>
`

// log entire document to testing-playground
screen.logTestingPlaygroundURL()
// log a single element
screen.logTestingPlaygroundURL(screen.getByText('test'))
```

### 手动查询



在测试库提供的查询之上，您可以使用常规的querySelector DOM API来查询元素。请注意，不建议将其用作逃生舱口，以按类或ID查询，因为它们对于用户是不可见的。如有必要，请使用一个testid，以使您可以轻松地回退非语义查询，并在HTML中建立稳定的API合同。 

```javascript
// @testing-library/react
const { container } = render(<MyComponent />)
const foo = container.querySelector('[data-foo="bar"]')
```



### 查询辅助工具

- https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano/related



### Playground

如果您想更熟悉这些查询，可以在 [testing-playground.com](https://testing-playground.com/) 上尝试一下。 Testing Playground 是一个交互式沙箱，您可以在其中对自己的 html 运行不同的查询，并获得与上述规则匹配的视觉反馈。



## 业务功能测试

## 优化

```javascript
// jest.config.js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./jest.setup.js']
}
// jest.setup.js
import { Wrapper } from '@vue/test-utils'

Wrapper.prototype.findById = function (id) {
  return this.find(`[data-testid=${id}]`)
}

Wrapper.prototype.findAllById = function (id) {
  return this.findAll(`[data-testid=${id}]`)
}
// types.d.ts
import { Wrapper } from '@vue/test-utils'
import Vue from 'vue'

declare module '@vue/test-utils' {
  export interface Wrapper {
    findById (id: string): Wrapper<Vue>
    findAllById (id: string): WrapperArray<Vue>
  }
}
```



## 总结



对于前端应用开发来说，在保证开发效率和软件质量的前提下，我个人更倾向于 BDD 模式。