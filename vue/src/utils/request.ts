function showError() {

}

// 统一对返回结果做处理
const checkCode = (data: any) => {
  if (data.code === 401) {
    // return window.myBus.emit('login')
  }
  if (data.code >= 200 && data.code < 300) {
    return data
  }
  if (data.message || data.msg) {
    // const msg = data.message || data.msg
    if (data.code !== 498) {
      showError()
    }
  }
  return Promise.reject(data)
}

export {
  checkCode,
}
