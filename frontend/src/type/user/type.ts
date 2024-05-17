import { ChangeEvent, FormEvent } from 'react';
import { Likes } from '../common';

// API Login Type
export interface LoginIni {
  img: string;
  id: string;
  name: string;
  mail: string;
  super: boolean;
  login: boolean;
  likes: Array<Likes>;
}

export interface UserType {
  img: string;
  id: string;
  password?: string;
  name: string;
  mail: string;
  refreshToken?: string;
  super: boolean;
  likes: Array<Likes>;
}

// useLogin User Data
export interface InitLoginData {
  img: string;
  id: string;
  name: string;
  super: boolean;
}

// useLogin hooks type
export interface LoginProps {
  id: string | number;
  pass: string | number;
  setId: (e: ChangeEvent<HTMLInputElement>) => void;
  setPass: (e: ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: FormEvent<Element>) => void;
  handleLogout: () => void;
}
