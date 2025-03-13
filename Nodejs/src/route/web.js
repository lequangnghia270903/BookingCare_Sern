import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
let router = express.Router();
let initWebRoutes = (app) => {
    router.get("/",homeController.getHomePage);

    //rest api
    router.get("/about",homeController.getAuboutPage);
    router.get("/crud",homeController.getCrud);
    router.post("/post-crud",homeController.postCRUD);
    router.get("/get-crud",homeController.displayGetCrud);
    router.get("/edit-crud",homeController.getEditCrud);
    router.post("/put-crud",homeController.putCrud);
    router.get("/delete-crud",homeController.deleteCrud);
    

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user',userController.handleCreateNewUser)
    router.put('/api/edit-user',userController.handleEditUser)
    router.delete('/api/delete-user',userController.handleDeleteUser)
    return app.use("/",router);
}

module.exports = initWebRoutes;