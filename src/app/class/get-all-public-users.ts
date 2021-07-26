export class GetAllPublicUsers {

  constructor(

    public offset:string,
    public limit:string,
    public search_options:string,
    public job:string,
    public page:string
  ) {
  }
}
