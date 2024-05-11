'use client';

import useInputs from '@/src/hooks/useInputs';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/16/solid';

export default function Search() {
  const [keyword, onChange, onEnter, setInit] = useInputs('');

  return (
    <div className="absolute w-1/2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-between items-center p-2 border-4 border-blue">
      <input className="w-full h-full text-xs py-2" placeholder="게시글 통합검색" />
      <SearchIcon width={16} height={16} className="text-lightBlue cursor-pointer" />
    </div>
  );
}