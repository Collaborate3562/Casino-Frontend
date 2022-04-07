import styled from "styled-components";
import { connect } from "react-redux";
import { AiOutlineLogin } from "react-icons/ai";
import { bindActionCreators } from "redux";
import clsx from "clsx";


import { makeStyles } from "@material-ui/core/styles";
import { showDot } from "../../shared/printConfig";
import PokerLogo from "../../Components/HomePage/PokerLogo";
import Button from "../../Components/Button";
import TextSmall from "../../StyledComponents/TextSmall";
import userImage from "../../images/user-image.png";
import MoneyLabel from "../../Components/Lobby/MoneyLabel";
import LobbyMenuIcon from "../../Components/Lobby/LobbyMenuIcon";
import MainTabs from "./LobbyMainTabs";
import { withRouter } from "react-router-dom";
import * as lobbyAction from "../../store/actions/lobby.action";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";

import HeaderBg from '../../images/bg_base_header.png'
import Logo from '../../images/logo.png'
import LeftPart from '../../images/left_part.png'
import RightPart from '../../images/right_part.png'
import CurrencyBg from '../../images/bg_currency.png'
import BtnPurchase from '../../images/btn_purchase.png'
import NameBg from '../../images/bg_name.png'

import { callbackify } from "util";
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5rem;
`;

const useStyles = makeStyles((theme) => ({
  tournamentHeader: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingBottom: 0,
    minHeight: "160px",
    position: "relative",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    "& .pix-logo": {
      width: "50px",
      height: "50px",
    },
  },
  headerContainer: {
    position: 'absolute',
    height: "100%",
    left: "2%",
    bottom: "0%"
  },
  headerImg: {
    width: "100%",
    height: "100%",
    minHeight: "160px",
  },
  leftPart: {
    position: "absolute",
    height: "100%",
    left: "0%"
  },
  rightPart: {
    position: "absolute",
    height: "100%",
    right: "0%"
  },
  logo: {
    height: "80%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  currency: {
    background: `url(${CurrencyBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  username: {
    background: `url(${NameBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  tabs: {
    bottom: "2%",
    left: '3%',
    position: "absolute"
  },

  userAvatar: {
    padding: "1px",
    backgroundColor: "#eba01e",
    border: "1px solid white",
    borderRadius: "80px",
    width: "40px",
    height: "40px"
  },

}));

const LobbyHeader = (props) => {
  const { apiConfig } = global;
  let [showDropDown, handleDropDown] = useState(false);
  const classes = useStyles();




  return (
    <div className={classes.tournamentHeader}>
      <img src={HeaderBg} className={classes.headerImg} alt="header back" />
      <img src={LeftPart} className={classes.leftPart} alt="left" />
      <img src={RightPart} className={`${classes.rightPart} lg:block hidden`} alt="right" />
      <img src={Logo} className="absolute transform -translate-x-1/2 left-1/2 top-1/3 sm:top-1/2 -translate-y-1/2 h-14 sm:h-20 xl:h-24 2xl:h-32" alt="logo" />
      <div className="absolute top-3/4 sm:top-1/2 right-2 lg:right-1/4 transform lg:translate-x-1/2 -translate-y-1/2 font-league-gothic">
        {props.credential.loginToken ?
          <div className={`flex flex-col relative justify-center items-center`}>
            <div className={`flex relative justify-between w-48 h-14 items-center ${classes.currency} z-10`}>
              <p></p>
              <p className="text-app-brown absolute left-2/3 top-1/2 transform -translate-x-full -translate-y-1/2">{showDot(props.credential.loginUserDoge)}</p>
              <button className="w-12 h-12">
                <img src={BtnPurchase} alt="plus" />
              </button>
            </div>
            <div className={`${classes.username} h-auto w-3/4 transform -translate-y-2 z-0 px-2 pb-2`}>
              <p className="text-app-yellow text-right w-10/12 mx-auto font-league-gothic" style={{ paddingTop: "1px" }}>User Name</p>
            </div>
          </div> :
          <Button
            justIcon
            color=""
            onClick={(e) => props.history.push("/")}
          >
            <AiOutlineLogin />
          </Button>}

      </div>
      <div className={classes.headerContainer}>
        <TopSection>
          <div className="row col-12 justify-content-between absolute">
            <PokerLogo />
            <div>
              {/* {props.credential.loginToken ? (
                <span className="d-flex mb-2" style={{ alignItems: "center" }}>
                  {props.credential.loginUserAvatar ? (
                    <img
                      src={`${apiConfig.api}/uploads/avatars/${props.credential.loginUserAvatar}`}
                      alt="A"
                      className={clsx(classes.userAvatar, "avatar-image")}
                    />
                  ) : (
                    <Avatar
                      className="avatar-image"
                      name={props.credential.loginUserName}
                      size={40}
                      color='#5D2900'
                      round="40px"
                    />
                  )}
                  <MoneyLabel text={showDot(props.credential.loginUserDoge)} />
                  <div onClick={(e) => handleDropDown(!showDropDown)}>
                    <LobbyMenuIcon />
                  </div>

                </span>
              ) : (
                <span className="d-flex mb-2" style={{ alignItems: "center" }}>
                  <Button
                    justIcon
                    color=""
                    onClick={(e) => props.history.push("/")}
                  >
                    <AiOutlineLogin />
                  </Button>
                </span>
              )} */}
            </div>
          </div>
        </TopSection>
      </div>
      <div className={`row justify-content-between ${classes.tabs} w-1/2 md:w-1/3 xl:w-1/4 ml-6 xl:ml-9`}>
        <div>{!props.hideTabs && <MainTabs></MainTabs>}</div>
        {/* <Spacer className={!props.hideTabs ? "" : ""} spacing="1rem" elements="2"> */}

        {/* </Spacer> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  credential: state.LoginReducer,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      LogOutSuccess: global.Actions.LoginAction.LogOutSuccess,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LobbyHeader)
);
