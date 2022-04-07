import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import io from "socket.io-client";
import BackgroundPageWrapper from "../../StyledComponents/BackgroundPageWrapper";
import LobbyHeader from "./LobbyHeader";
import CashTable from "./CashTable";
import Tournament from "./Tournament";
import SitInGo from "./SitnGo";
import handleToast, { success } from "../../Components/toast";
import SecurityModal from "Pages/LobbyPage/Modals/SecurityModal";
import ProfileModal from "Pages/LobbyPage/Modals/ProfileModal";
import WithdrawalModal from "Pages/LobbyPage/Modals/WithdrawalModal";
import WithdrawalListModal from "Pages/LobbyPage/Modals/WithdrawalListModal";
import DepositListModal from "Pages/LobbyPage/Modals/DepositListModal";
import DepositModal from "Pages/LobbyPage/Modals/DepositModal";
import AffiliateModal from "Pages/LobbyPage/Modals/AffiliateModal";
import FeedbackModal from "Pages/LobbyPage/Modals/FeedbackModal";
import AboutModal from "Pages/LobbyPage/Modals/AboutModal";

const LobbyPage = (props) => {
  const { apiConfig, ApiCall } = global;

  const [socket, setSocket] = useState("");
  const [cashGames, setCashGames] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [sitGames, setSitGames] = useState([]);
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawalModal, setWithdrawalModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [affiliateModal, setAffiliateModal] = useState(false);
  const [securityModal, setSecurityModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);



  const [aboutModal, setAboutModal] = useState(false);

  const [depositListModal, setDepositListModal] = useState(false);
  const [withdrawalListModal, setWithdrawalListModal] = useState(false);
  const [cashRakes, setCashRakes] = useState('');
  const [sitRakes, setSitRakes] = useState('');

  useEffect(() => {
    (async () => {
      try {
        let response = await ApiCall(
          apiConfig.api,
          apiConfig.sitRakes.url,
          apiConfig.sitRakes.method,
        );
        if (response.status === 200) {
          setSitRakes(response.data);
        } else {
          handleToast(response.data.error);
        }
        response = await ApiCall(
          apiConfig.api,
          apiConfig.cashRakes.url,
          apiConfig.cashRakes.method,
        );
        if (response.status === 200) {
          setCashRakes(response.data);
        } else {
          handleToast(response.data.error);
        }
      } catch (error) {
        if (error.response) handleToast(error.response.data.error);
        else handleToast("Request Failed!");
      }
    })();
    return () => {
    }
  }, [])
  useEffect(() => {
    if (props.credential.loginToken) {
      setSocket(
        io(apiConfig.endPoint, {
          auth: {
            token: props.credential.loginToken,
          },
        })
      );
      if (!props.credential.loginUserDepositAddress) {
        (async () => {
          try {
            const response = await ApiCall(
              apiConfig[apiConfig.currentEnv],
              apiConfig.wallet.url,
              apiConfig.wallet.method,
              props.credential.loginToken
            );
            if (response.status === 200) {
              props.depositAddressChange(response.data.wallet);
            } else {
              handleToast(response.data.error);
            }
          } catch (error) {
            if (error.response) handleToast(error.response.data.error);
            else handleToast("Request Failed!");
          }
        })();
      }
    } else {
      setSocket(io(apiConfig.endPoint));
    }
  }, [props.credential.loginToken]);
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        // when connection started
        console.log("connect");
        socket.emit("lobby", (res) => {
          props.DOGEChange(res.doge);
          setCashGames(
            res.cashGames.map((ele) => {
              ele.current =
                ele.players.findIndex(
                  (ele1) => ele1 == props.credential.loginUserId
                ) > -1
                  ? true
                  : false;
              return ele;
            })
          );
          setTournaments(
            res.tournaments.map((ele) => {
              ele.current =
                ele.players.findIndex(
                  (ele1) => ele1 == props.credential.loginUserId
                ) > -1
                  ? true
                  : false;
              return ele;
            })
          );
          setSitGames(
            res.sitGames.map((ele) => {
              ele.current =
                ele.players.findIndex(
                  (ele1) => ele1 == props.credential.loginUserId
                ) > -1
                  ? true
                  : false;
              return ele;
            })
          );
        });
      });
      socket.on("connect_error", (err) => {
        console.error(err.message);
      });
      socket.on("message", (res) => {
        if (res.message) {
          handleToast(res.message, success);
        }
        if (res.doge) {
          props.DOGEChange(res.doge);
        }
      });
      socket.on("cash:lobby", (res) => {
        setCashGames(
          res.cashGames.map((ele) => {
            ele.current =
              ele.players.findIndex(
                (ele1) => ele1 == props.credential.loginUserId
              ) > -1
                ? true
                : false;
            return ele;
          })
        );
      });
      socket.on("sit:lobby", (res) => {
        setSitGames(
          res.sitGames.map((ele) => {
            ele.current =
              ele.players.findIndex(
                (ele1) => ele1 == props.credential.loginUserId
              ) > -1
                ? true
                : false;
            return ele;
          })
        );
      });
    }
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);
  console.log(cashGames);
  return (
    <BackgroundPageWrapper>
      <div className="flex flex-col h-full">

        <LobbyHeader

        />
        {props.currentTab === props.tabList[0] ? (
          <CashTable cashGames={cashGames} socket={socket} cashRakes={cashRakes}
            setDepositModal={setDepositModal}
            setWithdrawalModal={setWithdrawalModal}
            setProfileModal={setProfileModal}
            setSecurityModal={setSecurityModal}
            setAffiliateModal={setAffiliateModal}
            setFeedbackModal={setFeedbackModal}
            setAboutModal={setAboutModal} />
        ) : props.currentTab === props.tabList[1] ? (
          <SitInGo sitGames={sitGames} socket={socket} sitRakes={sitRakes} />
        ) : props.currentTab === props.tabList[2] ? (
          <Tournament tournaments={tournaments} socket={socket} />
        ) : null}
      </div>

      <DepositModal
        depositModal={depositModal}
        setDepositModal={setDepositModal}
        setDepositListModal={setDepositListModal}
        credential={props.credential}
      />
      <WithdrawalModal
        withdrawalModal={withdrawalModal}
        setWithdrawalModal={setWithdrawalModal}
        setWithdrawalListModal={setWithdrawalListModal}
        credential={props.credential}
        DOGEChange={props.DOGEChange}
        walletAddressChange={props.walletAddressChange}
      />
      <WithdrawalListModal
        withdrawalListModal={withdrawalListModal}
        setWithdrawalListModal={setWithdrawalListModal}
        credential={props.credential}
      />
      <DepositListModal
        depositListModal={depositListModal}
        setDepositListModal={setDepositListModal}
        credential={props.credential}
      />
      <ProfileModal
        profileModal={profileModal}
        setProfileModal={setProfileModal}
        credential={props.credential}
        photoChange={props.photoChange}
      />
      <SecurityModal
        securityModal={securityModal}
        setSecurityModal={setSecurityModal}
        credential={props.credential}
      />
      <AffiliateModal
        affiliateModal={affiliateModal}
        setAffiliateModal={setAffiliateModal}
        credential={props.credential}
      />
      <FeedbackModal
        feedbackModal={feedbackModal}
        setFeedbackModal={setFeedbackModal}
        SetEmail={props.SetEmail}
        credential={props.credential}
      />
      <AboutModal
        aboutModal={aboutModal}
        setAboutModal={setAboutModal}
      />
    </BackgroundPageWrapper>
  );
};

const mapStateToProps = (state) => ({
  currentTab: state.LobbyReducer.currentTab,
  tabList: state.LobbyReducer.tabList,
  credential: state.LoginReducer,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      DOGEChange: global.Actions.LoginAction.DOGEChange,
      walletAddressChange: global.Actions.LoginAction.WalletAddressChange,
      depositAddressChange: global.Actions.LoginAction.DepositAddressChange,
      photoChange: global.Actions.LoginAction.PhotoChange,
      SetEmail: global.Actions.LoginAction.SetEmail,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LobbyPage)
);
