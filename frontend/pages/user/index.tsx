import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { api } from '@/util/api';
import useInputs from '@/hooks/common/useInputs';
import { UserType } from '@/types/type';
import { PROFILE_URL } from '@/constant/constant';

import styled from 'styled-components';
import { BsArrowRepeat } from 'react-icons/bs';

/**
 *
 * @returns 유저 검색 페이지
 */
export default function Index() {
  // 검색한 유저 데이터
  const [users, setUsers] = useState<UserType[]>([]);
  // 검색값
  const [userName, setUserName, setInit] = useInputs('');
  // 검색 내용
  const [msg, setMsg] = useState<string | number>('');
  // 유저 쿼리
  // const queryResult = useUserName('all');

  // 전체 유저 데이터
  useEffect(() => {
    // setUsers(queryResult);
    api.get('/users').then(res => setUsers(res.data.findAllUser));
  }, []);

  // enter 눌렀을 시 검색
  function searchKeybordHandler(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') {
      if (!userName) return alert('검색어가 필요합니다.');
      e.preventDefault();

      api.get(`/searchUser?id=${userName}`).then(res => setUsers(res.data.findUser));
      setMsg(userName);
    }
  }

  // 검색 눌렀을 시 검색
  function searchMouseHandler(e: React.MouseEvent<HTMLButtonElement>) {
    if (!userName) return alert('검색어가 필요합니다.');
    api.get(`/searchUser?id=${userName}`).then(res => setUsers(res.data.findUser));
    setMsg(userName);
  }

  // 검색어 초기화
  function initHandler(e: React.MouseEvent<HTMLOrSVGElement>) {
    api.get(`/users`).then(res => setUsers(res.data.allUser));
    setMsg('');
    setInit();
  }

  return (
    <Container>
      {/* 유저 검색 */}
      <InputBox>
        <Inputs
          placeholder="아이디를 입력해주세요."
          value={userName}
          onChange={setUserName}
          onKeyDown={searchKeybordHandler}></Inputs>
        <button type="button" color="var(--color-blue)" onClick={searchMouseHandler}>
          검색
        </button>
        <div className="icon">
          <BsArrowRepeat onClick={initHandler} />
        </div>
      </InputBox>
      {/* 검색 결과 */}
      {msg && (
        <p className="title">
          <span className="keyword">{msg}</span> 로 검색한 결과입니다.
        </p>
      )}
      {/* 유저 목록 */}
      <UserBox>
        {users &&
          users.map(user => (
            <UserCard key={user.name} href={`/user/${user.id}`}>
              <Image src={PROFILE_URL(user.img)} alt="userImg" width={100} height={100} />
              {user.id}
            </UserCard>
          ))}
      </UserBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    margin-bottom: 20px;
  }
`;

const InputBox = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: var(--margin-solo) 0;

  button,
  .icon {
    height: 100%;
    padding: var(--padding-text);
    border-radius: 3px;
    background-color: var(--color-dark-gray);
    color: white;

    :hover {
      background-color: var(--color-light-gray);
    }
  }

  .keyword {
    font-weight: 500;
  }
`;

const Inputs = styled.input`
  width: 50%;
  height: 100%;
  border: var(--border-solid1) var(--color-dark-blue);
  border-radius: 3px;
  padding: var(--padding-text);
`;

const UserBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const UserCard = styled(Link)`
  width: 80%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: var(--padding-content);
  border: var(--border-solid1) var(--color-dark-blue);
  border-radius: 3px;
  box-shadow: 3px var(--color-gray);

  img {
    width: 100px;
    height: 100px;
  }
`;
