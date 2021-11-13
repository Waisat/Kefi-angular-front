export default function checkForSecureParameter(envSecure:string):boolean{
  if(envSecure === "true"){
    return true
  }else {
    return false
  }

}
