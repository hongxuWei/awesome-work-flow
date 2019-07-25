import { get } from './index'

export const getPopupData = (params = {}) => get('/popup/list/', params)
