import { bind } from "lodash";
import { getUserFromStorage } from "../utils/cookie";
import { LOGIN_MODAL } from "../constants/showKey";
import * as ShowAction from "../actions/show";
import store from "../store/configure-store";

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
export const requireLogin = (
  target,
  key: string,
  descriptor: TypedPropertyDescriptor<Function>
): any => {
  return {
    configurable: true,
    get() {
      let user = store.getState().session.toJS().user;
      const method: any = descriptor.value;
      const openModalLogin = () => store.dispatch(ShowAction.show(LOGIN_MODAL));
      let boundFn = bind(method, this);
      return () => {
        return (!user && openModalLogin()) || boundFn();
      };
    },
    set() {}
  };
};
