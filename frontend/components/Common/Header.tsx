import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import useInputs from '@/hooks/common/useInputs';
import { HEADER_NAV } from '@/constant/constant';
import Logo from './Logo';

import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export default function Header() {
  // Header 카테고리
  const category = useMemo(() => Object.keys(HEADER_NAV), []);
  // 링크 연결
  const router = useRouter();
  // 검색어 저장
  const [keyword, setkeyword, setInit] = useInputs('');

  /** 게시글 검색 핸들러 */
  function searchKeybordHandler(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter') {
      if (!keyword) return alert('검색어가 필요합니다.');
      e.preventDefault();
      router.push(`/community/search?keyword=${keyword}`);
    }
    setInit();
  }

  /** 게시글 검색 마우스 핸들러 */
  function searchMouseHandler(e: React.MouseEvent<SVGElement, MouseEvent>) {
    if (!keyword) return alert('검색어가 필요합니다.');
    setInit();
    router.push(`/community/search?keyword=${keyword}`);
  }

  return (
    <>
      {/* 상단 */}
      <Nav>
        <Logo />
        <InputBox>
          <Input
            placeholder="게시글 통합 검색"
            value={keyword}
            onChange={setkeyword}
            onKeyDown={searchKeybordHandler}></Input>
          <FaSearch color="var(--color-blue)" onClick={searchMouseHandler} />
        </InputBox>
      </Nav>
      {/* 하단바 */}
      <Bar>
        {category.map(each => (
          <li key={HEADER_NAV[each]} className="nav-item">
            <Linked href={HEADER_NAV[each]}>{each}</Linked>
          </li>
        ))}
      </Bar>
    </>
  );
}

const Nav = styled.nav`
  height: 100px;
  /* 없으면 왜 밀리는지 */
  min-height: 100px;
  display: flex;
  align-items: center;
  position: relative;
  padding: var(--padding-base);

  .logo {
    width: 200px;
    height: 30px;
    background: gray;

    :hover {
      cursor: pointer;
    }
  }
`;

/** 게시글 검색 Input Box*/
const InputBox = styled.div`
  width: 40%;
  max-width: 400px;
  min-width: 300px;
  height: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--padding-content);
  padding: var(--padding-text);
  border: solid 3px var(--color-blue);
`;

/** 게시글 검색 Input */
const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;

  :focus {
    outline: none;
  }
`;

/** 카테고리 바 */
const Bar = styled.ul`
  width: 100%;
  display: flex;
  background: var(--color-blue);
  padding: var(--padding-base);
  color: white;

  .nav-item {
    font-size: var(--size-sub-title);
    margin: 10px 0;
    padding: 0 15px;
    font-weight: 400;

    :first-child {
      padding-left: 0;
    }
  }
`;

const Linked = styled(Link)`
  color: white;

  :link {
    color: white;
  }

  :visited {
    color: white !important;
  }
`;
