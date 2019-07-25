import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'


type Props = {
  readonly text: string,
}

export default function Test ({text, history}: Props & RouteComponentProps<{}>) {
  React.useEffect(() => {
    console.log(history)
  })
  return (
    <section>
      {text}
    </section>
  )
}
