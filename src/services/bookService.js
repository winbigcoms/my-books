import Axios from "axios";

export default class BookService{
  static async getBooks(token){
    const res = await Axios.get("https://api.marktube.tv/v1/book",{
      headers:{Authorization:`Bearer ${token}`}
    });
    return res.data
  }
  static async PostBooks(token,bookInfo){
    const res = await Axios.post("https://api.marktube.tv/v1/book",
      bookInfo,
      {headers:{Authorization:`Bearer ${token}`}}
    );
    return res.data
  }
  static async deleteBook(token,bookId){
    const res = await Axios.delete(`https://api.marktube.tv/v1/book/${bookId}`,
      {headers:{Authorization:`Bearer ${token}`}}
    );
    return res.data
  }
}