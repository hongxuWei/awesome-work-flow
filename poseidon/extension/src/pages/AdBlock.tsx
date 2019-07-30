import * as React from 'react'
import { Card, List, Icon, Modal, Input, notification } from 'antd'

import * as style from "./AdBlock.less"

import { adBlockRule, AdBlockRule } from '../constants/adBlockRule'
import { storageGet, storageSet, BLACK_KAY } from './Content/AdBlock'

type IProps = {
  history: History
}

type IState = {
  adBlockRule: Array<AdBlockRule>
}

class AdBlock extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      adBlockRule: [],
    }
  }

  setRule = (adBlockRule: Array<AdBlockRule>) => {
    this.setState({ adBlockRule: [...adBlockRule] })
    storageSet(BLACK_KAY, adBlockRule)
  }

  // 添加域名
  addDomain = () => {
    const { adBlockRule } = this.state
    let domain = ''
    Modal.confirm({
      title: '添加域名',
      content: <Input onChange={e => domain = e.target.value} />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const isDuplicate = adBlockRule.find(rule => rule.domain === domain)
        if(isDuplicate) {
          notification.open({
            message: '域名重复',
            description: '请修改后重新提交',
            placement: 'bottomRight',
            icon: <Icon type="close-circle" style={{ color: '#f5222d' }} />
          })
          return
        }
        if(domain) {
          adBlockRule.push({ domain, rules: [] })
          this.setRule(adBlockRule)
        }
      }
    })
  }

  // 添加规则
  addAdBlack = (index:number) => {
    const { adBlockRule } = this.state
    const ruleList = adBlockRule[index].rules
    let inputVal = ''
    Modal.confirm({
      title: '添加规则',
      content: <Input onChange={e => inputVal = e.target.value} />,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const isDuplicate = ruleList.find(item => item === inputVal)
        if(isDuplicate) {
          notification.open({ message: '规则重复' })
          return
        }
        if(inputVal) {
          ruleList.push(inputVal)
          this.setRule(adBlockRule)
        }
      }
    })
  }

  // 删除规则
  removeAdBlack = (index:number, ruleIndex:number) => {
    const { adBlockRule } = this.state
    const ruleList = adBlockRule[index].rules
    ruleList.splice(ruleIndex, 1)
    if (ruleList.length === 0) {
      adBlockRule.splice(index)
    }
    this.setRule(adBlockRule)
  }

  componentDidMount() {
    storageGet(BLACK_KAY, []).then((rules:Array<AdBlockRule>) => {
      if (rules.length === 0) {
        this.setRule(adBlockRule)
        return
      }
      this.setState({ adBlockRule: rules })
    })
  }

  render() {
    const { adBlockRule } = this.state
    return (
      <div className={style.adblock}>
        <Card className={style.adblockCard}>
          <h4 className={style.adblockTitle}>
            <span onClick={this.addDomain}>网站广告黑名单</span>
          </h4>
          {adBlockRule.map((rules :AdBlockRule, index) => (
            <List
              bordered
              className={style.adblockDomain}
              key={rules.domain}
              header={
                <div className={style.listHeader}>
                  域名: {rules.domain}
                  <Icon className={style.icon} type="plus" onClick={() => this.addAdBlack(index)}/>
                </div>
              }
              dataSource={rules.rules}
              renderItem={(rule, ruleIndex) => (
                <List.Item>
                  <div className={style.adList}>
                    {rule}
                    <Icon className={style.icon}
                      type="close"
                      onClick={() => this.removeAdBlack(index, ruleIndex)}/>
                  </div>
                </List.Item>
              )}
            />
          ))}
        </Card>
      </div>
    )
  }
}

export default AdBlock
