import { User } from './user.model';

export class Task {
  constructor(
    public id: string,
    public user: User,
    public title: string,
    public status: string,
  ) {}
}

export interface TaskData {
  [key: string]: any;
  user: User;
  title: string;
  status: string;
}

export interface ApiTaskData {
  _id: string,
  user: User,
  title: string,
  status: string,
}
