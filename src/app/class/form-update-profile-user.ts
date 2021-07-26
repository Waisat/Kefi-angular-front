export class FormUpdateProfileUser {
  constructor(
    public city: string,
    public postal_code: string,
    public country: string,
    public company: string,
    public jobTitle:string,
    public subjectJob:string,
    public mobile:string,
    public lookingFor:{
      networkExpenssion: boolean,
      getSomeContract: boolean,
      findpartners: boolean,
      pitchProject: boolean,
      other: boolean
    },
    public description:string,
    public linkedinAddress:string,
    public profileVisibility: number,
    public consentNewsLetter:number

  ) {
  }
}
