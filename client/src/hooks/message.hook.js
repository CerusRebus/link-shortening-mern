import {useCallback} from "react"

export const useMessage = () => {
  return useCallback(text => {
    if (window.M && text) window.M.toast({html: text, displayLength: 3000, inDuration: 200, classes: 'red darken-1'})
  },[])
}