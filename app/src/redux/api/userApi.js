import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page = 1, page_size = 10 }) => ({
        url: "/accounts/api/v1/list-user",
        params: {
          page,
          page_size,
        },
      }),
      providesTags: ["Users"],
    }),

    createUser: builder.mutation({
      query: (body) => ({
        url: "/accounts/api/v1/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    editUser: builder.mutation({
      query: (body) => ({
        url: "/profiles/api/v1/profile/edit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation, useEditUserMutation } =
  userApi;
