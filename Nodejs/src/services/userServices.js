import { reject } from "bcrypt/promises"
import db from "../models/index"
import bcrypt from "bcryptjs"

let handleUserLogin = (email, password) => {
 return new Promise(async(resolve, reject) =>{
   try {
      let userData = {};

      let isExit = await checkUserEmail(email);
      if(isExit){
         //user already exits

         let user = await db.User.findOne({
            where: {email: email},
            raw: true
         })
         if(user){
         //compaire password(so sánh pass)
         let check = await bcrypt.compareSync(password, user.password); // false
            if(check){
               userData.errCode = 0,
               userData.errMessage = "Ok",
               console.log(user);
               //xóa trường password
               delete user.password;
               userData.user = user;
            }else{
               userData.errCode = 3;
               userData.errMessage = "Wrong password"
         }
         }else{
            userData.errCode = 2,
            userData.errMessage = "User not found"
            resolve(userData)
         }
      }else{
         //return error
         userData.errCode = 1,
         userData.errMessage = "Your`s user email isn`t exit in your system. Plz try other email"
      }
      resolve(userData)

   } catch (error) {
      reject(error)
   }
 })
}


let checkUserEmail =(userEmail) =>{
   return new Promise(async(resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: {
               email: userEmail
            }
         })
         if(user){
            resolve(true)
         }else{
            resolve(false)
         }
      } catch (error) {
         reject(error);
      }
   })
}
module.exports ={
   handleUserLogin:handleUserLogin,
   checkUserEmail:checkUserEmail
} 