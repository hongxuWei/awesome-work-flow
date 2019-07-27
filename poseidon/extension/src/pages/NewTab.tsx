import * as React from 'react'
import { Card } from 'antd'

import newTab from '../constants/newTab'
import * as style from "./NewTab.less"

class NewTab extends React.PureComponent {
  render() {
    return (
      <Card id={style.commonWeb}>
        {
          newTab.map(list => (
            <section key={list.title} className={style.commonWebModal}>
              <h4 className={style.commonWebTitle}>{list.title}</h4>
              <div className={style.commonWebRow}>
                {
                  // 单个 icon
                  list.item.map(listItem => (
                    <a key={listItem.href} className={style.commonWebItem} href={listItem.href}>
                      <div className={`${style.commonWebItemIcon} ${listItem.bgClass}`}></div>
                      <p className={style.commonWebText}>{listItem.name}</p>
                    </a>
                  ))
                }
              </div>
            </section>
          ))
        }
        
      </Card>
    )
  }
}

export default NewTab
