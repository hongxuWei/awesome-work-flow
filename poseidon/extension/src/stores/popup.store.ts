import { observable, action } from "mobx"
import { runInAction } from '../utils'

import * as services from '../services/Popup.service'
import { SUCCESS } from '../constants/response'

export type PopItem = {
  title: string,
  toolInfo: {
    name: string,
    href: string,
    icon: string,
  }
}

export class PopupStore {
  @observable popupList :Array<PopItem>= []

  @action
  fetchPopupList() {
    services.getPopupData().then(res => {
      if (res.code === SUCCESS) {
        runInAction(() => this.popupList = res.data)
      } else {
        runInAction(() => this.popupList = [])
      }
    })
  }
}

export default (new PopupStore())
