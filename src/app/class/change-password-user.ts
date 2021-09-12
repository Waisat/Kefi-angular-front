export class ChangePasswordUser {

  constructor(

    public password: string,
    public  confirm_password:string,
    public email:string,
    public token:string

  ) {
  }
}
