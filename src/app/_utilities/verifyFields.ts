import {FormUpdateProfileUser} from "../class/form-update-profile-user";

export const checkFields = (newFormModel:FormUpdateProfileUser):any => {
  let message;
    if(newFormModel.jobTitle === "" || undefined || null){
      message = "Votre emploi dois etre renseigné"
      return [false, message]
    }else if(newFormModel.subjectJob === "" || undefined || null){
      message = "Votre domaine d'emploi dois etre renseigné"
      return [false, message]
    }else if(newFormModel.mobile === "" || undefined || null){
      message = "Votre domaine d'emploi dois etre renseigné"
      return [false, message]
    }else if(newFormModel.profileVisibility ===  undefined || null){
      message = "Votre visibilité doit etre renseigné"
      return [false, message]
    }else if(newFormModel.consentNewsLetter ===  undefined || null){
      message = "Votre consentement concernant la newsLetter"
      return [false, message]
    }else{
      return true
    }




};
