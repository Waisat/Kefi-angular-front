export class FormdataUser {

  constructor(
    public city: string,
    public postal_code: string,
    public country: string,
    public jobTitle:string,
    public subjectJob:string,
    public birthDate:string,
    public lookingFor:any,
    public description:string,
    public linkedinAddress:string,
    public photoUrl:string,
    public profileVisibility: boolean,
    public consentNewsLetter:boolean


  ) {
  }
}
