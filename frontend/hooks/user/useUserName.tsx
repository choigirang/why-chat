import { api } from '@/util/api';
import React from 'react';
import { useQuery } from 'react-query';

export default function useUserName(id: string | number) {
  async function fetchUserName() {
    try {
      if (id === 'all') {
        const res = await api.get(`/user?id=${id}`);
        return res.data;
      }
      const res = await api.get(`/user?id=${id}`);
      return res.data.userData;
    } catch {
      return new Error('일치하는 유저 정보가 없습니다.');
    }
  }

  return useQuery(['user', id], fetchUserName, {
    staleTime: 2000,
  });
}
