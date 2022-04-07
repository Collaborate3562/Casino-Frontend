const INITIAL_STATE = {
  loginUserId: "",
  loginToken: "",
  loginUserDoge: 0,
  loginUserName: "",
  loginUserEmail: "",
  loginUserRole: "",
  loginUserWalletAddress: "",
  loginUserDepositAddress: "",
  loginUserAvatar: "",
  loginUserLevel: "",
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  let loginUserId;
  let loginToken;
  let loginUserName;
  let loginUserRole;
  let loginUserDoge;
  let loginUserWalletAddress;
  let loginUserDepositAddress;
  let loginUserAvatar;
  let loginUserLevel;
  let loginUserEmail;
  let data;

  switch (action.type) {
    case "LOGIN_SUCCESS":
      data = action.loginData;
      loginUserId = data.userInfo.id;
      loginToken = data.token;
      loginUserName = data.userInfo.username;
      loginUserLevel = data.userInfo.level;
      loginUserDoge = data.userInfo.doge;
      loginUserRole = data.userInfo.role;
      loginUserDepositAddress = data.userInfo.address;
      loginUserWalletAddress = data.userInfo.my_address;
      loginUserAvatar = data.userInfo.profilePhoto;
      return {
        ...state,
        loginUserId,
        loginToken,
        loginUserName,
        loginUserDoge,
        loginUserRole,
        loginUserDepositAddress,
        loginUserWalletAddress,
        loginUserAvatar,
        loginUserLevel,
      };
    case "DOGE_CHANGE":
      return {
        ...state,
        loginUserDoge: action.loginUserDoge,
      };

    case "DEPOSIT_ADDRESS_CHNAGE":
      return {
        ...state,
        loginUserDepositAddress: action.loginUserDepositAddress,
      };

    case "WALLET_ADDRESS_CHNAGE":
      return {
        ...state,
        loginUserWalletAddress: action.loginUserWalletAddress,
      };
    case "PHOTO_CHANGE":
      return {
        ...state,
        loginUserAvatar: action.loginUserAvatar,
      };
    case "SET_EMAIL":
      return {
        ...state,
        loginUserEmail: action.loginUserEmail,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
export default LoginReducer;
