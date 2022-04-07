import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { AiOutlineClose } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import handleToast, { success } from "Components/toast";
import Button from "Components/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import modalStyle from "jss/modalStyle";

const useStyles = makeStyles(modalStyle);

const WithdrawalModal = ({
  withdrawalModal,
  setWithdrawalModal,
  setWithdrawalListModal,
  credential,
  DOGEChange,
  walletAddressChange,
}) => {  
  const classes = useStyles();
  const { apiConfig, ApiCall } = global;
  const [doge, setDOGE] = useState(0);
  const [password, setPassword] = useState("");
  const requestWithdrawal = async () => {
    if (doge < 10000) {
      handleToast("More than 10,000 credits allowed to withdraw!");
      return;
    }
    if (credential.loginUserWalletAddress == "") {
      handleToast("Iuput your wallet address!");
      return;
    }
    const payLoad = {
      doge,
      wallet: credential.loginUserWalletAddress,
      password,
    };
    try {
      const response = await ApiCall(
        apiConfig[apiConfig.currentEnv],
        apiConfig.withdrawal.url,
        apiConfig.withdrawal.method,
        credential.loginToken,
        payLoad
      );
      if (response.status === 200) {
        handleToast(response.data.message, success);
        DOGEChange(response.data.doge);
      } else {
        handleToast(response.data.error);
      }
    } catch (error) {
      if (error.response) handleToast(error.response.data.error);
      else handleToast("Request Failed!");
    }
    setPassword("");
  };
  const cancelModal = () => {
    setPassword("");
    setWithdrawalModal(false);
  };
  return (
    <Modal
        aria-labelledby="transition-withdrawal-title"
        aria-describedby="transition-withdrawal-description"
        open={withdrawalModal}
        onClose={cancelModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
      >
        <Fade in={withdrawalModal}>
          <div className={classes.modal_paper}>
            <h4 className={classes.modal_title}>
              Withdraw
              <Button
                simple
                round
                justIcon
                className={classes.modal_close}
                onClick={cancelModal}
              >
                <AiOutlineClose />
              </Button>
            </h4>
            <div className={classes.modal_body}>
            <Grid container spacing={3}>
              <Grid item className={classes.modal_center}>
                Input your LILITH wallet address and the amount to withdraw below
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4} className={classes.modal_label}>
                Address:
              </Grid>
              <Grid item xs={8} className={classes.modal_field}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="standard-password-input"
                    label="Address"
                    type="text"
                    autoComplete="wallet address"
                    InputProps={{
                      value: credential.loginUserWalletAddress,
                      onChange: (e) => {
                        walletAddressChange(e.target.value);
                      },
                    }}
                  />{" "}
                </FormControl>
              </Grid>
            </Grid>{" "}
            <Grid container spacing={3}>
              <Grid item xs={4} className={classes.modal_label}>
              LILITH ( credits ):
              </Grid>
              <Grid item xs={8} className={classes.modal_field}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="standard-doge-input"
                    label="Amount"
                    type="number"
                    autoComplete="credits"
                    InputProps={{
                      value: doge,
                      onChange: (e) => setDOGE(e.target.value),
                    }}
                  />{" "}
                </FormControl>
              </Grid>
            </Grid>{" "}
            <Grid container spacing={3}>
              <Grid item xs={4} className={classes.modal_label}>
                Password:
              </Grid>
              <Grid item xs={8} className={classes.modal_field}>
                <FormControl className={classes.formControl}>
                  <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete=""
                    InputProps={{
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                    }}
                  />{" "}
                </FormControl>
              </Grid>
            </Grid>{" "}
            <Grid container spacing={3} className="mt-3">
              <Button
                color="doge1Color"
                style={{ margin: "auto auto" }}
                onClick={requestWithdrawal}
              >
                Withdraw
              </Button>
            </Grid>
            <Grid container spacing={3} className="mt-3">
            <Button
              style={{ margin: "auto auto" }}
              onClick={() => {
                setWithdrawalModal(false);
                setWithdrawalListModal(true);
              }}
            >
              Transaction History
            </Button>
          </Grid>
        </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default WithdrawalModal;
