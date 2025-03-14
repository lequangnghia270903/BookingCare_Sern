import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./userManage.scss";
import {getAllUsers, createNewUserService, deleteUserService} from "../../services/userService"
import ModalUser from './ModalUser'
class UserManage extends Component {

    constructor(props){
        super(props);
        this.state ={
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }
    
    getAllUsersFromReact = async() =>{
        let response = await getAllUsers('ALL');
        console.log('get user from node.js:', response)
        if(response && response.errCode===0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () =>{
        this.setState({
            isOpenModalUser:true,
        })
    }


    toggleUserModal =() => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    createNewUser = async(data) =>{
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0){
                alert(response.errMessage)
            }else {
                await this.getAllUsersFromReact();
            }
        } catch (e) {
            console.log(e)
        }
    }
    handldeDeleteUser =async(user) =>{
        console.log('click delete',user)
        try {
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0){
                await this.getAllUsersFromReact();
            }
            else{
                alert(res.errMessage);
            }
            console.log(res)
        } catch (e) {
            console.log(e);
        }
    }
    /** Life CycleCycle
     * Run component:
     * 1.run constructor -> init state
     * 2. Did mount(set state): born unmount
     * 3. Render(re-render)
     * 
     * 
     * 
     * 
     * 
     */

    render() {
        console.log('check render', this.state)
        let arrUsers = this.state.arrUsers;
        //properties; nested
        return (
            <div className="user-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent ={this.toggleUserModal}
                    createNewUser ={this.createNewUser}
                />
                <div className='title text-center'>Manage user with Nghia</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}><i className="fas fa-plus"></i>Add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Adress</th>
                            <th>Actiones</th>
                        </tr>
                            {arrUsers && arrUsers.map((item,index) =>{
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit"><i  className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={() => this.handldeDeleteUser(item)}><i  className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                                )
                                })
                            }
                        </tbody>
                            
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
