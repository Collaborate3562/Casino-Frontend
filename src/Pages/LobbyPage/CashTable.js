import styled from "styled-components";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider, { SliderThumb } from '@mui/material/Slider';
import handleToast, { success } from "../../Components/toast";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ValueLabelComponent from 'Components/ValueLabelComponent';
import {
  blindsList,
  turnTimeList,
  cashTableSizeList,
  maxTimeBankList,
} from "../../shared/constants";
import {
  AiOutlineClose,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiTwotoneLock,
  AiOutlineCheck,
} from "react-icons/ai";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "../../Components/Button";
import Checkbox from "@material-ui/core/Checkbox";
import {
  showKilo,
  showTurnTime,
  showTableSize,
  showMaxTimeBank,
} from "../../shared/printConfig";
import { makeStyles } from "@material-ui/core/styles";
import lobbyStyle from "../../jss/pages/lobbyStyle";
import Accordion from "./ModalSelect";

import tableBg from '../../images/table_bg.png'
import tableHeader from '../../images/table_header.png'
import tableFooter from '../../images/table_footer.png'
import thBg from '../../images/th_bg.png'
import btnCreate from "../../images/btn_create.png"
import btnMenu from "../../images/btn_menu.png"
import PopupBg from '../../images/bg_menu.png'
import btnTableCreate from '../../images/btn_table_create.png'
import repeatBottom from '../../images/repeat_bottom.png'
import repeatTop from '../../images/repeat_top.png'
import repeatLeft from '../../images/repeat_left.png'
import repeatRight from '../../images/repeat_right.png'
import leftTop from '../../images/left_top.png'
import leftBottom from '../../images/left_bottom.png'
import rightTop from '../../images/right_top.png'
import rightBottom from '../../images/right_bottom.png'
import dragonHead from '../../images/dragon_head.png'
import btnClose from '../../images/btn_close.png'
import bgModal from '../../images/bg_modal.png'
import effectTop from '../../images/effect_top.png'
import effectBottom from '../../images/effect_bottom.png'
import checked from '../../images/checked.png'
import unchecked from '../../images/unchecked.png'
import skull from '../../images/skull.png'


const useStyles = makeStyles(lobbyStyle);

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position:relative;
  height:100%;
  width: 100%;
  padding:0px 12px 0px 12px;
`;

const TableHeadRow = styled.div`
  display: flex;
  width: 100%;
  color: #ffffff;
  justify-content: flex-start;
  cursor: pointer;
  margin-bottom:12px;
`;
const TableItem = styled.div`
  text-transform: uppercase;
  font-size: 0.75rem;
  padding: 0.75rem 0;
  text-align: center;
  width: 20%;
`;

export const TableHeadItem = styled(TableItem)`
  color: #40040a;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  font-family:"league-gothic";
  font-size: 30px;
`;

const TableRow = styled(TableHeadRow)`
  background: transparent;
  color: #ffffff;
  cursor: pointer;
  :hover {
    background: #eba01e;
  }
