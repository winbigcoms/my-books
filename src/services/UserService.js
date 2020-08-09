import Axios from "axios"

export default class UserService{
  static async login(email,password){
    const resData = await Axios.post("https://api.marktube.tv/v1/me",{email,password});
    return resData.data.token
  }
  static async logout(token){
    const resData = await Axios.delete("https://api.marktube.tv/v1/me",{headers:{
      Authorization: `Bearer ${token}`
    }});
    return resData.data
  }
}