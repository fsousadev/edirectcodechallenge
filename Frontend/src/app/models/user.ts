export class Auth {
  item: User;
  meta: {
    token: string;
  }

}

export class User {
  _id?: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  createdAt?: Date;
  updatedAt?: Date;
}
