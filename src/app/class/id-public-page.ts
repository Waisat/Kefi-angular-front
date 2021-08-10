export class IdPublicPage {

  constructor(
    private infos:string,
    private status_check:string,
    private idUsers: {
      id:string,
      first_name:string,
      name:string,
      job:string,
      photo_url:string,
      linkedin: string,
      slug_url:string

    }

  ) {
  }
}
