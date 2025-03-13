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
 
let handleGetAllUsers = async(req, res) => {
   let id = req.query.id; //ALl,id
   if(!id){
      return res.status(200).json({
      errCode: 1,
      errMessage: 'Missing required paramaters',
      users: []
      })
   }

   let users = await userService.getAllUsers(id);
   console.log(users)
   return res.status(200).json({
      errCode: 0,
      errMessage: 'Ok',
      users
   })
}
let handleCreateNewUser = async (req,res) =>{
   let message = await userService.createNewUser(req.body);
   console.log(message);
   return res.status(400).json(message);
}

let handleEditUser = async(req,res) =>{
   let data = req.body; //lay du lieu tu clinet
   let message = await userService.updateUserData(data);
   return res.status(200).json(message);
}

let handleDeleteUser = async(req, res) =>{
   if(!req.body.id){
         return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramater'
         })
      }
      let message = await userService.deleteUser(req.body.id);
      return res.status(200).json(message);
}
module.exports = { 
   handleLogin : handleLogin,
   handleGetAllUsers : handleGetAllUsers,
   handleCreateNewUser:handleCreateNewUser,
   handleEditUser:handleEditUser,
   handleDeleteUser:handleDeleteUser
}