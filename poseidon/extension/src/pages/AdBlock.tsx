import * as React from 'react'
import { Card, List, Button, Modal, Input, message } from 'antd'

import * as style from "./AdBlock.less"

import { adBlockRule, AdBlockRule } from './Content/AdBlock'
import { storageGet, storageSet } from '../utils/chromeStorage'

type IProps = {
  history: History
}

type IState = {
  adBlockRule: Array<AdBlockRule>,
  inputVal?: string
}

class AdBlock extends React.PureComponent<IProps, IState> {
  constructor(props:any) {
    super(props)
    this.state = {
      adBlockRule: [],
    }
  }

  componentDidMount() {
    // 初始化 black list
    storageGet('black', []).then((blacks:Array<AdBlockRule>) => {
      if(blacks.length === 0) {
        blacks = adBlockRule
        storageSet('black', adBlockRule)
      }
      this.setState({ adBlockRule: blacks })
    })
  }

  addDomain = () => new Promise((resolve, reject) => {
    const { adBlockRule, inputVal } = this.state
    if(!inputVal) {
      reject()
      return
    }

    const isDuplicate = adBlockRule.find(item => item.domain === inputVal)
    if(isDuplicate) {
      message.error('域名重复')
      reject()
    }

    adBlockRule.push({
      domain: inputVal,
      rules: []
    })
    
    storageSet('black', adBlockRule)
    resolve()
  })


  handleAddDomain = () => {
    Modal.confirm({
      title: "请输入域名",
      content: <Input onChange={e => this.setState({ inputVal: e.target.value })}/>,
      onOk: this.addDomain,
      onCancel: () => this.setState({ inputVal: undefined })
    })
  }

  render() {
    const { adBlockRule } = this.state
    return (
      <div className={style.adblock}>
        <Card className={style.adblockCard}>
          <h4 onClick={this.handleAddDomain} className={style.adblockTitle} style={{display: 'none'}}>
            网站广告黑名单
          </h4>
          {adBlockRule.map((rules :AdBlockRule) => (
            <List
              bordered
              className={style.adblockDomain}
              key={rules.domain}
              header={<div className={style.adblockDomainHeader}>{`域名: ${rules.domain}`}<Button>添加规则</Button></div>}
              dataSource={rules.rules}
              renderItem={rule => (
                <List.Item>{rule}</List.Item>
              )}
            />
          ))}
        </Card>
      </div>
    )
  }
}

export default AdBlock
