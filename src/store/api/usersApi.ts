import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../../types/api';
import type { Task } from '../../components/columns/taskColumns';
import { API_URL } from '../../constants';
import { shouldThrowError } from '../../utils/cookies';
import { notification } from 'antd';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const baseQuery = fetchBaseQuery({ baseUrl: `${API_URL.BASE_URL}` });

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  try {
    if (shouldThrowError()) {
      throw new Error('Simulated API error');
    }
    const result = await baseQuery(args, api, extraOptions);
    if (result.error) {
      notification.error({
        message: 'Error',
        description: 'An error occurred while fetching data. Please try again later.',
      });
    }
    return result;
  } catch (error) {
    notification.error({
      message: 'Error',
      description: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
    return { error: { status: 'CUSTOM_ERROR', error: error instanceof Error ? error.message : 'Unknown error' } };
  }
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: customBaseQuery,
  tagTypes: ['User', 'Post', 'Task'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation<User, User>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PUT',
        body: user,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              const index = draft.findIndex((u) => u.id === updatedUser.id);
              if (index !== -1) {
                draft[index] = updatedUser;
              }
            })
          );
        } catch {
        }
      },
      invalidatesTags: [],
    }),
    getUserPosts: builder.query<Post[], number>({
      query: (userId) => `posts?userId=${userId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData('getUserPosts', Number(updatedPost.userId), (draft) => {
              const index = draft.findIndex((p) => p.id === updatedPost.id);
              if (index !== -1) {
                draft[index] = updatedPost;
              }
            })
          );
        } catch {
        }
      },
      invalidatesTags: [],
    }),
    deletePost: builder.mutation<{}, { id: number; userId: number }>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({ id, userId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUserPosts', userId, (draft) => {
            const index = draft.findIndex((p) => p.id === id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [],
    }),
    getTasks: builder.query<Task[], void>({
      query: () => 'todos',
      providesTags: ['Task'],
    }),
    updateTask: builder.mutation<Task, Partial<Task> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: { ...patch, id },
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getTasks', undefined, (draft) => {
            const index = draft.findIndex((t) => t.id === id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...patch };
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          // revert optimistic
          patchResult.undo();
        }
      },
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} = usersApi; 