# 微信小程序 redux 插件

将 Redux 状态管理连接 (connect) 到小程序的页面, 通过该插件可以在小程序中使用 redux 并实现状态管理


## 使用

Actions 与 Reducers 可以按 redux 常规使用方式去使用, 以下是核心部分

```
import { combineReducers } from 'redux'
import { Provider, connect } from 'wcmp-redux'

# store
export defualt const store = combineReducers({ ... })

# App.js
App(Provider(store)({ /* app config */ }))

# 若有额外库支持装饰器, 可使用 class 生成App也可以使用
@WXApp
@Provider(store)
class App {...}

```
