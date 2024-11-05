import {Document} from 'mongoose';

export type IAdmin = Document & {
  username: string;
  password: string;
};
