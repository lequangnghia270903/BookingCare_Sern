/* eslint-disable no-undef */
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { handleLoginApi } from "../../services/userService"
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isshowpassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUserName = (event) =>{
        this.setState({
            username: event.target.value
            //được sử dụng để cập nhật state của một component khi có sự thay đổi từ đầu vào (input), chẳng hạn như từ một ô nhập liệu.
        })
    }
    handleOnChangePassword = (event) =>{
        this.setState({
            password: event.target.value
            //được sử dụng để cập nhật state của một component khi có sự thay đổi từ đầu vào (input), chẳng hạn như từ một ô nhập liệu.
        })      
    }
    
    handleLogin = async() => {
        this.setState({
            errMessage: ''
        })

        console.log('username: ', this.state.username, 'password: ', this.state.password)
        console.log('All state', this.state)
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if(data && data.errCode !== 0){
                this.setState({
                    errMessage: data.errMessage
                }) 
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
                console.log("login succed!")
            }
        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log('nghiale', error.response);
        }
    }
    handleHidePassword =() => {
        this.setState({
            isshowpassword: !this.state.isshowpassword
        })
    }
    render() {
        //JSX
        return (
            <div className='login_background'>
                <div className='login_container'>
                    <div className='login_content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 login-input'>
                            <label>User Name:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your User Name'
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeUserName(event)}></input>
                        </div>
                        <div className='col-12 login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={ this.state.isshowpassword ? 'text' : 'password'} 
                                className='form-control' 
                                placeholder='Enter your User Pasword'
                                onChange={(event) => {this.handleOnChangePassword(event)}}
                            ></input>
                            <span onClick={() => {this.handleHidePassword()}}>
                                <FontAwesomeIcon className='iconeya' icon={this.state.isshowpassword ? faEye : faEyeSlash} />
                            </span>
                        </div>

                        </div>
                        <div className='col-12' style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => {this.handleLogin()}}>LogIn</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='forgot-password'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <FontAwesomeIcon className="google" icon={faGooglePlusG} />
                            <FontAwesomeIcon className='facebook' icon={faFacebook} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
