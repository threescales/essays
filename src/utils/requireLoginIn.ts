import {bind} from 'lodash'

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
      const method:any = descriptor.value
      const openModalLogin = () => this.props.dispatch(openModal('login',{ body: { 
        originProps: this.props,
        originMethodName: key
      }}))
      let boundFn = bind(method, this)
      return () => { return (!this.props.currentUser && openModalLogin()) || boundFn() }
    },
    set() {

    }
  };
}