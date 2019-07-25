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
            POPUPLIST.map((tools: PopItem) => (
              <section key={tools.title}>
                <h4 className={style.popupTitle}>{tools.title}</h4>
                <div className={style.popupIcons}>
                  <Link className={style.popupIconsItem} to={tools.toolInfo.href} target="_blank">
                    <div className={`${style.popupIconsItemIcon}`} style={{backgroundImage: `url(${tools.toolInfo.icon})`}}></div>
                    <p className={style.popupIconsItemText}>{tools.toolInfo.name}</p>
                  </Link>
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
