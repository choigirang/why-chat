'use client';

import { useState } from 'react';
import { api } from '@/util/api';

import { CheckName } from '@/type/sign/type';

import { CheckCircleIcon } from '@heroicons/react/16/solid';

type NickNameProps = {
  nickName: CheckName;
  setNickName: React.Dispatch<React.SetStateAction<CheckName>>;
};

/** 2024/05/23 - user nickName(parent: infoPage) in sign page */
export default function Name({ nickName, setNickName }: NickNameProps) {
  const [name, setName] = useState(false);

  // nick name func
  const nicknameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setNickName(prev => ({
      ...prev,
      name: value,
    }));

    // check available name
    const check = /^[A-Za-z\d!@#$%^&*()_+]{2,20}$/;

    if (check.test(value)) setName(true);
    else setName(false);
  };

  // check duplicated api
  const checkDuplicateNickName = () => {
    if (!name) return alert('닉네임을 확인하세요.');

    api
      .get(`/check?nickName=${nickName.name}`)
      .then(res => {
        alert('사용할 수 있는 닉네임입니다.');
        setNickName(prev => ({ ...prev, checkName: true }));
      })
      .catch(err => alert('사용할 수 없는 아이디입니다.'));
  };

  return (
    <div className="grid grid-cols-info w-full p-default text-xs">
      <label htmlFor="name" className="font-bold">
        닉네임
      </label>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {/* name input */}
          <input
            id="name"
            name="name"
            type="text"
            placeholder="닉네임을 입력해주세요."
            onChange={nicknameHandler}
            required
            className="w-full border border-lightGray p-default outline-none"
          />
          <button
            onClick={checkDuplicateNickName}
            className={`w-[100px] bg-${nickName.checkName ? 'lightGray' : 'blue'}  text-white`}
            disabled={nickName.checkName}>
            중복검사
          </button>
        </div>
        <p className="flex gap-1">
          <CheckCircleIcon width={12} height={12} color={name ? 'green' : ''} />
          <span className="text-lightGray">특수문자 및 공백을 제외한 2~20자의 닉네임을 입력해주세요.</span>
        </p>
      </div>
    </div>
  );
}
