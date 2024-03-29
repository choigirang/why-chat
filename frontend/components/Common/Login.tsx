import React, { FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { User } from '@/types/type';

import { api } from '@/util/api';
import useInputs from '@/hooks/common/useInputs';
import { deleteLoginData, deleteToken, saveLoginData, setToken } from '@/util/cookie/localStorage';
import AddPostBtn from '../Community/AddPostBtn';
import { loginSuccess, logout } from '@/redux/actions/user';
import { PROFILE_URL } from '@/constant/constant';
import AddNoticeBtn from '../Notice/AddNoticeBtn';

import styled from 'styled-components';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

export default function Login() {
  // 로그인 아이디
  const [id, setId] = useInputs('');
  // 로그인 패스워드
  const [pass, setPass] = useInputs('');
  const router = useRouter();

  // 유저 reducer
  const user = useSelector((state: RootState) => state.user.user);
  const loginState = user.login && user.name;
  const dispatch = useDispatch();

  // 아이디,비밀번호 입력 제출 이벤트
  const handleSubmit = (e: FormEvent) => {
    // 새로고침 방지
    e.preventDefault();
    // 유저 확인
    async function fetch() {
      await api
        .post('/login', { id, password: pass })
        .then(res => {
          const { id, name, mail, img, super: isSuper, likes }: User = res.data.user;
          const userData = { id, name, mail, img, super: isSuper, likes };

          dispatch(loginSuccess(userData));
          setToken(res.data.accessToken, res.data.refreshToken);
          saveLoginData(userData);
        })
        .catch(res => {
          alert('일치하지 않는 사용자입니다.');
        });
    }
    fetch();
  };

  // 로그아웃 이벤트
  const logOut = () => {
    dispatch(logout());
    deleteToken();
    deleteLoginData();
    alert('로그아웃 되었습니다.');
  };

  return (
    <Container>
      <LoginBox>
        {!user.login && (
          <>
            <Form action="/user" onSubmit={handleSubmit}>
              {/* 아이디, 패스워드 작성 */}
              <InputBox>
                <Input type="text" placeholder="테스트 아이디 : test" value={id} onChange={setId} />
                <Input type="password" placeholder="비밀번호 : 1234" value={pass} onChange={setPass} />
              </InputBox>
              {/* 로그인 옵션 */}
              <ButtonBox>
                <OptionBox>
                  <Option type="checkbox"></Option>
                  <span className="text">아이디저장</span>
                </OptionBox>
                <OptionBox>
                  <Option type="checkbox"></Option>
                  <span className="text">자동로그인</span>
                </OptionBox>
                <Button type="submit">로그인</Button>
              </ButtonBox>
            </Form>
            {/* 회원가입 관련 */}
            <BottomBox>
              <FontBox>
                <span className="btm-Text" onClick={() => router.push('/signup')}>
                  회원가입
                </span>
                <span className="border-Span"></span>
                <span className="btm-Text">이이디·비밀번호 찾기</span>
              </FontBox>
            </BottomBox>
          </>
        )}
        {/* 로그인 시 */}
        {user.login && (
          <LoginUserBox>
            <Image src={PROFILE_URL(user.img)} priority={true} width={100} height={100} alt="profile-img" />
            {/* 유저 정보 */}
            <InfoBox>
              <div className="user-box">
                <div className="name-box">
                  <span className="name">{user.name}</span>
                  <span>님</span>
                  <BsFillArrowRightCircleFill />
                </div>
                <MyInfo href={`/my?id=${user.id}`}> 내 정보</MyInfo>
              </div>
              <div className="log-out" onClick={logOut}>
                로그아웃
              </div>
            </InfoBox>
          </LoginUserBox>
        )}
      </LoginBox>
      {/* 로그인 시 게시글 추가 */}
      {loginState && <AddPostBtn />}
      {user.super && <AddNoticeBtn />}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: var(--padding-content);
`;

// 로그인
const LoginBox = styled.div`
  width: 100%;
  padding: var(--padding-solo);
  border: var(--border-content);
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  gap: var(--padding-solo);
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--padding-solo);
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  background: var(--color-light-gray);
  padding: var(--padding-text);

  ::placeholder {
    font-size: 12px;
  }
`;

// 우측 로그인 버튼
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Button = styled.button`
  height: 100%;
  min-width: 70px;
  padding: var(--padding-text);
  color: white;
  font-weight: 700;
  background: var(--color-blue);

  :hover {
    cursor: pointer;
  }
`;

export const OptionBox = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--size-text);
`;

const Option = styled.input`
  max-width: 70px;
`;

// 회원가입, 비밀번호 찾기
const BottomBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: var(--padding-solo) 0;
  margin-top: var(--margin-small);
  border-top: var(--border-dash);
  font-size: var(--size-text);
`;

const FontBox = styled.div`
  display: flex;
  gap: 12px;

  .btm-Text {
    :hover {
      cursor: pointer;
      border-bottom: var(--border-text);
      font-weight: 500;
    }
  }

  .border-Span {
    border-right: var(--border-text);
  }
`;

// 로그인 시 컴포넌트
const LoginUserBox = styled.div`
  width: 100%;
  padding: var(--padding-solo) 0;
  font-size: var(--size-sub-title);
  display: flex;
  justify-content: space-between;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-left: 10px;

  .user-box {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;

    cursor: pointer;

    .name-box {
      display: flex;
      align-items: center;

      svg {
        margin-left: 10px;
      }
    }

    .name {
      color: var(--color-blue);
      font-weight: 500;
    }

    svg {
      font-size: 14px;
    }
  }

  .log-out {
    display: flex;
    justify-content: center;
    cursor: pointer;
    font-size: var(--size-text);
    font-weight: 400;
    color: var(--color-white);
    padding: var(--padding-half) var(--padding-solo);
    background-color: var(--color-blue);
  }
`;

const MyInfo = styled(Link)`
  font-size: var(--size-text);
`;
