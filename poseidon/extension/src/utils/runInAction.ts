import { action } from 'mobx'

export const runInAction = (fn: Function):void => action(fn)()
