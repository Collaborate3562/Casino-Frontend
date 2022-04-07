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
import logo from "images/about.png";

const useStyles = makeStyles(modalStyle);

const AboutModal = ({ aboutModal, setAboutModal }) => {
  const classes = useStyles();

  const cancelModal = () => {
    setAboutModal(false);
  };
  return (
    <Modal
      aria-labelledby="transition-feedback-title"
      aria-describedby="transition-feedback-description"
      open={aboutModal}
      onClose={cancelModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
    >
      <Fade in={aboutModal}>
        <div className={classes.modal_paper}>
          <h4 className={classes.modal_title}>
            About
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
              <img src={logo} className={classes.modal_logo} />
            </Grid>{" "}
            <Grid container spacing={3} className="mt-5">
              Created by LILITH community members, LILITH .POKER is the first poker
              room created for a DAO. Our goal is to create a use-case and an
              opportunity to showcase the potential of LILITH. Play for FREE on
              our testnet or for real LILITH on mainnet!
            </Grid>{" "}
            <Grid container spacing={3} className="mt-4">
              <h5>LILITH.POKER:</h5>
            </Grid>{" "}
            <Grid container spacing={3} className="mt-2">
            <p>
              •Instantly jump into a No Limit Texas Hold'em cash game or SitnGo,
              playing for real LILITH</p>
              <p>
              •New players are
              automatically awarded 100 credits to play with, or come ask for
              LILITH on our Discord server</p>
              <p>
               • NO KYC – Deposits after 1
              confirmation & Withdraw after 6 confirmation
              </p>
              <p>
               •Each chip is worth
              one credits (1/100 of a LILITH)</p>
            </Grid>{" "}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default AboutModal;
