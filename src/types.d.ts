export interface UserType {
  name: string;
  email: string;
  password: string;
  googleId?: string;
  id: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
}
