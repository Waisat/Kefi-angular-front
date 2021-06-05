import {EventEmitter} from "@angular/core";

export const PageMemberListUtilities = (eventEmitter:EventEmitter<any>) => {

  return new Promise((resolve, reject) => {
    if(eventEmitter){
      eventEmitter.emit(true)
      resolve("okay")
    }else{
      reject("erreur")
    }


  });

};
