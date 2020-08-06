class TokenService{
  static saveToken(token){
    localStorage.setItem("token",token);
  }
  static getItem(){
    return localStorage.getItem("token");
  }
}

export default TokenService;