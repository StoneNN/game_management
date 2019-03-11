
import { queryItems } from '@/services/api';

export default {
  namespace: 'sponsor',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch( {payload}, { call, put }) {
      const response = yield call(queryItems,{method:'mapData'});
      console.log(response);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *search({payload},{call,put}) {
        const response = yield call(queryItems,{...payload, method:'search'});
        console.log('------ response ------',response);
        yield put({
            type: 'save',
            payload: response,
        });
    },
    *delete({payload},{call,put}) {
        const response = yield call(queryItems,{...payload,method:'delete'});
        yield put({
            type: 'save',
            payload: response,
        });
    },
    *add({payload},{call,put}) {
      console.log(payload);
      const response = yield call(queryItems,{...payload,method:'add'});
      yield put({
          type: 'save',
          payload: response,
      });
    },
    *edit({payload},{call,put}) {
      console.log(payload);
      const response = yield call(queryItems,{...payload,method:'edit'});
      yield put({
          type: 'save',
          payload: response,
      });
    }

  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        list: payload
      };
    },
  },
};
