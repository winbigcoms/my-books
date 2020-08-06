import Axios from "axios"

export default class UserService{
  static async login(email,password){
    const resData = await Axios.post("https://api.marktube.tv/v1/me",{email,password});
    return resData.data.token
  }
}