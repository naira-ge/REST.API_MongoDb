import styles from './styles.module.scss';
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaHubspot } from "react-icons/fa";
import { closeSignInPopup, openSignInPopup, openSignUpPopup, singUpToHomepage } from "../actions/index.js";

class SignUp extends Component {
   state = {
      wrongUsername: "",
      username: false,
      usernameValue: "",
      wrongEmail: "",
      emailValue: "",
      email: false,
      wrongPassword: "",
      passwordValue: "",
      password: false,
      wrongConfirmPassword: "",
      confirmPassword: false,
   }
   
   changeUsername = (e) => {  
      let regUser=/^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,16}[a-zA-Z0-9]$/;
         if(!regUser.test(e.target.value)){
               this.setState({
                  wrongUsername: 'Username can only use letters,numbers, minimum length is 6 characters',
                  unsernameValue: e.target.value,
                  username: false,
         })
      } else {
               this.setState({
                     wrongUsername: "",
                     unsernameValue: e.target.value,
                     username: true,
         })
      }
   }

   changeEmail = (e) => {
      let mailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(!e.target.value.match(mailFormat)) {
         this.setState({
            wrongEmail: "Email is incorrect",
            emailValue: e.target.value,
            email: false,
         })
      } else {
         this.setState({
            wrongEmail: "",
            emailValue: e.target.value,
            email: true,
         })
      }
   }

   changePassword = (e) => {
      let lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;
      if(e.target.value.length < 8) {
         this.setState({
            wrongPassword: "Password must contain at least 8 or more characters",
            passwordValue: e.target.value,
            password: false,
         })
      } else if(!e.target.value.match(lowerCaseLetters) || !e.target.value.match(upperCaseLetters) || !e.target.value.match(numbers)) {
         this.setState({
            wrongPassword: "Password must contain at least one number and one uppercase and lowercase letter",
            passwordValue: e.target.value,
            password: false,
         })
      } else {
         this.setState({
            wrongPassword: "",
            passwordValue: e.target.value,
            password: true,
         })
      } 
   }

   changeConfirmPassword = (e) => {
      if(e.target.value === "" || e.target.value !== this.state.passwordValue){
         this.setState({
            wrongConfirmPassword: "Password is incorrect",
            confirmPassword: false,
         })
      } else {
         this.setState({
            wrongConfirmPassword: "",
            confirmPassword: true,
         })
      }
   }

   handleSignInSubmit = (e) => {
      e.preventDefault();
      if(this.state.username && this.state.email && this.state.password && this.state.confirmPassword) {
         alert("success");
         this.props.singUpToHomepage(this.state.unsernameValue, this.state.emailValue, this.state.passwordValue);
      } else {
         this.setState({
            wrongConfirmPassword: "Datas are incorrect",
         })
         this.props.openSignUpPopup();
      }
   }

   render() {
     return(
      <div className={styles.login}>
      <div className={styles.signUpContainerHeader}>
         <span onClick={ this.props.closeSignInPopup }>X</span>
      </div>
      <div className={styles.loginWrapper}>
          <div className={styles.loginLeft} 
          style={{backgroundImage: `url(/gif/logo.gif)`}}>
              <h3 className={styles.loginLogo}><FaHubspot /> TalentHouse</h3>
              <span className={styles.loginDesc}>
              Connect talented people around the world with the on-demand creative community
              </span>
          </div>
         <div className={styles.loginRight}>
           <form className={styles.loginBox} 
           onSubmit={ this.handleSignInSubmit }>
              <input type="text" placeholder="Username" 
              onChange={this.changeUsername} 
              value={this.state.unsernameValue}
              className={styles.loginInput}></input>
                 <p>{this.state.wrongUsername}</p>
              <input type="text" placeholder="Email" 
              onChange={this.changeEmail} 
              value={this.state.emailValue}
              className={styles.loginInput}></input>
                 <p>{this.state.wrongEmail}</p>
              <input type="password" placeholder="Password" 
              onChange={this.changePassword} 
              value={this.state.passwordValue}
              className={styles.loginInput}></input>
                 <p>{this.state.wrongPassword}</p>
              <input type="password" placeholder="Confirm Password" 
              onChange={this.changeConfirmPassword}
              className={styles.loginInput}></input>
                 <p>{this.state.wrongConfirmPassword}</p>
              <button className={styles.loginButton}>Sign Up</button>
           </form>
           <div className={styles.signUpContainerFooter}>
               <p onClick={ this.props.openSignInPopup }>Already have an account? Sign in</p>
           </div>
       </div>
      </div>
   </div>
    )
   }  
}

/*const mapDispatchToProps = (dispatch) => {
   return bindActionCreators(
    {
       closeSignInPopup,
       openSignInPopup,
       openSignUpPopup,
       singUpToHomepage,
    },
       dispatch,
    )    
}

export default connect(null, mapDispatchToProps)(SignUp)*/;
export default SignUp;