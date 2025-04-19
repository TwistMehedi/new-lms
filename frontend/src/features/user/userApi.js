import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { login } from './userSlice';

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/user/' ,credentials:"include"}),
    endpoints: (builder) => ({
        registerUser:builder.mutation({
            query: (userData) => ({
                url: 'register-user',
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: userData,
            }),
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: 'login-user', 
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: userData,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; 
                    dispatch(login({ user: data.user }));
                } catch (error) {
                    console.error("Login failed:", error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: 'get-user',
                method: 'GET',
            }),
        }),
        updateUser: builder.mutation({
            query: (userData) => {
                const formData = new FormData();
                if (userData.name) formData.append('name', userData.name);
                if (userData.image) formData.append('image', userData.image); // Ensure correct file upload
                
                return {
                    url: 'update-user', 
                    method: 'PUT',
                    body: formData,
                };
            },
        }),
        logOutUser: builder.mutation({
            query:()=>({
                url: "logout-user",
                method:"GET"
            })
        })
   })
});
export const {useRegisterUserMutation,useLoginUserMutation,useLoadUserQuery,useUpdateUserMutation,useLogOutUserMutation} = userApi;
export default userApi;