`;

const headings = ["Name", "Blinds", "Buy In", "Turn Time", "Seats"];


const AirbnbThumbComponent = React.memo((props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <img src={skull} />
    </SliderThumb>
  );
})


const CashTable = (props) => {
  const history = useHistory();
  const { apiConfig } = global;
  const classes = useStyles();
  const [createModal, setCreateModal] = React.useState(false);
  const [sort, setSort] = useState("");
  const [blinds, setBlinds] = useState(blindsList[0]);
  const [turnTime, setTurnTime] = useState(turnTimeList[0]);
  const [tableSize, setTableSize] = useState(9);
  const [limit, setLimit] = useState(false);
  const [maxTimeBank, setMaxTimeBank] = useState(maxTimeBankList[0]);
  const [buyIn, setBuyIn] = useState([50, 500]);
  const [buyInRange, setBuyInRange] = useState([50, 500]);
  const [privacy, setPrivacy] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tableItems, setTableItems] = useState(props.cashGames);
  const [openMenu, setOpenMenu] = useState(false)
  const handleSort = (text) => {
    if (sort.name === text) {
      setSort({
        name: text,
        type: !sort.type,
      });
    } else {
      setSort({
        name: text,
        type: true,
      });
    }
  };
  useEffect(() => {
    setTableItems(props.cashGames);
  }, [props.cashGames]);

  useEffect(() => {
    setBuyIn([blinds * 50, blinds * 500]);
    setBuyInRange([blinds * 50, blinds * 500]);
  }, [blinds]);

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(tableItems));
    if (data.length > 0) {
      data.sort((a, b) => {
        if (sort.name === "Name") {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          if (sort.type) {
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          } else {
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          }
        } else if (sort.name === "Blinds") {
          var x = a.blinds;
          var y = b.blinds;
          if (sort.type) {
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          } else {
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          }
        } else if (sort.name === "Buy In") {
          var x = a.buyIn[0];
          var y = b.buyIn[0];
          if (sort.type) {
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          } else {
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          }
        } else if (sort.name === "Turn Time") {
          var x = a.turnTime;
          var y = b.turnTime;
          if (sort.type) {
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          } else {
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          }
        } else if (sort.name === "Seats") {
          var x = parseInt(a.playersCount);
          var y = parseInt(b.playersCount);
          if (sort.type) {
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          } else {
            if (x < y) {
              return 1;
            }
            if (x > y) {
              return -1;
            }
            return 0;
          }
        } else
          return 1;
      });
      setTableItems(data);
    }
  }, [sort]);
  const createTable = () => {
    if (!name) {
      handleToast("Please specify a name");
      return;
    }
    console.log({
      name,
      blinds,
      turnTime,
      tableSize,
      limit,
      maxTimeBank,
      buyIn,
      privacy,
      password,
    });
    props.socket.emit("cash:create", {
      name,
      blinds,
      turnTime,
      tableSize,
      limit,
      maxTimeBank,
      buyIn,
      privacy,
      password,
    }, (res) => {
      if (res.status == true) {
        props.DOGEChange(res.doge);
        history.push("/games/cash/" + res.id);
      } else {
        handleToast(res.message);
      }
      setCreateModal(false);
    });
  };
  const goToGames = (id) => {
    history.push("/games/cash/" + id);
  };

  const customStyles = makeStyles((theme) => ({
    cashTable: {
      background: `url(${tableBg})`,
      backgroundRepeat: 'repeat-y',
      backgroundSize: "contain"
    },
    menuItem: {
      width: "100%",
      cursor: "pointer",
      textAlign: "center",
      border: "#d19246",
      borderStyle: "none  none solid none",
      borderWidth: "1px",
      fontFamily: "league-gothic",
      fontSize: "30px",
      color: '#a7745f',
      textTransform: "uppercase",
      letterSpacing: " 0.1em",
      "&:hover": {
        color: '#ffe5bd',
        backgroundImage: "linear-gradient(90deg, #a7745f 5%, #00000000 50%, #a7745f 95%)",
      },
    },
    noBorder: {
      border: "none"
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    popUp: {
      background: `url(${PopupBg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "285px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0px 16px 0px 16px"
    },
    modal: {
      background: `url(${tableBg})`,
      backgroundRepeat: 'repeat-y',
      backgroundSize: "contain"
    },
    repeaterBottom: {
      background: `url(${repeatBottom})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: "contain"
    },
    repeaterTop: {
      background: `url(${repeatBottom})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: "contain"
    },
    repeaterLeft: {
      background: `url(${repeatRight})`,
      backgroundRepeat: 'repeat-y',
      backgroundSize: "contain"
    },
    repeaterRight: {
      background: `url(${repeatRight})`,
      backgroundRepeat: 'repeat-y',
      backgroundSize: "contain"
    }
  }))

  const customClasses = customStyles()

  const handleHistory = (router) => {
    props.history.push(router);
  };
  const logOut = () => {
    props.LogOutSuccess();
    handleHistory("/");
  };

  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };

  const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#ffca79',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
      height: 27,
      width: 27,
      backgroundColor:"#00000000",
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
      '& .airbnb-bar': {
        height: 9,
        width: 1,
        marginLeft: 1,
        marginRight: 1,
      },
    },
    '& .MuiSlider-track': {
      color: '#ffca79',
      height: 3,
    },
    '& .MuiSlider-rail': {
      color: '#d8d8d8',
      opacity: 1,
      height: 3,
    },
  }));

  

  return (
    <div className={`relative h-full ${customClasses.cashTable}`}>
      <img src={thBg} alt="back" className="w-full top-0 h-12" />
      <img src={tableHeader} className="absolute top-0 w-full transform -translate-y-1/3" />
      <img src={tableFooter} className="absolute bottom-0 w-full h-auto" />
      <div className="absolute top-0 w-full h-full">
        <TableWrapper>
          <TableHeadRow>
            {headings.map((text, i) => (
              <div key={i} onClick={(e) => handleSort(text)} className="h-12 text-center justify-center text-xl md:text-3xl uppercase text-app-brown w-full items-center flex font-league-gothic">
                {text}
                {sort.name === text ? (
                  sort.type === true ? (
                    <AiOutlineArrowUp style={{
                      color: "#40040a"
                    }} />
                  ) : (
                    <AiOutlineArrowDown style={{
                      color: "#40040a"
                    }} />
                  )
                ) : (
                  ""
                )}
              </div>
            ))}
          </TableHeadRow>
          <div className="overflow-y-scroll mb-28 z-50">
            {tableItems ?
              tableItems.map((ele) => {
                const item = {};
                item.id = ele.id;
                item.privacy = ele.privacy;
                item.current = ele.current;
                item.name = ele.name;
                item.blinds =
                  showKilo(ele.blinds) +
                  "/" +
                  showKilo(ele.blinds === 2 ? 5 : ele.blinds * 2);
                item.buyIn = showKilo(ele.buyIn[0]);
                item.turnTime = showTurnTime(ele.turnTime);
                item.tableSize = ele.playersCount + "/" + ele.tableSize;
                item.limit = ele.limit;
                return item;
              })
                .map((item, i) => (
                  <div key={item.id} className="flex text-app-yellow border-2 border-app-yellow rounded-md hover:bg-white hover:bg-opacity-25 cursor-pointer my-1 mr-1">
                    <div className="w-1/5 uppercase text-app-yellow font-league-gothic p-2 text-center text-lg" onClick={() => goToGames(item.id)}>
                      {item.current ? <AiOutlineCheck /> : ""}{" "}
                      {item.privacy ? <AiTwotoneLock /> : ""}{" "}
                      {item.name + " "}
                      {item.limit ? <small style={{ fontWeight: '100', fontStyle: 'italic', fontSize: '10px' }}>( Pot limited )</small> : ""}
                    </div>
                    <div className="w-1/5 uppercase text-app-yellow font-league-gothic p-2 text-center text-lg" onClick={() => goToGames(item.id)}>
                      {item.blinds}
                    </div>
                    <div className="w-1/5 uppercase text-app-yellow font-league-gothic p-2 text-center text-lg" onClick={() => goToGames(item.id)}>
                      {item.buyIn}
                    </div>
                    <div className="w-1/5 uppercase text-app-yellow font-league-gothic p-2 text-center text-lg" onClick={() => goToGames(item.id)}>
                      {item.turnTime}
                    </div>
                    <div className="w-1/5 uppercase text-app-yellow font-league-gothic p-2 text-center text-lg" onClick={() => goToGames(item.id)}>
                      {item.tableSize}
                    </div>
                  </div>
                )) : ''}
          </div>
          <hr />
          <div className="absolute bottom-0 transform -translate-y-1/2 w-60 sm:w-72 left-1/2 -translate-x-1/2 flex gap-2">
            <div onClick={() => setCreateModal(true)} className="cursor-pointer">
              <img src={btnCreate} alt="create table" />
            </div>
            <div onClick={() => setOpenMenu(!openMenu)} className="relative cursor-pointer">
              <img src={btnMenu} alt="menu button" />

            </div>
          </div>
          <Backdrop
            className={customClasses.backdrop}
            open={openMenu}
            onClick={(e) => setOpenMenu(!openMenu)}
          >
            <div
              className={`${customClasses.popUp}  ${openMenu ? "" : "d-none"} absolute bottom-0 transform -translate-y-32 sm:left-1/2 sm:-translate-x-8`}
            >
              <div className={customClasses.menuItem} onClick={() => props.setProfileModal(true)}>
                Profile
              </div>
              <div className={customClasses.menuItem} onClick={() => props.setDepositModal(true)}>
                Deposit
              </div>
              <div className={customClasses.menuItem} onClick={() => props.setWithdrawalModal(true)}>
                Withdraw
              </div>
              <div className={customClasses.menuItem} onClick={() => props.setSecurityModal(true)}>
                Security
              </div>
              <div className={customClasses.menuItem} onClick={() => props.setAffiliateModal(true)}>
                Affiliate
              </div>
              <div className={customClasses.menuItem} onClick={() => window.open(`${apiConfig.app}/fairness.htm`, "fairness")}>
                Fairness
              </div>
              <div className={customClasses.menuItem} onClick={() => props.setFeedbackModal(true)}>
                Feedback
              </div>
              <div className={customClasses.menuItem} onClick={() => props.setAboutModal(true)}>
                About
              </div>
              <div className={`${customClasses.menuItem} ${customClasses.noBorder}`} onClick={logOut}>Logout</div>
            </div>
          </Backdrop>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={createModal}
            onClose={() => setCreateModal(!createModal)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            className={classes.modal}
          >
            <Fade in={createModal}>
              {/* <div className={classes.modal_paper}> */}
              <div className="min-w-md w-2/3 pt-20 relative" >
                <img src={dragonHead} alt="dragon head" className="absolute w-48 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-40" />
                <button onClick={() => setCreateModal(false)}>
                  <img src={btnClose} alt="close" className="absolute right-0 transform translate-x-2 w-6 h-6 z-40" />
                </button>
                <div className={` text-white relative overflow-hidden`}>
                  <img src={bgModal} alt="modal back" className="w-full h-full absolute top-0 left-0 z-0" />
                  <div className={`${customClasses.repeaterBottom} w-full absolute h-2 bottom-0 left-0`}></div>
                  <div className={`${customClasses.repeaterTop} w-full absolute h-2 top-0 left-0 transform -translate-x-8`}></div>
                  <div className={`${customClasses.repeaterLeft} h-full absolute w-2 top-0 left-0`}></div>
                  <div className={`${customClasses.repeaterRight} h-full absolute w-2 top-0 right-0 transform translate-y-8`}></div>
                  <img src={leftTop} alt="left top" className="absolute left-0 top-0 w-8 h-8" />
                  <img src={rightTop} alt="right top" className="absolute right-0 top-0 w-8 h-8" />
                  <img src={leftBottom} alt="left bottom" className="absolute left-0 bottom-0 w-8 h-8" />
                  <img src={rightBottom} alt="right bottom" className="absolute right-0 bottom-0 w-8 h-8" />

                  {/* <h4 className={`art-text ${classes.modal_title}`}>
                    Create Table
                    <Button
                      simple
                      round
                      justIcon
                      className={classes.modal_close}
                      onClick={() => setCreateModal(false)}
                    >
                      <AiOutlineClose />
                    </Button>
                  </h4> */}

                  {/* <div className={classes.modal_body}> */}
                  <div className="flex flex-col gap-2 mt-12 items-center justify-center pb-4">
                    {/* <TextField
                      id="standard-full-width"
                      label="Table Name"
                      inputProps={{
                        style: { fontSize: "30px" },
                      }}
                      style={{ margin: 8, fontSize: "30px" }}
                      helperText="Max Length is 10 character"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        value: name,
                        onChange: (e) => setName(e.target.value),
                      }}
                    /> */}
                    <div className={`bg-black bg-opacity-30 rounded-md flex z-0 w-11/12 py-2 justify-center`}>
                      <div className="w-10/12 flex gap-4">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase">Table Name</p>
                        <div className="relative w-full">
                          <img src={effectTop} className="absolute top-0 w-1/5 right-0 transform -translate-y-1/2" />
                          <img src={effectTop} className="absolute top-0 w-1/5 right-1/2 transform -translate-y-1/2" />
                          <img src={effectTop} className="absolute bottom-0 w-1/5 left-0 transform translate-y-1/2 " />
                          <img src={effectTop} className="absolute bottom-0 w-1/5 left-1/2 transform translate-y-1/2" />

                          <input value={name} onChange={(e) => setName(e.target.value)} className="text-app-yellow-light font-league-gothic outline-none px-2 w-full bg-app-brown-light rounded-md border-app-yellow border-2" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-black bg-opacity-30 rounded-md flex z-0 w-11/12 py-2 md:justify-around flex-col md:flex-row gap-2 justify-center items-end pr-2" style={{ zIndex: 1 }}>
                      <div className="flex gap-4 items-center">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase">Blinds</p>
                        <div className="flex gap-4 items-center">
                          <div className="relative w-20 tiny:w-32 xl:w-60">
                            <img src={effectTop} className="absolute lg:block hidden right-0 top-0 transform -translate-y-1/2 w-1/2 z-10" />
                            <img src={effectBottom} className="absolute lg:block hidden left-0 bottom-0 translate-y-1/2 transform w-1/2 z-10" />
                            <Accordion autoclose={true} id="demo-blinds-select" className="bg-transparent rounded-md border-2 border-app-yellow outline-none relative" summary={<div className="px-2 truncate">{blinds}</div>}>
                              <img src={effectBottom} className="absolute translate-y-48 z-10 right-0 transform w-2/3" />
                              <div className="flex flex-col absolute h-full overflow-y-auto w-full mt-2 bg-app-brown-light bg-opacity-90 divide-y divide-app-yellow border-2 border-app-yellow rounded-md py-2 px-2 z-20" >
                                {blindsList.map((ele, key) => (
                                  <div
                                    onClick={() => { setBlinds(ele) }}
                                    className={`cursor-pointer mr-1 py-1 text-app-yellow-light`}
                                    key={key}
                                    value={ele}
                                  >
                                    {showKilo(ele)} / {showKilo(ele == 2 ? 5 : ele * 2)}
                                  </div>
                                ))}
                              </div>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase">Turn Time</p>
                        <div className="flex gap-4 items-center">
                          <div className="relative w-20 tiny:w-32 xl:w-60">
                            <img src={effectTop} className="absolute lg:block hidden right-0 top-0 transform -translate-y-1/2 w-1/2 z-10" />
                            <img src={effectBottom} className="absolute lg:block hidden left-0 bottom-0 translate-y-1/2 transform w-1/2 z-10" />
                            <Accordion autoclose={true} id="demo-turnTime-select" className="bg-transparent rounded-md border-2 border-app-yellow outline-none relative" summary={<div className="px-2 truncate">{turnTime}</div>}>
                              <img src={effectBottom} className="absolute translate-y-48 z-10 right-0 transform w-2/3" />
                              <div className="flex flex-col absolute h-full overflow-y-auto w-full mt-2 bg-app-brown-light bg-opacity-90 divide-y divide-app-yellow border-2 border-app-yellow rounded-md px-2 z-0" >
                                {turnTimeList.map((ele, key) => (
                                  <div
                                    onClick={() => { setTurnTime(ele) }}
                                    className={`cursor-pointer mr-1 py-1 text-app-yellow-light`}
                                    key={key}
                                    value={ele}
                                  >
                                    {showTurnTime(ele)}
                                  </div>
                                ))}
                              </div>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black bg-opacity-30 rounded-md flex z-0 w-11/12 py-2 md:justify-around flex-col md:flex-row gap-2 justify-center items-end pr-2">
                      <div className="flex gap-4 items-center">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase">Table Size</p>
                        <div className="flex gap-4 items-center">
                          <div className="relative w-20 tiny:w-20 xl:w-32">
                            <img src={effectTop} className="absolute lg:block hidden right-0 top-0 transform -translate-y-1/2 w-1/2 z-10" />
                            <img src={effectBottom} className="absolute lg:block hidden left-0 bottom-0 translate-y-1/2 transform w-1/2 z-10" />
                            <Accordion autoclose={true} id="demo-blinds-select" className="bg-transparent rounded-md border-2 border-app-yellow outline-none relative" summary={<div className="px-2 truncate">{tableSize}</div>}>
                              <img src={effectBottom} className="absolute translate-y-48 z-10 right-0 transform w-2/3" />
                              <div className="flex flex-col absolute h-full overflow-y-auto w-full mt-2 bg-app-brown-light bg-opacity-90 divide-y divide-app-yellow border-2 border-app-yellow rounded-md py-2 px-2 z-20" >
                                {cashTableSizeList.map((ele, key) => (
                                  <div
                                    onClick={() => { setTableSize(ele) }}
                                    className={`cursor-pointer mr-1 py-1 text-app-yellow-light`}
                                    key={key}
                                    value={ele}
                                  >
                                    {showTableSize(ele)}
                                  </div>
                                ))}
                              </div>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase">Limit</p>
                        <div className="flex gap-4 items-center">
                          <div className="relative w-20 tiny:w-20 xl:w-32">
                            <img src={effectTop} className="absolute lg:block hidden right-0 top-0 transform -translate-y-1/2 w-1/2 z-10" />
                            <img src={effectBottom} className="absolute lg:block hidden left-0 bottom-0 translate-y-1/2 transform w-1/2 z-10" />
                            <Accordion autoclose={true} id="demo-turnTime-select" className="bg-transparent rounded-md border-2 border-app-yellow outline-none relative" summary={<div className="px-2 truncate">{limit ? "Pot Limit" : "No Limit"}</div>}>
                              <img src={effectBottom} className="absolute translate-y-48 z-10 right-0 transform w-2/3" />
                              <div className="flex flex-col absolute h-full overflow-y-auto w-full mt-2 bg-app-brown-light bg-opacity-90 divide-y divide-app-yellow border-2 border-app-yellow rounded-md px-2 z-0" >
                                <div
                                  onClick={() => { setLimit(true) }}
                                  className={`cursor-pointer mr-1 py-1 text-app-yellow-light`}
                                >
                                  Pot Limit
                                </div>
                                <div
                                  onClick={() => { setLimit(false) }}
                                  className={`cursor-pointer mr-1 py-1 text-app-yellow-light`}
                                >
                                  No Limit
                                </div>
                              </div>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase">Max Time Bank</p>
                        <div className="flex gap-4 items-center">
                          <div className="relative w-20 tiny:w-20 xl:w-32">
                            <img src={effectTop} className="absolute lg:block hidden right-0 top-0 transform -translate-y-1/2 w-1/2 z-10" />
                            <img src={effectBottom} className="absolute lg:block hidden left-0 bottom-0 translate-y-1/2 transform w-1/2 z-10" />
                            <Accordion autoclose={true} id="demo-blinds-select" className="bg-transparent rounded-md border-2 border-app-yellow outline-none relative" summary={<div className="px-2 truncate">{maxTimeBank}</div>}>
                              <img src={effectBottom} className="absolute translate-y-48 z-10 right-0 transform w-2/3" />
                              <div className="flex flex-col absolute h-full overflow-y-auto w-full mt-2 bg-app-brown-light bg-opacity-90 divide-y divide-app-yellow border-2 border-app-yellow rounded-md py-2 px-2 z-20" >
                                {maxTimeBankList.map((ele, key) => (
                                  <div
                                    onClick={() => { setMaxTimeBank(ele) }}
                                    className={`cursor-pointer mr-1 py-1 text-app-yellow-light`}
                                    key={key}
                                    value={ele}
                                  >
                                    {showMaxTimeBank(ele)}
                                  </div>
                                ))}
                              </div>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-black bg-opacity-30 rounded-md flex z-0 w-11/12 py-2 md:justify-around flex-col md:flex-row gap-2 justify-center items-end pr-2">
                      <div className="flex gap-4 w-10/12">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase"> Buy In:</p>
                        <Grid item xs={8} className={classes.modal_field} style={{ overflow: 'visible' }}>
                          {/* <Slider
                            value={buyIn}
                            onChange={(e, val) => setBuyIn(val)}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            valueLabelcomponent={ValueLabelComponent}
                            getAriaValueText={val => showKilo(val)}
                            valueLabelFormat={val => showKilo(val)}
                            min={buyInRange[0]}
                            max={buyInRange[1]}
                            step={blinds < 100 ? 1 : blinds / 10}
                            color={"primary"}
                            className={classes.modal_slider}
                            components={{ Thumb:  <SliderThumb><img src={effectBottom} className="w-12 h-12"/></SliderThumb>  }}
                          /> */}
                          <AirbnbSlider
                            components={{ Thumb: AirbnbThumbComponent }}
                            value={buyIn}
                            onChange={(e) => {setBuyIn(e.target.value)}}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            // valueLabelcomponent={ValueLabelComponent}
                            // getAriaValueText={val => showKilo(val)}
                            // valueLabelFormat={val => showKilo(val)}
                            min={buyInRange[0]}
                            max={buyInRange[1]}
                            // step={blinds < 100 ? 1 : blinds / 10}
                            color={"primary"}
                          />
                        </Grid>
                      </div>
                    </div>
                    <div className="bg-black bg-opacity-30 rounded-md flex z-0 w-11/12 py-2 md:justify-around flex-col md:flex-row gap-2 justify-center items-end pr-2">
                      <div className="flex gap-4 items-center">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase"> Password Protected</p>
                        <button onClick={() => setPrivacy(!privacy)}>
                          <img src={privacy ? checked : unchecked} alt="checkbox" className="w-8 h-8" />
                        </button>
                      </div>
                      {privacy && <div className="flex gap-4 items-center">
                        <p className="art-text text-sm tiny:text-xl whitespace-nowrap font-league-gothic uppercase"> Password :</p>
                        <div className="relative w-full">
                          <img src={effectTop} className="absolute top-0 right-0 transform -translate-y-1/2" />
                          <img src={effectTop} className="absolute bottom-0 left-0 transform translate-y-1/2 " />
                          <input type={"password"} className="text-app-yellow-light font-league-gothic outline-none px-2 w-full bg-app-brown-light rounded-md border-app-yellow border-2 " value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                      </div>}
                    </div>
                    <Grid container spacing={3} className="mt-3">
                      <button
                        className="w-48 z-0"
                        style={{ margin: "auto auto" }}
                        onClick={createTable}
                      >
                        <img src={btnTableCreate} alt="create" />
                      </button>
                    </Grid>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </TableWrapper>
      </div>
    </div >
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      DOGEChange: global.Actions.LoginAction.DOGEChange,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(CashTable);
