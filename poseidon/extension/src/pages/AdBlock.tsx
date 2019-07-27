import * as React from 'react'
import { Card, List, Button } from 'antd'

import * as style from "./AdBlock.less"

import { adBlockRule, AdBlockRule } from '../constants/adBlockRule'

class AdBlock extends React.PureComponent {
  render() {
    return (
      <div className={style.adblock}>
        <Card className={style.adblockCard}>
          <h4 className={style.adblockTitle} style={{display: 'none'}}>
            网站广告黑名单
            <Button className={style.adblockCardButton}>从远端更新</Button>
          </h4>
          {adBlockRule.map((rules :AdBlockRule) => (
            <List
              bordered
              className={style.adblockDomain}
              key={rules.domain}
              header={`域名: ${rules.domain}`}
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
