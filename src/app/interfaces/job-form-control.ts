export interface JobFormControl {


    obj:{
      id: number
      text:string,
      parent:number,
      children:[
       {
      id:number,
      parent:number,
      rome: string,
      text:string
        }

      ]
    }



}
