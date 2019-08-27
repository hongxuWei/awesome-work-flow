import * as React from 'react'
import { Card } from 'antd'
import { POPUPLIST, PopItem } from '../constants/config'
import { Link } from 'react-router-dom'

import * as style from "./Popup.less"

class Popup extends React.PureComponent {
  render() {
    return (
      <Card style={{ border: 'none' }}>
        <div className={style.popup}>
          {
            POPUPLIST.map((toolBlock: PopItem) => (
              <section key={toolBlock.title}>
                <h4 className={style.popupTitle}>{toolBlock.title}</h4>
                <div className={style.popupIcons}>
                  {
                    toolBlock.tools.map(tool => (
                      <Link key={tool.name} className={style.popupIconsItem} to={tool.href} target="_blank">
                        <div className={`${style.popupIconsItemIcon}`} style={{backgroundImage: `url(${tool.icon})`}}></div>
                        <p className={style.popupIconsItemText}>{tool.name}</p>
                      </Link>
                    ))
                  }
                </div>
              </section>
            ))
          }
        </div>
      </Card>
    )
  }
}

export default Popup
