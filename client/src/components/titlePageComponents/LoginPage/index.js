import Header from "./Header/index.js";
import Content from "./Content/index.js";
import Footer from "../../Footer/index";
import Popup from '../popup/index.js';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openSignUpPopup } from "../actions/index.js";
import styles from './styles.module.scss';

function LoginPage(props) {
  return (
    <div className={styles.titlePage}>
       <Header />
       <Content />
       <Footer />
       { props.popupHandler.openPopup ? <Popup /> : null }
    </div>
  )

}


const mapStateToProps = (state) => {
  return {
      popupHandler: state.popupHandler,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
   {
      openSignUpPopup
   },
      dispatch,
   )    
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);