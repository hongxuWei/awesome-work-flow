
// mock datas
const mocks = {
  ...require('./popup')
}

const wrapMocksData = mocks => {
  const _mocks = {}
  // 匹配 "aa bb" || "aa /bb"
  const convertMockApiReg = /^(\S+) \/?(\S+)$/

  const apiKeys = Object.keys(mocks)
  apiKeys.forEach(apiKey => {
    const data = mocks[apiKey]
    const mockApiKey = apiKey.replace(convertMockApiReg, '$1 /mock/$2')
    _mocks[mockApiKey] = {
      code: 1,
      message: '成功',
      data
    }
  })

  return _mocks
}

module.exports = wrapMocksData(mocks)
