import {useCallback} from "react"

export const useMessage = () => {
  return useCallback((success, text) => {
    if (window.M && !success && text) window.M.toast({html: text, displayLength: 3000, inDuration: 200, classes: 'red darken-1'})
    if (window.M && success && text) window.M.toast({html: text, displayLength: 3000, inDuration: 200, classes: 'green darken-1'})
  },[])
}