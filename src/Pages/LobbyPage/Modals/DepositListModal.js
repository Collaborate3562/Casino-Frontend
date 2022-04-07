import { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineCopy } from "react-icons/ai";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import handleToast from "Components/toast";
import Button from "Components/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import modalStyle from "jss/modalStyle";
import CustomTable from "Components/CustomTable";
const useStyles = makeStyles(modalStyle);

const DepositListModal = ({
  depositListModal,
  setDepositListModal,
  credential,
}) => {
  const classes = useStyles();
  const { apiConfig, ApiCall } = global;
  const [recharges, setRecharges] = useState([]);
  const cancelModal = () => {
    setDepositListModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiCall(
          apiConfig[apiConfig.currentEnv],
          apiConfig.getRecharge.url,
          apiConfig.getRecharge.method,
          credential.loginToken
        );
        if (response.status === 200) {
          setRecharges(response.data);
          
        } else {
          handleToast(response.data.error);
        }
      } catch (error) {
        if (error.response) handleToast(error.response.data.error);
        else handleToast("Request Failed!");
      }
    })();
    return () => {};
  }, []);
  return (
    <Modal
      aria-labelledby="transition-recharge-list-title"
      aria-describedby="transition-recharge-list-description"
      open={depositListModal}
      onClose={cancelModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      className={classes.modal}
    >
      <Fade in={depositListModal}>
        <div className={classes.modal_paper}>
          <h4 className={classes.modal_title}>
            Recharge List
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
              <CustomTable
                headCells={[
                  {
                    id: "txid",
                    numeric: false,
                    disablePadding: false,
                    label: "TxID",
                  },
                  {
                    id: "amount",
                    numeric: true,
                    disablePadding: false,
                    label: "Amount",
                  },
                  {
                    id: "confirmations",
                    numeric: true,
                    disablePadding: false,
                    label: "Confirms",
                  },
                  {
                    id: "createdAt",
                    numeric: true,
                    disablePadding: false,
                    label: "Date",
                  }
                ]}
                rows={recharges}
                selectable={false}
                toolbar={false}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} className="mt-3">
            <Button
              color="success"
              style={{ margin: "auto auto" }}
              onClick={cancelModal}
            >
              OK
            </Button>
          </Grid>
        </div>
          </div>
      </Fade>
    </Modal>
  );
};

export default DepositListModal;
