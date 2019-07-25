import * as React from 'react'
import { Card } from 'antd'

import * as style from "./NewTab.less"

class NewTab extends React.PureComponent {
  render() {
    return (
      <Card className={style.commonWeb}>
        <section className={style.commonWebModal}>
          <h4 className={style.commonWebTitle}>常用</h4>
          <div className={style.commonWebRow}>
            <a className={style.commonWebItem} href="https://github.com/">
              <div className={`${style.commonWebItemIcon} ${style.github}`}></div>
              <p className={style.commonWebText}>GitHub</p>
            </a>
          </div>
        </section>
      </Card>
    )
  }
}

export default NewTab
