import userService from "../services/userServices"

let handleLogin = async(req,res) =>{
   let email = req.body.email;
   let password = req.body.password;
//check email exit
   if(!email || !password){
      return res.status(500).json({
         errCode: 1,
         message: 'Missing input parametter'
   })
  }
  let userData = await userService.handleUserLogin(email,password);
  

  
//compaire password
//return userInfo
//acces tokem:JWT json web token
   return res.status(200).json({
      errCode: userData.errCode,
      errMessage: userData.errMessage,
      //kiem tra userData.user có tồn tại hay khong và có giá trị hợp lệ hay ko 
      user: userData.user ? userData.user:{},
   })
}

module.exports ={ 
   handleLogin: handleLogin,
}