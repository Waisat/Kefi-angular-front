export class FormdataUser {

  constructor(
    public city: string,
    public postal_code: string,
    public country: string,
    public company: string,
    public jobTitle:string,
    public subjectJob:string,
    public birthDate:string,
    public lookingFor:{
      networkExpenssion: boolean,
      getSomeContract: boolean,
      findpartners: boolean,
      pitchProject: boolean,
      other: boolean
    },
    public description:string,
    public linkedinAddress:string,
    public photoUrl:string,
    public profileVisibility: number,
    public consentNewsLetter:number


  ) {
  }
}
