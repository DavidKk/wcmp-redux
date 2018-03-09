# 微信小程序 redux 插件

将 Redux 状态管理连接 (connect) 到小程序的页面, 通过该插件可以在小程序中使用 redux 并实现状态管理
本人的使用情景是将所有的业务逻辑的状态分离于UI之外, 使跨平台但完全相同的业务流程不需要再写多次, 只需要配置相应的服务和接口, 就可以快速完成多平台同步开发


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
