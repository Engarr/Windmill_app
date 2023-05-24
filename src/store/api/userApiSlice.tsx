import apiSlice from './apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserId: builder.query<string, string | null>({
      query: (token) => ({
        url: 'feed/user',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
// eslint-disable-next-line import/prefer-default-export
export const { useGetUserIdQuery } = userApiSlice;
