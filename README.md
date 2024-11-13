# react-keep-alive

react-keep-alive 组件库，可用于简单项目缓存路由，即跳转路由时不卸载路由组件，跳转回来时保持跳转前的状态。

## 使用要求

需使用[react-router@6](https://reactrouter.com)，且你的路由组件基于同一个根组件或layout组件。

## 安装

```bash
pnpm add react-keep-alive
```

## 使用

使用 KeepAlive 包裹根组件，needKeepAlivePaths即需要缓存的路由。

```jsx
export default function AppWithKeepAlive() {
  return (
    <KeepAlive needKeepAlivePaths={['/list1']}>
      <App />
    </KeepAlive>
  );
}
```

使用 useKeepAliveOutlet 代替 Outlet。

```jsx
export default function App() {
  const keepAliveOutlet = useKeepAliveOutlet();
  return (
    ...
    {keepAliveOutlet}
  )
}
```
在被缓存的组件中使用`useKeepAliveTargetPaths(['targetPath'])`，这样可以仅在跳转至目标路由时才缓存，跳转其他路由时正常卸载。例如从列表跳转至详情时，在列表组件中使用`useKeepAliveTargetPaths`。

`useOnBack`可在跳转回缓存的路由时执行某些操作，例如刷新列表。
```jsx
export default function List(){
  useOnBack(()=>{
    // do something
  })
  return (...)
}
```
