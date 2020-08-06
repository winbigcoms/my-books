import Axios from "axios";

export default class BookService{
  static async getBooks(token){
    const res = await Axios.get("https://api.marktube.tv/v1/book",{
      headers:{Authorization:`Bearer ${token}`}
    });
    return res.data
  }
}