export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface IUser {
  name: string
  phone: string
  age: number
  gender: Gender
  birthday: string
}
