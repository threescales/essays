import {bind} from 'lodash'
import {getUserFromStorage} from '../utils/cookie'
/**
 * @param  {Function} target
 * @param  {string} key
 * @param  {Object} descriptor
 * @example 
 *   class a{
 *      @requireLogin
 *      b(){
 * 
 *      }
 *   }
 */
export const requireLogin = (target, key: string, descriptor: TypedPropertyDescriptor<Function>): any => {
  return {
    configurable: true,
    get() {
      let user = getUserFromStorage()
      const method:any = descriptor.value
      const openModalLogin = this.props.history.push('/login')
      let boundFn = bind(method, this)
      return () => { return (!user && openModalLogin()) || boundFn() }
    },
    set() {

    }
  };
}