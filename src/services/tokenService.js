class TokenService{
  static saveToken(token){
    localStorage.setItem("token",token);
  }
  static getItem(){
    return localStorage.getItem("token");
  }
  static clear(){
    return localStorage.removeItem("token");
  }
}

export default TokenService;