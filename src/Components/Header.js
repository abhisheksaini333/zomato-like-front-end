import { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import { 
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    TwitterLoginButton,
    AmazonLoginButton,
    InstagramLoginButton,
    LinkedInLoginButton,
    MicrosoftLoginButton,
    BufferLoginButton,
    TelegramLoginButton,
    AppleLoginButton,
    DiscordLoginButton
} from 'react-social-login-buttons';


import { GoogleLogin } from 'react-google-login';

const customStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'lightgrey',
        border: 'solid 2px tomato'
    }
};

class Header extends Component {

    constructor() {
        super();
        this.state = {
            FN: '',
            LN: '',
            Email: '',
            Password: '',
            isSignUpFormOpen: false,
            isSignInFormOpen: false,
            userDetails: undefined
        }
    }

    loginOpenHandler = () => {
        this.setState({
            isSignInFormOpen: true
        })
    }

    signUpOpenHandler = () => {
        this.setState({
            isSignUpFormOpen: true
        })
    }

    signUpHandler = () => {
        const { FN, LN, Email, Password } = this.state;

        // make an API call here to save the data in mongoDB
        const req = {
            firstName: FN,
            lastName: LN,
            email: Email,
            password: Password
        }

        axios({
            method: 'POST',
            url: 'http://localhost:4050/api/userSignUp',
            headers: { 'Content-Type' : 'application/json' },
            data: req,
        }).then(result => {
            alert('User Signed up Successfully !!');
            this.signUpCancelHandler();
        }).catch(error => {
            alert('Error signing up');
        })
    }

    signUpCancelHandler = () => {
        this.setState({
            FN: '',
            LN: '',
            Email: '',
            Password: '',
            isSignUpFormOpen: false
        });
    }

    signInHandler = () => {
        const { Email, Password } = this.state;

        // make an API call here to save the data in mongoDB
        const req = {
            email: Email,
            password: Password
        }

        axios({
            method: 'POST',
            url: 'http://localhost:4050/api/userLogin',
            headers: { 'Content-Type' : 'application/json' },
            data: req,
        }).then(result => {
            this.setState({
                userDetails: result.data.user
            })
            this.signInCancelHandler();
        }).catch(error => {
            alert('Error signing In');
        })
    }

    signInCancelHandler = () => {
        this.setState({
            Email: '',
            Password: '',
            isSignInFormOpen: false
        });
    }

    handleChange = (event, stateVariable) => {
        this.setState({
          [stateVariable]: event.target.value
        });
    }

    logoutHandler = () => {
        this.setState({
            userDetails: undefined
        });
    }

    handleClick = (socialMedia) => {
        switch(socialMedia) {
            case 'facebook':
                this.handleFaceBookLogin();
                break;
            case 'google':
                this.handleGoogleLogin();
                break;
            default:
        }
    }

    handleFaceBookLogin() {
        debugger
        // 1. the auth (user authentication) information from your server
        // 2. pass the auth information to the facebook server to log you in
        // 3. facebook takes care of your login

        // interface with facebook login library
    }

    handleGoogleLogin() {
        debugger
        // interface with goole login library

        /*
        1. create a goole developer account (careful)
        2. generate an Oauth ID: https://developers.google.com/identity/sign-in/web/sign-in
        3. integrate with 'react-google-login'
        4. You will need the ID generated in step 2
        5. Do the event handling
        */
    }

    responseGoogleSuccess() {
        console.log('Success fully logged in to google')
    }

    responseGoogleFailure() {
        console.log('Error while logging in to google')
    }

    render() {
        const { FN, LN, Email, Password, isSignUpFormOpen, isSignInFormOpen, userDetails } = this.state;
        return(
            <>
                <div className="App-header">
                    <span>Zomato App</span>
                    <div className="action-buttons">
                        {
                            userDetails 
                            ?
                            <>
                                <span>{userDetails[0].firstName}</span>
                                <button className="navigationLink" onClick={this.logoutHandler}>Logout</button>
                            </>
                            :
                            <>
                                <button className="navigationLink" onClick={this.loginOpenHandler}>Login</button>
                                <button className="navigationLink" onClick={this.signUpOpenHandler}>Signup</button>
                            </>
                        }
                        
                    </div>
                </div>
                <Modal isOpen={isSignUpFormOpen} style={customStyle} ariaHideApp={false}>
                    <div>
                        <h1>SignUp Form</h1>
                        <label>First Name:</label>
                        <input type="text" value={FN} onChange={(event) => this.handleChange(event, 'FN')}></input>
                        <br/>
                        <label>Last Name:</label>
                        <input type="text" value={LN} onChange={(event) => this.handleChange(event, 'LN')}></input>
                        <br/>
                        <label>Email:</label>
                        <input type="email" value={Email} onChange={(event) => this.handleChange(event, 'Email')}></input>
                        <br/>
                        <label>Password:</label>
                        <input type="password" value={Password} onChange={(event) => this.handleChange(event, 'Password')}></input>
                        <br/>
                        <button onClick={this.signUpHandler}>Sign Up</button>
                        <button onClick={this.signUpCancelHandler}>Cancel</button>
                    </div>
                </Modal>
                <Modal isOpen={isSignInFormOpen} style={customStyle} ariaHideApp={false}>
                    <div>
                        <h1>SignIn Form</h1>
                        <label>Email:</label>
                        <input type="email" value={Email} onChange={(event) => this.handleChange(event, 'Email')}></input>
                        <br/>
                        <label>Password:</label>
                        <input type="password" value={Password} onChange={(event) => this.handleChange(event, 'Password')}></input>
                        <br/>
                        <button onClick={this.signInHandler}>Sign In</button>
                        <button onClick={this.signInCancelHandler}>Cancel</button>

                        {/*<FacebookLoginButton onClick={() => this.handleClick('facebook')}/>
                        <GoogleLoginButton onClick={() => this.handleClick('google')}/>
                         <GithubLoginButton />
                        <TwitterLoginButton />
                        <AmazonLoginButton />
                        <InstagramLoginButton />
                        <LinkedInLoginButton />
                        <MicrosoftLoginButton />
                        <BufferLoginButton />
                        <TelegramLoginButton />
                        <AppleLoginButton />
                        <DiscordLoginButton /> */}

                        <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogleSuccess}
                            onFailure={this.responseGoogleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>
            </>
        )
    }
}

export default Header;