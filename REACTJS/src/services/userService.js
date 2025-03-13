import axios from '../axios'; 

const handleLoginApi = (useremail, userpassword) => {
   // Gửi yêu cầu đăng nhập đến API
   return axios.post('/api/login', { email: useremail, password: userpassword });
};

const getAllUsers = (inputId) =>{
return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) =>{
   console.log('check dta from service:', data)
   return axios.post('/api/create-new-user', data)
}

const deleteUserService =(userid) =>{
   // return axios.delete('/api/delete-user',{id: userid})
   return axios.delete('/api/delete-user',{
      data: {
         id : userid
      }
   })
}
export { handleLoginApi, getAllUsers, createNewUserService ,deleteUserService};
