# react-multi-pages
react webpack 配置多入口，多页面


## 项目结构
>
* index.html ：显示页面
* release.html ：模版页面，和index.html一致只是去掉加载js文件，用于编译时候的生成编译html
* test.html ：模版页面，和index.html一致只是去掉加载入口js文件，用于编译测试时候的生成编译html
>
### assets : 项目的资源文件
* images ：图片文件
>
### test : 测试json文件 已经调试工具
>

### doc : document.js URL和接口协议说明文档
>

### src : 是前端源代码根目录
* components ：react 组件源码
* config ： 数据请求api配置
* constants ： 常量配置
* lib ： 类库
* styles ： 样式
* router ： 路由配置入口
* utils ： 辅助类工具
* pages ： 页面容器
* index.jsx ：主入口
>
### dist : 压缩，合并后的代码，发布到生产环境中的代码；运行 npm run build 命令会自动生成，无需手动更改此文件夹。

>
### node_modules : 存放node.js依赖包(工具相关)，通过在 package.json 中配置依赖，运行 npm install 自动下载相应包，无需手动更改此文件夹。



## 文件说明
>
* package.json ：node 模块的配置文件， 通常用来 配置 node.js依赖包，所有有node.js插件依赖在此文件配置。[详细说明](https://docs.npmjs.com/files/package.json)
* .babelrc ：如何使用babel的转换配置和热加载配置，
* webpack.config.js  ：webpack 开发和发布环境配置。通过env参数的develop 和 release来区分[详细说明](http://webpack.github.io/docs/configuration.html)



## 使用说明
>
### 第一次使用操作
1. 安装 node.js。（由于前端的一些工具是构建在node.js 之上，请确保 已经安装了node.js 和 npm。没有可以去 <http://nodejs.org/download/> 下载）
2. 安装 webpack、webpack-dev-server工具。运行命令：npm i webpack webpack-dev-server -g 
3. 安装 npm相关的包。运行命令：npm install
4. 至此，我们所有的工具、及 包都安装成功，以后不需要进行第1、2步了。可以运行下面相应的命令。

>
### 常用操作及其命令
* 安装npm相应包 : npm install , npm install --save name , npm i(install) -S(--save) name ,  npm i -D (--save-dev) name 
* 编译发布项目 : npm run build
* 开发项目 : npm start
* 编译测试项目 : npm run test




