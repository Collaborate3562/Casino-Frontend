import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import HomePageLayoutContainer from "../../Components/HomePage/HomePageLayoutContainer";
import Button from "../../StyledComponents/Button";
import TextLarge from "../../StyledComponents/TextLarge";
import Web3 from "web3";
import { withRouter } from "react-router-dom";
import { Box } from "@material-ui/core";
import useWeb3 from "../../hooks/useWeb3";
import handleToast, { success } from "../../Components/toast";

const HomePage = ({ credential, LoginSuccess, LogOutSuccess }) => {
  const web3 = useWeb3();
  const history = useHistory();
  const [account, setAccount] = useState(null);
  const { apiConfig, ApiCall } = global;

  let [userName, setUserName] = useState("");

  useEffect(() => {
    console.log("credential", credential);
    if (credential && credential.loginToken) {
      history.push("/lobby");
    }
  }, [credential]);

  const handleLogin = async (address) => {
    const payLoad = {
      username: address,
      password: address,
      forceLogin: false,
      appVersion: "1.0",
      device_id: "n/a",
      AppId: "",
      fcmId: "",
      os: "other",
      productName: "BytePoker",
    };

    try {
      const response = await ApiCall(
        apiConfig[apiConfig.currentEnv],
        apiConfig.authenticate.url,
        apiConfig.authenticate.method,
        "",
        payLoad
      );
      if (response.status === 200) {
        LoginSuccess(response.data);
      } else {
        handleToast(response.data.message);
        LogOutSuccess();
      }
    } catch (error) {
      if (error.response) handleToast(error.response.data.message);
      else handleToast("Request Failed!");
      LogOutSuccess();
    }
  };

  const connectWallet = async () => {
    const accounts = await web3.eth.requestAccounts();
    const networkId = await web3.eth.net.getId();
    console.log(networkId);
    if (networkId != process.env.REACT_APP_CHAIN_ID) {
      handleToast("Please change network to Polygon");
      // window.location.reload();
      return;
    }
    handleLogin(accounts[0]);
  };

  useEffect(() => {
    console.log(credential);
    if (credential && credential.loginToken) {
      history.push("/lobby");
    }
  }, [credential]);

  return (
    <HomePageLayoutContainer>
      {/* <Button
        onClick={() => history.push("/signup")}
        variant="green"
        style={{ margin: "1.25rem 0" }}
      >
        <TextLarge>Create Account</TextLarge>
      </Button>
      <Button
        onClick={() => history.push("/login")}
        variant="blue"
        style={{ margin: "0.4rem 0" }}
      >
        <TextLarge>LOGIN</TextLarge>
      </Button>
      <Button variant="red" onClick={() => history.push("/lobby")}>
        <TextLarge>GUEST</TextLarge>
      </Button>

      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <Button variant="red" onClick={() => _connectWallet()}>
          <TextLarge>Connect Wallet</TextLarge>
        </Button>

      </Box>
      {
        account !== null &&
        <p>0x26ef907dd7f33bdc49e9fbc42ab2ac9d7147c51d</p>
      } */}
      <Button
        onClick={connectWallet}
        variant="blue"
        style={{ margin: "0.4rem 0" }}
      >
        <TextLarge>Connect MetaMask</TextLarge>
      </Button>
      <Button variant="red" onClick={() => history.push("/lobby")}>
        <TextLarge>GUEST</TextLarge>
      </Button>
    </HomePageLayoutContainer>
  );
};
const mapStateToProps = (state) => {
  const { LoginReducer } = state;
  return { credential: LoginReducer };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      LoginSuccess: global.Actions.LoginAction.LoginSuccess,
      LogOutSuccess: global.Actions.LoginAction.LogOutSuccess,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
