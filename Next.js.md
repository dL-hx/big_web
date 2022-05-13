## [React 服务端渲染框架 Next.js](https://zhuanlan.zhihu.com/p/364023768)

作者：大白菜
链接：https://zhuanlan.zhihu.com/p/364023768
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



### 1、Next 整体介绍

Next.js 是 React 服务端渲染应用框架. 用于构建 SEO 友好的 SPA 应用.

1. 支持两种预渲染方式, 静态生成和服务器端渲染. 
2. 基于页面的路由系统, 路由零配置
3. 自动代码拆分. 优化页面加载速度.
4. 支持静态导出, 可将应用导出为静态网站.
5. 内置 CSS-in-JS 库 styled-jsx
6. 方案成熟, 可用于生产环境, 世界许多公司都在使用
7. 应用部署简单, 拥有专属部署环境 Vercel, 也可以部署在其他环境.

### 2、创建next 项目

```js
创建: npm init next-app next-guide
运行: npm run dev
访问: localhost:3000
```

临时安装 create-next-app 用于创建 Next.js 项目.



![img](https://pica.zhimg.com/v2-5c00892cb5f82cd44c911f5ad50a7e19_720w.jpg?source=d16d100b)![img](https://pica.zhimg.com/80/v2-5c00892cb5f82cd44c911f5ad50a7e19_720w.jpg?source=d16d100b)



### 3、基于页面的路由系统

创建页面

在 Next.js 中, 页面是被放置在 pages 文件夹中的 React 组件.  组件需要被默认导出. 组件文件中不需要引入 React. 页面地址与文件地址是对应的关系.

```js
export default function List () {
  return <div> List page works </div>
}
// pages/index.js /
// pages/list.js  /list
// pages/post/first.js  /post/first
```



![img](https://pic3.zhimg.com/v2-92c88c027800a53e76432f406eaef7f3_720w.jpg?source=d16d100b)![img](https://pic3.zhimg.com/80/v2-92c88c027800a53e76432f406eaef7f3_720w.jpg?source=d16d100b)



### 4、基于页面的路由系统 - 页面跳转

Link 组件默认使用 JavaScript 进行页面跳转. 即 SPA 形式的跳转. 如果浏览器中 JavaScript 被禁用. 则使用链接跳转. Link 组件中不应添加除 href 属性以外的属性, 其余属性添加到a标签上. Link 组件通过预取(在生产中)功能自动优化应用程序以获得最佳性能.

```js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      Index page works
      <Link href="/list"><a>jump to list page</a></Link>
    </div>
  )
}
```

### 5、next 应用中的静态资源访问

应用程序根目录中的 public 文件夹用于提供静态资源. 

通过以下形式进行访问. public/images/1.jpg -> /images/1.jpg public/css/base.css -> /css/base.css

### 6、修改页面中的数据

通过 Head 组件修改元数据

```js
import Head from 'next/head';

<>
<Head>
  <title>Index Page</title>
</Head>
<>
```

### 7、next 应用中添加样式的方式

CSS 样式

内置 styled-jsx

在 Next.js 中内置了 styled-jsx, 它是一个 CSS-in-JS 库, 允许在 React 组件中编写 CSS, CSS 仅作用于组件内部. 

```js
<Link href="/list">
  <a className="demo">jump to List page</a>
<List>
<style jsx>{
  `
  .demo{
    color: red;
  }
  `
}
</style>
```

使用 css 模块

通过使用 CSS 模块功能, 允许将组件的 CSS 样式编写在单独的 CSS 文件中. CSS 模块约定样式文件的名称必须为"组件文件名称.module.css"

```js
//index.module.css
.p{
  color: green
}

// index.js
import styles from './index.module.css';

<div className={styles.p}></div>
```

3 全局样式文件

1. 在 pages 文件夹中新建 _app.js 文件并加入如下代码
2. 在项目根目录下创建 styles 文件夹, 并在其中创建 global.css
3. 在 _app.js 中通过 import 引入 global.css.
4. 重新启动开发服务器

```js
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

### 8、预渲染介绍

预渲染概述

预渲染是指数据和HTML的拼接在服务器端提前完成.  预渲染可以使 SEO 更加友好. 预渲染会带来更好的用户体验, 可以无需运行 JavaScript 即可查看应用程序UI.



预渲染的两种形式

在 Next.js 中支持两种形式的预渲染: 静态生成和服务器端渲染. 静态生成和服务器端渲染是生成 HTML 的时机不同. 静态生成: 静态生成是在构建时生成 HTML. 以后的每个请求都共用构建时生成好的 HTML. 服务器端渲染: 服务器端渲染是在请求时生成 HTML. 每个请求都会重新生成 HTML.





两种预渲染方式的选择

Next.js 允许开发者为每个页面选择不同的预渲染方式. 不同的预渲染方式拥有不同的特点. 应根据场景进行渲染.  但建议大多数页面建议使用静态生成. 静态生成一次构建, 反复使用, 访问速度快. 因为页面都是事先生成好的.





适用场景：营销页面、博客文章、电子商务产品列表、帮助和文档

服务器端渲染访问速度不如静态生成快, 但是由于每次请求都会重新渲染, 所以适用数据频繁更新的页面或页面内容随请求变化而变化的页面.

### 9、实现静态生成

无数据和有数据的静态生成

如果组件不需要在其他地方获取数据, 直接进行静态生成. 如果组件需要在其他地方获取数据, 在构建时 Next.js 会预先获取组件需要的数据, 然后再对组件进行静态生成.

静态生成 getStaticProps

getStaticProps 方法的作用是**获取组件静态生成需要的数据**. 并通过 props 的方式将数据传递给组件. 该方法是一个异步函数, 需要在组件内部进行导出. 在开发模式下, getStaticProps 改为在每个请求上运行.

```js
export const function getStaticProps() {
    // 从文件系统, API,数据库中获取数据
  const data = ...
  return {
   // props 属性的值将会传递给组件
    props: ...
  }
}


import Head from 'next/head';
import styles from './list.module.css';
import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const read = promisify(readFile);

export default function List ({data}) {
  return <>
    <Head>
      <title>List Page</title>
    </Head>
    <div className={styles.demo}> {data} </div>
  </>
}

export async function getStaticProps () {
 // 读取文件内容
 let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8');
 console.log(data)
 return {
   props: {
     data
   }
 }
}
```

### 10、实现服务器端渲染

服务器端渲染 getServerSideProps 如果采用服务器端渲染, 需要在组件中导出 getServerSideProps 方法.

```js
export async function getServerSideProps(context) {
  // context 中会包含特定的请求参数
  return {
    props: {

    }
  }
}

export async function getServerSideProps () {
  let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8');
  console.log(data)
  return {
    props: {
      data
    }
  }
}
```

### 11、实现基于动态路由的静态生成

基于动态路由的静态生成

基于参数为页面组件生成HTML页面，有多少参数就生成多少HTML页面 在构建应用时, 先获取用户可以访问的所有路由参数, 再根据路由参数获取具体数据, 然后根据数据生成静态 HTML.

实现基于动态路由的静态生成

1. 创建基于动态路由的页面组件文件, 命名时在文件名称外面加上[], 比如[id].js
2. 导出异步函数 getStaticPaths, 用于获取所有用户可以访问的路由参数

```js
export async function getStaticProps () {
  // 此处获取所有用户可以访问的路由参数
  return {
    // 返回固定格式的路由参数
    path: [{params: {id: 1}}, {params: {id: 2}}],
    // 当用户访问的路由参数没有在当前函数中返回时，是否显示404页面 false： 显示 true 不显示
    fallback: false
  }
}
```

1. 导出异步函数 getStaticProps, 用于根据路由参数获取具体的数据

注: getStaticPaths 和 getStaticProps 只运行在服务器端, 永远不会运行在客户端, 甚至不会被打包到客户端 JavaScript 中, 意味着这里可以随意写服务器端代码, 比如查询数据库.

```js
export default function Post ({data}) {
  return <div>
    <span>{data.id}</span>
    <span>{data.title}</span>
  </div>
}
```

### 12、fallback 选项作用

// 当用户访问的路由参数没有在当前函数中返回时，是否显示404页面 false： 显示 true 不显示





```js
 import { useRouter } from 'next/router';

export default function Post ({data}) {   const router = useRouter()   if (router.isFallback) return 

Loading

   return 

 {data.id} {data.title} 

 }



// 返回用户可以访问到的所有路由参数
export async function getStaticPaths () {   return {     paths: [{params: {id: '1'}}, {params:{id: '2'}}],     fallback: true   } }

// 返回路由参数所对于的具体数据
export async function getStaticProps ({params}) {   const id = params.id;   let data;   switch (id) {     case 1:       data = {id: 1, title: 'hello'};       break;     case 2:       data = {id: 2, title: 'word'};       break;     case 3:       data = {id: 3, title: 'hello word'};       break;     default:        data = {}   }   return {     props: {       data     }   } }  


```

### 13、自定义 404 页面

要创建自定义 404 页面, 需要在 pages 文件夹中创建 404.js 文件.

```js
export default function Cusrom404 () {
  return <h1> 404 - Page Not Found></h1>
}
```

### 14、API Routes

什么是 API Routes

API Routes 可以理解为接口, 客户端向服务器端发送请求获取数据的接口. Next.js 应用允许 React 开发者编写服务器端代码创建数据接口.

如何实现API Routes

1. 在 pages/api 文件夹中创建 API Routes 文件. 比如 user.js
2. 在文件中默认导出请求处理函数, 函数有两个参数, req 为请求对象, res 为响应对象.

```js
export default function (req, res) {
  res.status(200).send({id: 1, name: 'Tom'})
}
```

当前API Routes 可以接收任何 http 方法

1. 访问 API Routes： localhost:3000/api/user 不要在 getStaticPaths 或 getStaticProps 函数中访问 API Routes, 因为这两个函数就是在服务器端运行的,  可以直接写服务器端代码.

### Next 案例实现

### 案例初始化配置

```js
// .babelrc
{
  "presets": ["next/babel", "@emotion/babel-preset-css-prop"]
}
```

### 1. 创建项目

```text
npm init next-app movie
cd movie
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm install react-icons
npm install @emotion/babel-preset-css-prop -D
npm install @babel/core
npm run dev
```

访问: localhost:3000

pages/_app.js

```js
// import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
```

### 实现头部组件布局

```js
import { Box, Container, Button, Image } from "@chakra-ui/react";
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import { FaSignInAlt, FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const logo = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
`

const SignInAndJoin = styled.div`
  height: 52px;
  line-height: 52px;
  border-left: 1px solid #393939;
  border-right: 1px solid #393939;
  padding: 0 6px;
  float: left;
  color: white;
  & > button {
    padding: 0 10px;
  }
  & > button:nth-of-type(1):after {
    content: '';
    width: 1px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 0;
    top: 15px;
  }
`

const Search = styled.a`
  float: right;
  height: 52px;
  border-left: 1px solid #393939;
  border-right: 1px solid #393939;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
`

export default function Header () {
  return <Box h="52px" bg="#202020" borderBottom="1px solid #393939">
    <Container h="52px" maxW="1200px" position="relative">
      <SignInAndJoin>
        <Button bg="transparent" leftIcon={<FaSignInAlt/>}>登录</Button>
        <Button bg="transparent" leftIcon={<BsFillPersonFill/>}>注册</Button>
      </SignInAndJoin>
      <Image css={logo} src="/images/logo.png"/>
      <Search>
        <FaSearch/>
      </Search>
    </Container>
  </Box>
}
```

### 2、实现导航组件布局

```js
import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Navigation () {
  return (
    <Box h="52px" bg="#202020" color="#fff">
      <HStack space={3} justifyContent="center" alignItems="center" h="52px">
        <Link href="/"><a>影片</a></Link>
        <Link href="/"><a>漫画</a></Link>
        <Link href="/"><a>电影</a></Link>
        <Link href="/"><a>电视</a></Link>
        <Link href="/"><a>新闻</a></Link>
      </HStack>
    </Box>
  )
}
```

### 实现轮播组件

```js
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import Head from 'next/head';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const CarouselItem = styled.div`
  position: relative;
  & > div {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    color: white;
    padding-top: 180px;
    text-align: left;
    width: 100%;
    max-width: 1200px;
    & > p {
      margin: 10px 0;
      font-size: 14px;
      width: 450px;
    }
  }
  & > img {
    filter: brightness(50%)
  }
`

const swiperContainer = css`
  position: relative;
  & > .carousel:last-child {
    position: absolute;
    left: 0;
    bottom: 0;
    & > .thumbs-wrapper > .thumbs {
      display: flex;
      justify-content: center;
    }
  }
`

export default function Swiper ({data}) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/carousel.min.css" />
      </Head>
      <Carousel
        css={swiperContainer}
        showArrows={false}
        showIndicators={false}
        showStatus={false}>
          <CarouselItem>
            <img src='/images/1.jpg' />
            <Box>
              <Heading as="h2" size="lg">
                22
              </Heading>
              <Text>
               3233
              </Text>
              <Button colorScheme="red">
                按钮
              </Button>
            </Box>
          </CarouselItem>
          <CarouselItem>
            <img src='/images/2.jpg' />
            <Box>
              <Heading as="h2" size="lg">
                22
              </Heading>
              <Text>
               3233
              </Text>
              <Button colorScheme="red">
                按钮
              </Button>
            </Box>
          </CarouselItem>
          <CarouselItem>
            <img src='/images/3.jpg' />
            <Box>
              <Heading as="h2" size="lg">
                22
              </Heading>
              <Text>
               3233
              </Text>
              <Button colorScheme="red">
                按钮
              </Button>
            </Box>
          </CarouselItem>
      </Carousel>
    </>
  )
}
```

### 电影列表布局

```js
import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { MdMovie } from "react-icons/md";
import axios from 'axios'

export default function Movie () {
  return (
    <Box maxW="1200px" mx="auto" mt="20px">
      <HStack fontSize="24px">
        <MdMovie/>
        <Heading as="h3" fontSize="24px">电影</Heading>
      </HStack>
      <HStack mt="20px" space={3}>
        <Box w="290px">
          <Image src='/images/item_1.jpg'/>
          <Text mt="10px">6666666</Text>
        </Box>
        <Box w="290px">
          <Image src='/images/item_1.jpg'/>
          <Text mt="10px">6666666</Text>
        </Box>
      </HStack>
    </Box>
  )
}
```

### 电影详细页面

```js
// Layout.js
import React from 'react'
import Header from './Header'
import Navigation from './Navigation'

export default function Layout ({children}) {
  return <>
    <Header />
    <Navigation />
    {children}
  </>
}

// index.js
import Layout from '../components/Layout'
import Swiper from '../components/Swiper';
import Movie from '../components/Movie';
export default function Home() {
  return (
    <div>
      <Layout />
      <Swiper />
      <Movie />
    </div>
  )
}

// detail/[id].js
import { Box, Divider, Heading, Text} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { css } from "@emotion/react"
const DetailContainer = css`
  padding: 10px 0;
  & > p {
    font-size: 14px;
    margin-bottom: 10px;
  }
  & > img {
    margin-bottom: 10px;
    display: block;
  }
`

export default function Detail ({detail}) {
  return <Layout>
    <Box maxW="1200px" mx="auto" mt="70px">
      <Heading as="h2" size="xl">
      4 月刷题打卡继续
      </Heading>
      <Heading as="h4" size="lg" color="gray.500" fontWeight="light" mt="10px">
        3 月春招闯关活动已经落幕，4 月咱们继续刷题打卡，做好准备迎接 Offer，更有大奖拿
      </Heading>
      <Divider mt="10px" />
      <Box overflow="hidden" mt="10px">
        <Text float="left">作者: 大白菜</Text>
        <Text float="right">发布时间: 2020-4-10</Text>
      </Box>
      <Divider mt="10px" />
      {/* <Box css={DetailContainer} dangerouslySetInnerHTML={{ __html: detail.content }}>
      </Box> */}
    </Box>
  </Layout>
}
```

### 轮播组件动态数据

```js
// axiosConfig.js
export const baseURL = 'http://localhost:3005'

// pages/index.js
import Layout from '../components/Layout'
import Swiper, {loadSwiper} from '../components/Swiper'
import Movie from '../components/Movie'

export default function Home({swiper, movie}) {
  return (
    <Layout>
      <Swiper data={swiper}/>
      <Movie />
    </Layout>
  )
}

export async function getStaticProps () {
  // 获取轮播图数据
  let { data: swiper } = await loadSwiper()
  // 获取电影列表数据
  let { data: movie } = await loadMovie()
  return {
    props: {
      swiper,
      movie
    }
  }
}


// movie.js

import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { MdMovie } from "react-icons/md";
import axios from 'axios'
import {baseURL} from '../axiosConfig'

export default function Movie ({data, title}) {
  return (
    <Box maxW="1200px" mx="auto" mt="20px">
      <HStack fontSize="24px">
        <MdMovie/>
        <Heading as="h3" fontSize="24px">{title}</Heading>
      </HStack>
      <HStack mt="20px" space={3}>
      {
        data.map(movie => (
          <Box w="290px">
            <Image src={movie.url}/>
            <Text mt="10px">{movie.title}</Text>
          </Box>
        ))
      }
      </HStack>
    </Box>
  )
}

export function loadMovie () {
  return axios.get('/api/movie', {baseURL})
}
```

### 实现详情页基于动态路由生成

```js
<Button colorScheme="red">
    <Link href="/detail/[id]" as={`/detail/${swiper.vid}`}><a>
      CHECK DETAIL
    </a></Link>
  </Button>

  // [id].js

  // 获取到用户能够访问到的所有的路由参数
export async function getStaticPaths () {
  // ["1", "2"]
  const {data} = await axios.get('/api/videos', { baseURL })
  // [{params: {id: "1"}}]
  let paths = data.map(id => ({params: {id}}))
  return {
    paths,
    fallback: false, // 当用户传递一个不在范围内的 id 时，就展示一个 404 页面
  }
}

// 根据参数获取其对应的数据
export async function getStaticProps ({params}) {
  let id = params.id
  let {data: detail} = await axios.get(`/api/detail?id=${id}`, {baseURL})
  return {
    props: {
      detail
    }
  }
}
```

### 导出静态网站

```js
"scripts": {,
    "export": "next build && next export"
  },
```

### 5. 自定义 next 服务

package.json

```json
"mydev": "nodemon server/index.js",
```

server/index.js

```js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const app = next({dev})

const handler = app.getRequestHandler()

// prepare 方法是准备一下 next 应用
app.prepare().then(() => {
  const server = express()

  server.get('/hello', (req, res) => {
     res.send('Hello Next.js')
  })

  server.get('*', (req, res) => {
    handler(req, res)
  })

  server.listen(3000, () => console.log('服务器启动成功，请访问: http://localhost:3000'))
})
```

### 6. 部署到 Vercel

我先将数据服务部署到了我的服务器，地址是 http://[yangjiaxin.cc](http://link.zhihu.com/?target=https%3A//dc.console.aliyun.com/next/index%3Fspm%3D5176.2020520101securitygroupdetail.recommend.ddomain.10964df5hAtk1d%23/domain/details/info%3FsaleId%3DS2020760W3B64181%26domain%3Dyangjiaxin.cc):3000, 这个地址要写到 axiosConfig.js 文件里，给 baseURL 变量。

然后在 GitHub 上创建一个仓库，将这个项目代码导入到 GitHub 仓库。然后登陆 [https://vercel.com/](http://link.zhihu.com/?target=https%3A//vercel.com/) 选择 GitHub 的这个仓库进行部署。

------



![img](https://pica.zhimg.com/v2-051cec469cf07fd09a849c8ee8afe737_720w.jpg?source=d16d100b)![img](https://pica.zhimg.com/80/v2-051cec469cf07fd09a849c8ee8afe737_720w.jpg?source=d16d100b)

1、Next 整体介绍

Next.js 是 React 服务端渲染应用框架. 用于构建 SEO 友好的 SPA 应用.

1. 支持两种预渲染方式, 静态生成和服务器端渲染. 
2. 基于页面的路由系统, 路由零配置
3. 自动代码拆分. 优化页面加载速度.
4. 支持静态导出, 可将应用导出为静态网站.
5. 内置 CSS-in-JS 库 styled-jsx
6. 方案成熟, 可用于生产环境, 世界许多公司都在使用
7. 应用部署简单, 拥有专属部署环境 Vercel, 也可以部署在其他环境.

### 2、创建next 项目

```js
创建: npm init next-app next-guide
运行: npm run dev
访问: localhost:3000
```

临时安装 create-next-app 用于创建 Next.js 项目.



![img](https://pic1.zhimg.com/v2-5c00892cb5f82cd44c911f5ad50a7e19_720w.jpg?source=d16d100b)![img](https://pic1.zhimg.com/80/v2-5c00892cb5f82cd44c911f5ad50a7e19_720w.jpg?source=d16d100b)



### 3、基于页面的路由系统

创建页面

在 Next.js 中, 页面是被放置在 pages 文件夹中的 React 组件.  组件需要被默认导出. 组件文件中不需要引入 React. 页面地址与文件地址是对应的关系.

```js
export default function List () {
  return <div> List page works </div>
}
// pages/index.js /
// pages/list.js  /list
// pages/post/first.js  /post/first
```



![img](https://pic2.zhimg.com/v2-92c88c027800a53e76432f406eaef7f3_720w.jpg?source=d16d100b)![img](https://pic2.zhimg.com/80/v2-92c88c027800a53e76432f406eaef7f3_720w.jpg?source=d16d100b)



### 4、基于页面的路由系统 - 页面跳转

Link 组件默认使用 JavaScript 进行页面跳转. 即 SPA 形式的跳转. 如果浏览器中 JavaScript 被禁用. 则使用链接跳转. Link 组件中不应添加除 href 属性以外的属性, 其余属性添加到a标签上. Link 组件通过预取(在生产中)功能自动优化应用程序以获得最佳性能.

```js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      Index page works
      <Link href="/list"><a>jump to list page</a></Link>
    </div>
  )
}
```

### 5、next 应用中的静态资源访问

应用程序根目录中的 public 文件夹用于提供静态资源. 

通过以下形式进行访问. public/images/1.jpg -> /images/1.jpg public/css/base.css -> /css/base.css

### 6、修改页面中的数据

通过 Head 组件修改元数据

```js
import Head from 'next/head';

<>
<Head>
  <title>Index Page</title>
</Head>
<>
```

### 7、next 应用中添加样式的方式

CSS 样式

内置 styled-jsx

在 Next.js 中内置了 styled-jsx, 它是一个 CSS-in-JS 库, 允许在 React 组件中编写 CSS, CSS 仅作用于组件内部. 

```js
<Link href="/list">
  <a className="demo">jump to List page</a>
<List>
<style jsx>{
  `
  .demo{
    color: red;
  }
  `
}
</style>
```

使用 css 模块

通过使用 CSS 模块功能, 允许将组件的 CSS 样式编写在单独的 CSS 文件中. CSS 模块约定样式文件的名称必须为"组件文件名称.module.css"

```js
.p{
  color: green
}

import styles from './index/module.css';

<div className={styles.p}></div>
```

3 全局样式文件

1. 在 pages 文件夹中新建 _app.js 文件并加入如下代码
2. 在项目根目录下创建 styles 文件夹, 并在其中创建 global.css
3. 在 _app.js 中通过 import 引入 global.css.
4. 重新启动开发服务器

```js
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

### 8、预渲染介绍

预渲染概述

预渲染是指数据和HTML的拼接在服务器端提前完成.  预渲染可以使 SEO 更加友好. 预渲染会带来更好的用户体验, 可以无需运行 JavaScript 即可查看应用程序UI.

预渲染的两种形式

在 Next.js 中支持两种形式的预渲染: 静态生成和服务器端渲染. 静态生成和服务器端渲染是生成 HTML 的时机不同. 静态生成: 静态生成是在构建时生成 HTML. 以后的每个请求都共用构建时生成好的 HTML. 服务器端渲染: 服务器端渲染是在请求时生成 HTML. 每个请求都会重新生成 HTML.

两种预渲染方式的选择

Next.js 允许开发者为每个页面选择不同的预渲染方式. 不同的预渲染方式拥有不同的特点. 应根据场景进行渲染.  但建议大多数页面建议使用静态生成. 静态生成一次构建, 反复使用, 访问速度快. 因为页面都是事先生成好的.

适用场景：营销页面、博客文章、电子商务产品列表、帮助和文档

服务器端渲染访问速度不如静态生成快, 但是由于每次请求都会重新渲染, 所以适用数据频繁更新的页面或页面内容随请求变化而变化的页面.

### 9、实现静态生成

无数据和有数据的静态生成

如果组件不需要在其他地方获取数据, 直接进行静态生成. 如果组件需要在其他地方获取数据, 在构建时 Next.js 会预先获取组件需要的数据, 然后再对组件进行静态生成.

静态生成 getStaticProps

getStaticProps 方法的作用是获取组件静态生成需要的数据. 并通过 props 的方式将数据传递给组件. 该方法是一个异步函数, 需要在组件内部进行导出. 在开发模式下, getStaticProps 改为在每个请求上运行.

```js
export const function getStaticProps() {
  const data = ...
  return {
    props: ...
  }
}


import Head from 'next/head';
import styles from './list.module.css';
import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const read = promisify(readFile);

export default function List ({data}) {
  return <>
    <Head>
      <title>List Page</title>
    </Head>
    <div className={styles.demo}> {data} </div>
  </>
}

export async function getStaticProps () {
 let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8');
 console.log(data)
 return {
   props: {
     data
   }
 }
}
```

### 10、实现服务器端渲染

服务器端渲染 getServerSideProps 如果采用服务器端渲染, 需要在组件中导出 getServerSideProps 方法.

```js
export async function getServerSideProps(context) {
  // context 中会包含特定的请求参数
  return {
    props: {

    }
  }
}

export async function getServerSideProps () {
  let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8');
  console.log(data)
  return {
    props: {
      data
    }
  }
}
```

### 11、实现基于动态路由的静态生成

基于动态路由的静态生成

基于参数为页面组件生成HTML页面，有多少参数就生成多少HTML页面 在构建应用时, 先获取用户可以访问的所有路由参数, 再根据路由参数获取具体数据, 然后根据数据生成静态 HTML.

实现基于动态路由的静态生成

1. 创建基于动态路由的页面组件文件, 命名时在文件名称外面加上[], 比如[id].js
2. 导出异步函数 getStaticPaths, 用于获取所有用户可以访问的路由参数

```js
export async function getStaticProps () {
  // 此处获取所有用户可以访问的路由参数
  return {
    // 返回固定格式的路由参数
    path: [{params: {id: 1}}, {params: {id: 2}}],
    // 当用户访问的路由参数没有在当前函数中返回时，是否显示404页面 false： 显示 true 不显示
    fallback: false
  }
}
```

1. 导出异步函数 getStaticProps, 用于根据路由参数获取具体的数据

注: getStaticPaths 和 getStaticProps 只运行在服务器端, 永远不会运行在客户端, 甚至不会被打包到客户端 JavaScript 中, 意味着这里可以随意写服务器端代码, 比如查询数据库.

```js
export default function Post ({data}) {
  return <div>
    <span>{data.id}</span>
    <span>{data.title}</span>
  </div>
}
```

### 12、fallback 选项作用

// 当用户访问的路由参数没有在当前函数中返回时，是否显示404页面 false： 显示 true 不显示

\```js  import { useRouter } from 'next/router';

export default function Post ({data}) {   const router = useRouter()   if (router.isFallback) return 

Loading

   return 

 {data.id} {data.title} 

 }



// 返回用户可以访问到的所有路由参数 export async function getStaticPaths () {   return {     paths: [{params: {id: '1'}}, {params:{id: '2'}}],     fallback: true   } }

// 返回路由参数所对于的具体数据 export async function getStaticProps ({params}) {   const id = params.id;   let data;   switch (id) {     case 1:       data = {id: 1, title: 'hello'};       break;     case 2:       data = {id: 2, title: 'word'};       break;     case 3:       data = {id: 3, title: 'hello word'};       break;     default:        data = {}   }   return {     props: {       data     }   } }  ```

### 13、自定义 404 页面

要创建自定义 404 页面, 需要在 pages 文件夹中创建 404.js 文件.

```js
export default function Cusrom404 () {
  return <h1> 404 - Page Not Found></h1>
}
```

### 14、API Routes

什么是 API Routes

API Routes 可以理解为接口, 客户端向服务器端发送请求获取数据的接口. Next.js 应用允许 React 开发者编写服务器端代码创建数据接口.

如何实现API Routes

1. 在 pages/api 文件夹中创建 API Routes 文件. 比如 user.js
2. 在文件中默认导出请求处理函数, 函数有两个参数, req 为请求对象, res 为响应对象.

```js
export default function (req, res) {
  res.status(200).send({id: 1, name: 'Tom'})
}
```

当前API Routes 可以接收任何 http 方法

1. 访问 API Routes： localhost:3000/api/user 不要在 getStaticPaths 或 getStaticProps 函数中访问 API Routes, 因为这两个函数就是在服务器端运行的,  可以直接写服务器端代码.

### 1、Next 整体介绍

Next.js 是 React 服务端渲染应用框架. 用于构建 SEO 友好的 SPA 应用.

1. 支持两种预渲染方式, 静态生成和服务器端渲染. 
2. 基于页面的路由系统, 路由零配置
3. 自动代码拆分. 优化页面加载速度.
4. 支持静态导出, 可将应用导出为静态网站.
5. 内置 CSS-in-JS 库 styled-jsx
6. 方案成熟, 可用于生产环境, 世界许多公司都在使用
7. 应用部署简单, 拥有专属部署环境 Vercel, 也可以部署在其他环境.

### 2、创建next 项目

```js
创建: npm init next-app next-guide
运行: npm run dev
访问: localhost:3000
```

临时安装 create-next-app 用于创建 Next.js 项目.



![img](https://pic3.zhimg.com/v2-5c00892cb5f82cd44c911f5ad50a7e19_720w.jpg?source=d16d100b)![img](https://pic3.zhimg.com/80/v2-5c00892cb5f82cd44c911f5ad50a7e19_720w.jpg?source=d16d100b)



### 3、基于页面的路由系统

创建页面

在 Next.js 中, 页面是被放置在 pages 文件夹中的 React 组件.  组件需要被默认导出. 组件文件中不需要引入 React. 页面地址与文件地址是对应的关系.

```js
export default function List () {
  return <div> List page works </div>
}
// pages/index.js /
// pages/list.js  /list
// pages/post/first.js  /post/first
```



![img](https://pic1.zhimg.com/v2-92c88c027800a53e76432f406eaef7f3_720w.jpg?source=d16d100b)![img](https://pic1.zhimg.com/80/v2-92c88c027800a53e76432f406eaef7f3_720w.jpg?source=d16d100b)



### 4、基于页面的路由系统 - 页面跳转

Link 组件默认使用 JavaScript 进行页面跳转. 即 SPA 形式的跳转. 如果浏览器中 JavaScript 被禁用. 则使用链接跳转. Link 组件中不应添加除 href 属性以外的属性, 其余属性添加到a标签上. Link 组件通过预取(在生产中)功能自动优化应用程序以获得最佳性能.

```js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      Index page works
      <Link href="/list"><a>jump to list page</a></Link>
    </div>
  )
}
```

### 5、next 应用中的静态资源访问

应用程序根目录中的 public 文件夹用于提供静态资源. 

通过以下形式进行访问. public/images/1.jpg -> /images/1.jpg public/css/base.css -> /css/base.css

### 6、修改页面中的数据

通过 Head 组件修改元数据

```js
import Head from 'next/head';

<>
<Head>
  <title>Index Page</title>
</Head>
<>
```

### 7、next 应用中添加样式的方式

CSS 样式

内置 styled-jsx

在 Next.js 中内置了 styled-jsx, 它是一个 CSS-in-JS 库, 允许在 React 组件中编写 CSS, CSS 仅作用于组件内部. 

```js
<Link href="/list">
  <a className="demo">jump to List page</a>
<List>
<style jsx>{
  `
  .demo{
    color: red;
  }
  `
}
</style>
```

使用 css 模块

通过使用 CSS 模块功能, 允许将组件的 CSS 样式编写在单独的 CSS 文件中. CSS 模块约定样式文件的名称必须为"组件文件名称.module.css"

```js
.p{
  color: green
}

import styles from './index/module.css';

<div className={styles.p}></div>
```

3 全局样式文件

1. 在 pages 文件夹中新建 _app.js 文件并加入如下代码
2. 在项目根目录下创建 styles 文件夹, 并在其中创建 global.css
3. 在 _app.js 中通过 import 引入 global.css.
4. 重新启动开发服务器

```js
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

### 8、预渲染介绍

预渲染概述

预渲染是指数据和HTML的拼接在服务器端提前完成.  预渲染可以使 SEO 更加友好. 预渲染会带来更好的用户体验, 可以无需运行 JavaScript 即可查看应用程序UI.

预渲染的两种形式

在 Next.js 中支持两种形式的预渲染: 静态生成和服务器端渲染. 静态生成和服务器端渲染是生成 HTML 的时机不同. 静态生成: 静态生成是在构建时生成 HTML. 以后的每个请求都共用构建时生成好的 HTML. 服务器端渲染: 服务器端渲染是在请求时生成 HTML. 每个请求都会重新生成 HTML.

两种预渲染方式的选择

Next.js 允许开发者为每个页面选择不同的预渲染方式. 不同的预渲染方式拥有不同的特点. 应根据场景进行渲染.  但建议大多数页面建议使用静态生成. 静态生成一次构建, 反复使用, 访问速度快. 因为页面都是事先生成好的.

适用场景：营销页面、博客文章、电子商务产品列表、帮助和文档

服务器端渲染访问速度不如静态生成快, 但是由于每次请求都会重新渲染, 所以适用数据频繁更新的页面或页面内容随请求变化而变化的页面.

### 9、实现静态生成

无数据和有数据的静态生成

如果组件不需要在其他地方获取数据, 直接进行静态生成. 如果组件需要在其他地方获取数据, 在构建时 Next.js 会预先获取组件需要的数据, 然后再对组件进行静态生成.

静态生成 getStaticProps

getStaticProps 方法的作用是获取组件静态生成需要的数据. 并通过 props 的方式将数据传递给组件. 该方法是一个异步函数, 需要在组件内部进行导出. 在开发模式下, getStaticProps 改为在每个请求上运行.

```js
export const function getStaticProps() {
  const data = ...
  return {
    props: ...
  }
}


import Head from 'next/head';
import styles from './list.module.css';
import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const read = promisify(readFile);

export default function List ({data}) {
  return <>
    <Head>
      <title>List Page</title>
    </Head>
    <div className={styles.demo}> {data} </div>
  </>
}

export async function getStaticProps () {
 let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8');
 console.log(data)
 return {
   props: {
     data
   }
 }
}
```

### 10、实现服务器端渲染

服务器端渲染 getServerSideProps 如果采用服务器端渲染, 需要在组件中导出 getServerSideProps 方法.

```js
export async function getServerSideProps(context) {
  // context 中会包含特定的请求参数
  return {
    props: {

    }
  }
}

export async function getServerSideProps () {
  let data = await read(join(process.cwd(), 'pages', '_app.js'), 'utf-8');
  console.log(data)
  return {
    props: {
      data
    }
  }
}
```

### 11、实现基于动态路由的静态生成

基于动态路由的静态生成

基于参数为页面组件生成HTML页面，有多少参数就生成多少HTML页面 在构建应用时, 先获取用户可以访问的所有路由参数, 再根据路由参数获取具体数据, 然后根据数据生成静态 HTML.

实现基于动态路由的静态生成

1. 创建基于动态路由的页面组件文件, 命名时在文件名称外面加上[], 比如[id].js
2. 导出异步函数 getStaticPaths, 用于获取所有用户可以访问的路由参数

```js
export async function getStaticProps () {
  // 此处获取所有用户可以访问的路由参数
  return {
    // 返回固定格式的路由参数
    path: [{params: {id: 1}}, {params: {id: 2}}],
    // 当用户访问的路由参数没有在当前函数中返回时，是否显示404页面 false： 显示 true 不显示
    fallback: false
  }
}
```

1. 导出异步函数 getStaticProps, 用于根据路由参数获取具体的数据

注: getStaticPaths 和 getStaticProps 只运行在服务器端, 永远不会运行在客户端, 甚至不会被打包到客户端 JavaScript 中, 意味着这里可以随意写服务器端代码, 比如查询数据库.

```js
export default function Post ({data}) {
  return <div>
    <span>{data.id}</span>
    <span>{data.title}</span>
  </div>
}
```

### 12、fallback 选项作用

// 当用户访问的路由参数没有在当前函数中返回时，是否显示404页面 false： 显示 true 不显示

\```js  import { useRouter } from 'next/router';

export default function Post ({data}) {   const router = useRouter()   if (router.isFallback) return 

Loading

   return 

 {data.id} {data.title} 

 }



// 返回用户可以访问到的所有路由参数 export async function getStaticPaths () {   return {     paths: [{params: {id: '1'}}, {params:{id: '2'}}],     fallback: true   } }

// 返回路由参数所对于的具体数据 export async function getStaticProps ({params}) {   const id = params.id;   let data;   switch (id) {     case 1:       data = {id: 1, title: 'hello'};       break;     case 2:       data = {id: 2, title: 'word'};       break;     case 3:       data = {id: 3, title: 'hello word'};       break;     default:        data = {}   }   return {     props: {       data     }   } }  ```

### 13、自定义 404 页面

要创建自定义 404 页面, 需要在 pages 文件夹中创建 404.js 文件.

```js
export default function Cusrom404 () {
  return <h1> 404 - Page Not Found></h1>
}
```

### 14、API Routes

什么是 API Routes

API Routes 可以理解为接口, 客户端向服务器端发送请求获取数据的接口. Next.js 应用允许 React 开发者编写服务器端代码创建数据接口.

如何实现API Routes

1. 在 pages/api 文件夹中创建 API Routes 文件. 比如 user.js
2. 在文件中默认导出请求处理函数, 函数有两个参数, req 为请求对象, res 为响应对象.

```js
export default function (req, res) {
  res.status(200).send({id: 1, name: 'Tom'})
}
```

当前API Routes 可以接收任何 http 方法

1. 访问 API Routes： localhost:3000/api/user 不要在 getStaticPaths 或 getStaticProps 函数中访问 API Routes, 因为这两个函数就是在服务器端运行的,  可以直接写服务器端代码.

### Next 案例实现

### 案例初始化配置

```js
// .babelrc
{
  "presets": ["next/babel", "@emotion/babel-preset-css-prop"]
}
```

### 1. 创建项目

```text
npm init next-app movie
cd movie
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm install react-icons
npm install @emotion/babel-preset-css-prop -D
npm install @babel/core
npm run dev
```

访问: localhost:3000

pages/_app.js

```js
// import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
```

### 实现头部组件布局

```js
import { Box, Container, Button, Image } from "@chakra-ui/react";
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import { FaSignInAlt, FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const logo = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
`

const SignInAndJoin = styled.div`
  height: 52px;
  line-height: 52px;
  border-left: 1px solid #393939;
  border-right: 1px solid #393939;
  padding: 0 6px;
  float: left;
  color: white;
  & > button {
    padding: 0 10px;
  }
  & > button:nth-of-type(1):after {
    content: '';
    width: 1px;
    height: 10px;
    background: #fff;
    position: absolute;
    right: 0;
    top: 15px;
  }
`

const Search = styled.a`
  float: right;
  height: 52px;
  border-left: 1px solid #393939;
  border-right: 1px solid #393939;
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
`

export default function Header () {
  return <Box h="52px" bg="#202020" borderBottom="1px solid #393939">
    <Container h="52px" maxW="1200px" position="relative">
      <SignInAndJoin>
        <Button bg="transparent" leftIcon={<FaSignInAlt/>}>登录</Button>
        <Button bg="transparent" leftIcon={<BsFillPersonFill/>}>注册</Button>
      </SignInAndJoin>
      <Image css={logo} src="/images/logo.png"/>
      <Search>
        <FaSearch/>
      </Search>
    </Container>
  </Box>
}
```

### 2、实现导航组件布局

```js
import { Box, HStack } from "@chakra-ui/react";
import Link from "next/link";

export default function Navigation () {
  return (
    <Box h="52px" bg="#202020" color="#fff">
      <HStack space={3} justifyContent="center" alignItems="center" h="52px">
        <Link href="/"><a>影片</a></Link>
        <Link href="/"><a>漫画</a></Link>
        <Link href="/"><a>电影</a></Link>
        <Link href="/"><a>电视</a></Link>
        <Link href="/"><a>新闻</a></Link>
      </HStack>
    </Box>
  )
}
```

### 实现轮播组件

```js
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import Head from 'next/head';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const CarouselItem = styled.div`
  position: relative;
  & > div {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    color: white;
    padding-top: 180px;
    text-align: left;
    width: 100%;
    max-width: 1200px;
    & > p {
      margin: 10px 0;
      font-size: 14px;
      width: 450px;
    }
  }
  & > img {
    filter: brightness(50%)
  }
`

const swiperContainer = css`
  position: relative;
  & > .carousel:last-child {
    position: absolute;
    left: 0;
    bottom: 0;
    & > .thumbs-wrapper > .thumbs {
      display: flex;
      justify-content: center;
    }
  }
`

export default function Swiper ({data}) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/carousel.min.css" />
      </Head>
      <Carousel
        css={swiperContainer}
        showArrows={false}
        showIndicators={false}
        showStatus={false}>
          <CarouselItem>
            <img src='/images/1.jpg' />
            <Box>
              <Heading as="h2" size="lg">
                22
              </Heading>
              <Text>
               3233
              </Text>
              <Button colorScheme="red">
                按钮
              </Button>
            </Box>
          </CarouselItem>
          <CarouselItem>
            <img src='/images/2.jpg' />
            <Box>
              <Heading as="h2" size="lg">
                22
              </Heading>
              <Text>
               3233
              </Text>
              <Button colorScheme="red">
                按钮
              </Button>
            </Box>
          </CarouselItem>
          <CarouselItem>
            <img src='/images/3.jpg' />
            <Box>
              <Heading as="h2" size="lg">
                22
              </Heading>
              <Text>
               3233
              </Text>
              <Button colorScheme="red">
                按钮
              </Button>
            </Box>
          </CarouselItem>
      </Carousel>
    </>
  )
}
```

### 电影列表布局

```js
import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { MdMovie } from "react-icons/md";
import axios from 'axios'

export default function Movie () {
  return (
    <Box maxW="1200px" mx="auto" mt="20px">
      <HStack fontSize="24px">
        <MdMovie/>
        <Heading as="h3" fontSize="24px">电影</Heading>
      </HStack>
      <HStack mt="20px" space={3}>
        <Box w="290px">
          <Image src='/images/item_1.jpg'/>
          <Text mt="10px">6666666</Text>
        </Box>
        <Box w="290px">
          <Image src='/images/item_1.jpg'/>
          <Text mt="10px">6666666</Text>
        </Box>
      </HStack>
    </Box>
  )
}
```

### 电影详细页面

```js
// Layout.js
import React from 'react'
import Header from './Header'
import Navigation from './Navigation'

export default function Layout ({children}) {
  return <>
    <Header />
    <Navigation />
    {children}
  </>
}

// index.js
import Layout from '../components/Layout'
import Swiper from '../components/Swiper';
import Movie from '../components/Movie';
export default function Home() {
  return (
    <div>
      <Layout />
      <Swiper />
      <Movie />
    </div>
  )
}

// detail/[id].js
import { Box, Divider, Heading, Text} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { css } from "@emotion/react"
const DetailContainer = css`
  padding: 10px 0;
  & > p {
    font-size: 14px;
    margin-bottom: 10px;
  }
  & > img {
    margin-bottom: 10px;
    display: block;
  }
`

export default function Detail ({detail}) {
  return <Layout>
    <Box maxW="1200px" mx="auto" mt="70px">
      <Heading as="h2" size="xl">
      4 月刷题打卡继续
      </Heading>
      <Heading as="h4" size="lg" color="gray.500" fontWeight="light" mt="10px">
        3 月春招闯关活动已经落幕，4 月咱们继续刷题打卡，做好准备迎接 Offer，更有大奖拿
      </Heading>
      <Divider mt="10px" />
      <Box overflow="hidden" mt="10px">
        <Text float="left">作者: 大白菜</Text>
        <Text float="right">发布时间: 2020-4-10</Text>
      </Box>
      <Divider mt="10px" />
      {/* <Box css={DetailContainer} dangerouslySetInnerHTML={{ __html: detail.content }}>
      </Box> */}
    </Box>
  </Layout>
}
```

### 轮播组件动态数据

```js
// axiosConfig.js
export const baseURL = 'http://localhost:3005'

// pages/index.js
import Layout from '../components/Layout'
import Swiper, {loadSwiper} from '../components/Swiper'
import Movie from '../components/Movie'

export default function Home({swiper, movie}) {
  return (
    <Layout>
      <Swiper data={swiper}/>
      <Movie />
    </Layout>
  )
}

export async function getStaticProps () {
  // 获取轮播图数据
  let { data: swiper } = await loadSwiper()
  // 获取电影列表数据
  let { data: movie } = await loadMovie()
  return {
    props: {
      swiper,
      movie
    }
  }
}


// movie.js

import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { MdMovie } from "react-icons/md";
import axios from 'axios'
import {baseURL} from '../axiosConfig'

export default function Movie ({data, title}) {
  return (
    <Box maxW="1200px" mx="auto" mt="20px">
      <HStack fontSize="24px">
        <MdMovie/>
        <Heading as="h3" fontSize="24px">{title}</Heading>
      </HStack>
      <HStack mt="20px" space={3}>
      {
        data.map(movie => (
          <Box w="290px">
            <Image src={movie.url}/>
            <Text mt="10px">{movie.title}</Text>
          </Box>
        ))
      }
      </HStack>
    </Box>
  )
}

export function loadMovie () {
  return axios.get('/api/movie', {baseURL})
}
```

### 实现详情页基于动态路由生成

```js
<Button colorScheme="red">
    <Link href="/detail/[id]" as={`/detail/${swiper.vid}`}><a>
      CHECK DETAIL
    </a></Link>
  </Button>

  // [id].js

  // 获取到用户能够访问到的所有的路由参数
export async function getStaticPaths () {
  // ["1", "2"]
  const {data} = await axios.get('/api/videos', { baseURL })
  // [{params: {id: "1"}}]
  let paths = data.map(id => ({params: {id}}))
  return {
    paths,
    fallback: false, // 当用户传递一个不在范围内的 id 时，就展示一个 404 页面
  }
}

// 根据参数获取其对应的数据
export async function getStaticProps ({params}) {
  let id = params.id
  let {data: detail} = await axios.get(`/api/detail?id=${id}`, {baseURL})
  return {
    props: {
      detail
    }
  }
}
```

### 导出静态网站

```js
"scripts": {,
    "export": "next build && next export"
  },
```

### 5. 自定义 next 服务

package.json

```json
"mydev": "nodemon server/index.js",
```

server/index.js

```js
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const app = next({dev})

const handler = app.getRequestHandler()

// prepare 方法是准备一下 next 应用
app.prepare().then(() => {
  const server = express()

  server.get('/hello', (req, res) => {
     res.send('Hello Next.js')
  })

  server.get('*', (req, res) => {
    handler(req, res)
  })

  server.listen(3000, () => console.log('服务器启动成功，请访问: http://localhost:3000'))
})
```

### 6. 部署到 Vercel

我先将数据服务部署到了我的服务器，地址是 [http://yangjiaxin.cc:3000](http://link.zhihu.com/?target=http%3A//yangjiaxin.cc%3A3000), 这个地址要配置到 axiosConfig.js 文件里，给 baseURL 变量。

然后在 GitHub 上创建一个仓库，将这个项目代码导入到 GitHub 仓库。然后登陆 [https://vercel.com/](http://link.zhihu.com/?target=https%3A//vercel.com/) 选择 GitHub 的这个仓库进行部署。

------



![img](https://pic1.zhimg.com/v2-051cec469cf07fd09a849c8ee8afe737_720w.jpg?source=d16d100b)