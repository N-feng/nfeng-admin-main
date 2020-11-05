const eventProxy = {
  /**
   * 用法见：https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
   * 注意：listener会接收到event参数，该参数的detail属性才是下面emit方法中的payload值
   */
  on(eventName: any, listener: any, props = {}) {
    window.addEventListener(eventName, listener, props)
  },
  /**
   * payload 事件数据
   * 用法见：https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
   */
  emit(eventName: any, payload: any) {
    if (!eventName) {
      throw new Error('必须要指定事件名称')
    }
    const event = new CustomEvent(eventName, { detail: payload })
    window.dispatchEvent(event)
  },
  remove(eventName: any, listener: any) {
    window.removeEventListener(eventName, listener)
  },
}

export default eventProxy
