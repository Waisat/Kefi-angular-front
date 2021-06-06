export class EmailEventToSend {
  constructor(
    public mailContact: string,
    public title: string,
    public people_attend:string,
    public imageEvent:string,
    public address:string,
    public city:string,
    public postal_code:string,
    public event_date:string,
    public start_hours:string,
    public end_hours:string,
    public send_MailTo:string,
    public MessageToSend:string

  ) {

  }

}
