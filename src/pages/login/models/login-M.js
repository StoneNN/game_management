import {loginService} from '@/services/api';
import {routerRedux} from 'dva/router';



export default{

    namespace:"login_m",
    state:{
       visible:false
    },

    effects:{
        *login({payload},{call,put}){
            console.log('effects:payload:  -----',payload);
            let loginData = yield call(loginService,{...payload,method:'accountLogin'});
            console.log('loginData：',loginData);
            if (loginData.success === true) {
              yield put(
                routerRedux.push({
                   pathname:'management'
                })
              )
            } else {
              console.log('===== ShowModal =====');
              yield put({type:'showModal'});
            }
        }
    },

    reducers:{
        showModal(state) {
            console.log('------- loginModel/showModal -------');
      
            console.log('-=-=-=-', { ...state });
            return { ...state, visible: true }
          },
          handleOk(state) {
            console.log('------- loginModel/handleOk -------');
            return { ...state, visible: false }
          },
          handleCancel(state) {
            console.log('------- loginModel/handleCancel -------');
            return { ...state, visible: false }
          }
    }


}