import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const buyApi = createApi({
    reducerPath: 'buyApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/buy/",credentials: "include" }),
    endpoints: (builder) => ({
      createCheekOutQuery:builder.mutation({
        query:(courseId)=>({
            url:"cheekout-session",
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:{courseId}
        })
     }),

    })
  })
  
  
  export const { useCreateCheekOutQueryMutation } = buyApi;
  export default buyApi;
