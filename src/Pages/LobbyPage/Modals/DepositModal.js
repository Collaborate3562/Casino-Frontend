import { useRef } from "react";
import QRCode from "react-qr-code";
import { AiOutlineClose, AiOutlineCopy } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import handleToast, { success } from "Components/toast";
import Button from "Components/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import modalStyle from "jss/modalStyle";

const useStyles = makeStyles(modalStyle);

const DepositModal = ({ depositModal, setDepositModal, credential, setDepositListModal }) => {
  const reference = useRef();
  const classes = useStyles();
  const copyAddress = () => {
    const tmp_tag = document.createElement("input");
    tmp_tag.value = credential.loginUserDepositAddress;
    reference.current.appendChild(tmp_tag);
    tmp_tag.select();
    document.execCommand("copy");
    reference.current.removeChild(tmp_tag);
    handleToast("Address copied!", success);
  };
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={depositModal}
        onClose={() => setDepositModal(!depositModal)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={classes.modal}
      >
        <Fade in={depositModal}>
          <div className={classes.modal_paper}>
            <h4 className={classes.modal_title}>
              Deposit
              <Button
                simple
                round
                justIcon
                className={classes.modal_close}
                onClick={() => setDepositModal(false)}
              >
                <AiOutlineClose />
              </Button>
            </h4>
            <div className={classes.modal_body}>
            <Grid container spacing={3}>
              <Grid item className={classes.modal_center}>
                Deposit LILITH to the address below
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item className={classes.modal_center}>
                <QRCode
                  value={
                    credential.loginUserDepositAddress
                      ? credential.loginUserDepositAddress
                      : ""
                  }
                  size={128}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item className={classes.modal_center}>
                <span className={classes.modal_address}>
                  {credential.loginUserDepositAddress}
                </span>{" "}
                <Button color="doge1Color" round justIcon onClick={copyAddress}>
                  <AiOutlineCopy />
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item className={classes.modal_center}>
                1 LILITH = 100M credits
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item className={classes.modal_center}>
                1 confirmation required.
              </Grid>
            </Grid>
            <Grid container spacing={3}>
                  <Grid item className={classes.modal_center}>
                    <Button onClick={()=>{setDepositModal(false); setDepositListModal(true);}}>Transaction History</Button>
              </Grid>
            </Grid>
            <div ref={reference}></div>
          </div>
          </div>
        </Fade>
      </Modal>
  );
};

export default DepositModal;
