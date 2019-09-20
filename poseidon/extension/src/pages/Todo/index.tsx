import * as React from 'react'
import Slider from './Slider'
import Content from './Content'

import * as style from "./todo.less"

class TodoList extends React.PureComponent {
  render() {
    return (
      <div className={style.todo}>
        <div className={style.wrap}>
          <Slider/>
          <Content/>
        </div>
      </div>
    )
  }
}

export default TodoList