import React from 'react';
import Link from 'next/link';

import { Comment } from '@/types/type';

import styled from 'styled-components';

/**
 *
 * @param title string
 * @param author string
 * @param comment string
 * @param postNumber number
 * @param date string
 * @returns my page 에서 사용될 유저 개인 댓글 데이터
 */
export default function UserCommentData({ title, author, comment, postNumber, date }: Comment) {
  return (
    <Container>
      <Linked href={`/community/post/${postNumber}`}>
        <Top>
          <p className="title">{title}</p>
          <p className="date">{date}</p>
        </Top>
        <Btm>{comment}</Btm>
      </Linked>
    </Container>
  );
}

const Container = styled.li`
  height: 100px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px 1px rgba(129, 129, 250, 0.2);
  padding: var(--padding-content);
  font-size: var(--size-text);

  .title {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-dark-gray);
  }

  .body {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const Linked = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Btm = styled.div`
  display: flex;
`;
