import { configureStore } from '@reduxjs/toolkit'
import userApi from "../features/user/userApi";
import userSlice from "../features/user/userSlice";
import courseApi from '../features/course/courseApi';
import buyApi from '../features/buy/buyApi';

const store = configureStore({
    reducer: {
         [userApi.reducerPath]: userApi.reducer,
         [courseApi.reducerPath]:courseApi.reducer,
         [buyApi.reducerPath]: buyApi.reducer,
         user:userSlice
      },
      // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware,courseApi.middleware,buyApi.middleware),
});
// const initailizeApp = async () => {
//     await store.dispatch(
//         userApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
//     );
//   };
//   initailizeApp();
export default store;