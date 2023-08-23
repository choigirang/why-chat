import { CommentProps, CommentType } from '@/types/type';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function UserCommentData({ postNumber, comment }: CommentProps) {
  const viewContainerRef = React.useRef<HTMLDivElement>(null);

  console.log(comment);

  return (
    <Container>
      {/* <Linked href={`/community/post/${post.postNumber}`}>
        <Top>
          <p className="title">{comment}</p>
          <p className="date">{date}</p>
        </Top>
      <div className="body" ref={viewContainerRef} />
      </Linked> */}
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
    font-weight: 400;
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
  gap: 10px;
`;
