import { useParams } from 'react-router-dom';
import { useGetUsersQuery, useUpdateUserMutation } from '../../store/api/usersApi';
import type { User } from '../../types/api';

export const useUserData = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data: users = [] } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();

  const user = users.find(u => u.id === Number(userId));

  const handleSaveUser = (updatedUser: User) => {
    updateUser(updatedUser);
  };

  return {
    user,
    handleSaveUser
  };
}; 