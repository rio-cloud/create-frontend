import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from '../configuration/tokenHandling/prepareHeaders';

export interface User {
    id: { name: string; value: string };
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://randomuser.me/api/', prepareHeaders }),
    endpoints: (builder) => ({
        fetchUsers: builder.query<User[], string | undefined>({
            query: () => ({
                url: '?results=10&inc=id,name,email,picture',
                responseHandler: async (response: Response) => {
                    const data = await response.json();
                    return data.results;
                },
            }),
            keepUnusedDataFor: 10,
        }),
    }),
});

// Export hooks for usage in function components which are
// auto-generated based on defined endpoints
export const { useFetchUsersQuery } = userApi;
