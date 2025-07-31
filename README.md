![样式](./image.png)

# 日历组件

- 内部用的 flex 布局,只要改变容器大小,内容就会自动适应
- 使用了 createContext 创建 context 来保存 locale 配置,通过 Provider 修改其中的
  值,实现中英文切换
- 同时用 ahooks 的 useControllableValue 实现受控和非受控模式
