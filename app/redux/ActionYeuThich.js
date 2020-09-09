import { ActionTypes } from './ActionTypes'

export const ActionYeuThich = {
    set_yeu_thich: (data) => {
        return { type: ActionTypes.SET_YEU_THICH, payload: data }
    }
}