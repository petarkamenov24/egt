import { useState, useCallback } from 'react';
import { Modal } from 'antd';
import { useUpdatePostMutation, useDeletePostMutation } from '../../store/api/usersApi';

interface EditablePost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const usePostModal = () => {
  const [editingPost, setEditingPost] = useState<EditablePost | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleEditPost = useCallback((post: EditablePost) => {
    setEditingPost(post);
    setIsModalVisible(true);
  }, []);

  const showDeleteConfirm = useCallback((post: EditablePost) => {
    Modal.confirm({
      title: 'Delete Post',
      content: 'Are you sure you want to delete this post?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deletePost({ id: post.id, userId: post.userId });
      },
    });
  }, [deletePost]);

  const handleModalOk = useCallback(() => {
    if (editingPost) {
      updatePost(editingPost);
      setIsModalVisible(false);
      setEditingPost(null);
    }
  }, [editingPost, updatePost]);

  const handleModalCancel = useCallback(() => {
    setIsModalVisible(false);
    setEditingPost(null);
  }, []);

  return {
    editingPost,
    isModalVisible,
    handleEditPost,
    showDeleteConfirm,
    handleModalOk,
    handleModalCancel,
    setEditingPost
  };
}; 