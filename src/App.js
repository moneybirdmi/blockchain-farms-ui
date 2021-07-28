import React, { useCallback, useEffect, useState } from "react";
import { NavLink, Route, Switch, Link } from "react-router-dom";
import { Web3Provider, getDefaultProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { useQuery } from "@apollo/react-hooks";
import Web3 from "web3";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import FarmInactiveIcon from './assets/svgs/farm-inactive.svg';
import FarmActiveIcon from './assets/svgs/farm-active.svg';
import { Button, Header } from "./components";
import { initWeb3, web3Modal, logoutOfWeb3Modal } from "./utils/web3Modal";
import GET_TRANSFERS from "./graphql/subgraph";
import { addresses, abis } from "./contracts";
import "./app.css";

import Disclaimer from "./components/ui/DisclaimerModal";
import Farms from "./views/Farms";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
// import Bird from "./bird_logo.png";

import LightModeSwitch from "./assets/svgs/light-switch.svg";
import OracleActive from "./assets/svgs/oracle-active.svg";
import OracleInactive from "./assets/svgs/oracle-inactive.svg";
import Twitter from "./assets/svgs/twitter.svg";
import Discord from "./assets/svgs/discord.svg";
import Telegram from "./assets/svgs/telegram.svg";
import Medium from "./assets/svgs/medium.svg";
import Doc from "./assets/svgs/google-docs.svg";
// import GovernanceIcon from './assets/svgs/governance-inactive.svg'

import Bird from "./assets/svgs/bird.svg";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Home } from "@material-ui/icons";
import BirdFarmCards from "./views/BirdFarms";
import OracleAnalytics from "./views/OracleAnalytics";
import Farm from "./views/Farm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  sidebarList: {
    marginTop: "21px",
    marginBottom: "15px",
    padding: "0px 5px",
  },
  sidebar: {
    height: "100vh",
    borderRadius: 0,
    boxShadow: "7.66101px 0px 7.66101px 1.5322px rgb(53 58 61 / 4%)",
    width: "100%",
  },
  marginTop: {
    marginTop: theme.spacing(8),
  },
  avatar: {
    width: "43px",
    height: "43px",
    padding: "5px",
    // marginTop: '-15px',
    borderRadius: "50%",
    background: "#ffffff",
    textAlign: "center",
    boxShadow: "0px 0px 28.4381px rgb(42 81 109 / 15%)",
    "& img": {
      objectFit: "contain",
      width: "1.2rem",
    },
  },
  switch: {
    background: "white",
    borderRight: "0.7px solid #8c8c8c47",
  },
  sidenav: {
    display: "flex",
  },
  lightIcon: {
    width: "2rem",
    position: "absolute",
    bottom: "10px",
    left: "3px",
    margin: "10px",
  },
  homebuttonActive: {
    background: "#AE0707",
    border: "0.502825px solid #AE0707",
    outline: "0",
    borderRadius: "6.16731px",
    color: "white",
    padding: "10px",
    margin: "9px",
    marginTop: "1.8rem",
    "&:focus": {
      border: "0.474409px solid #AE0707",
    },
  },
  homebuttonInActive: {
    color: "#AE0707",
    border: "0.502825px solid #102a5114",
    outline: "0",
    borderRadius: "6.16731px",
    background: "white",
    padding: "10px",
    margin: "9px",
    marginTop: "1.8rem",
    "&:focus": {
      border: "0.474409px solid #AE0707",
    },
  },
  homeIcon: {
    fontSize: "19px",
    textAlign: "center",
  },
  sidebarHead: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  headerText: {
    marginTop: "-5px",
  },
  appName: {
    "& span": {
      fontSize: "14px !important",
      fontWeight: "500 !important",
      fontFamily: "Averta",
      color: "#102a51",
    },
  },
  appTagLine: {
    fontSize: "10px",
    marginTop: "0",
    marginBottom: "0",
    color: "#102a51",
  },
  listText: {
    lineHeight: "25px",
    color: "rgba(17, 41, 80, 0.81)",
    fontWeight: "normal",
    marginBottom: ".4rem",
    "&:hover": {
      color: "rgba(17, 41, 80, 0.81) !important",
      background: "rgba(174, 7, 7, 0.03)",
      borderRadius: "8.17524px",
    },
    "& span": {
      fontSize: "14px !important",
      fontFamily: "Averta",
    },
  },
  mainMenu: {
    padding: "5px",
    marginTop: "1rem",
    "& span": {
      color: "rgba(17, 41, 80, 0.81)",
      fontSize: "14px",
      fontWeight: "500",
      fontFamily: "Averta",
    },
  },
  listIcon: { width: "21px", marginRight: "15px" },
  content: {
    padding: "0px 10px",
    width: "100%",
  },
  activeNav: {
    "-webkit-text-fill-color": "#AE0707;",
    fontWeight: "500",
    background: "rgba(174, 7, 7, 0.03)",
    borderRadius: "8.17524px",
    "& :hover": {
      color: "#AE0707;",
    },
  },
}));

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Roboto",
      "Helvetica",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
});

async function readOnChainData(account) {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider("ropsten");
  // const web3Provider = Web3Provider()
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/

  // https://github.com/ethers-io/ethers.js/issues/657

  const birdContract = new Contract(
    addresses.birdErc20,
    abis.bird,
    defaultProvider
  );

  const tokenBalance = await birdContract.balanceOf(account);
}

function WalletButton({ provider, loadWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function App(props) {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, setProvider] = useState();
  const [web3js, setWeb3js] = useState();
  const [web3Obj, setWeb3Obj] = useState();
  const [account, setAccount] = useState("");
  const [testNetwork, setNetwork] = useState();
  const [backgroundtype, setbackgroundtype] = useState("light");
  const [url, seturl] = useState("");

  /* Open wallet selection modal. */
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();
    setProvider(new Web3Provider(newProvider));
    const web3js = new Web3(provider);
    setWeb3js(web3js);
  }, []);

  /* If user has loaded a wallet before, load it automatically. */
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const getRoute = () => {
    const pathname = window.location.pathname;
    if (pathname === "/farms") seturl("farms");
    if (pathname === "/oracle") seturl("oracle");
  };

  React.useEffect(() => {
    getRoute();
    if (!loading && !error && data && provider) {
      // await init();
      const triggerAlreadyInjectedWeb3 = async () => {
        if (provider) {
          await init();
        }
      };
      triggerAlreadyInjectedWeb3();
    }
  }, [loading, error, data, provider]);

  const init = async () => {
    let web3;
    try {
      web3 = await initWeb3();
    } catch (err) {
      console.error(err);
      return;
    }

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    web3.eth.defaultAccount = accounts[0];
    setAccount(accounts[0]);
    setWeb3Obj(web3);
    setNetwork(networkId);
  };

  return (
    <>
      <div className="container-fluid">
        <div className={`row ${backgroundtype}`}>
          <div className="col sidenav">
            <div className="side-bar">
              <Link to="/">
                <Button
                  className={
                    !url ? classes.homebuttonActive : classes.homebuttonInActive
                  }
                  onClick={() => seturl("")}
                >
                  <Home className={classes.homeIcon} />
                </Button>
              </Link>

              <div className="color-switch">
                <img
                  src={LightModeSwitch}
                  alt="color-switch"
                  className={classes.lightIcon}
                  onClick={() => {
                    console.log("ligh");
                  }}
                />
              </div>
            </div>
            <div className={classes.content}>
              <List component="nav" aria-label="sidebar">
                <ListItem
                  button
                  className="sidebar-logo"
                  component={NavLink}
                  onClick={() => seturl("")}
                  to="/"
                >
                  <div className={classes.sidebarHead}>
                    <ListItemIcon>
                      <Avatar className={classes.avatar} src={Bird}></Avatar>
                    </ListItemIcon>
                    <div className={classes.headerText}>
                      <ListItemText
                        primary="Bird.Money"
                        className={classes.appName}
                      />
                      <p className={classes.appTagLine}>
                        Oracle Analytics for On-Chain Trust
                      </p>
                    </div>
                  </div>
                </ListItem>

                <ListItemText
                  primary="Main Menu"
                  className={classes.mainMenu}
                />

                <ListItem
                  button
                  component={NavLink}
                  onClick={() => seturl("farms")}
                  to="/farms"
                  className={`${(classes.sidebarList, classes.listText)} ${
                    url === "farms" && classes.activeNav
                  } `}
                >
                  <img
                    src={url === "farms" ? FarmActiveIcon : FarmInactiveIcon}
                    className={classes.listIcon}
                  />
                  <ListItemText primary="Farm" />
                </ListItem>

                <ListItem
                  button
                  className={(classes.sidebarList, classes.navLink)}
                  component={NavLink}
                  onClick={() => seturl("oracle")}
                  to="/oracle"
                  className={`${(classes.sidebarList, classes.listText)} ${
                    url === "oracle" && classes.activeNav
                  } `}
                >
                  <img
                    src={url === "oracle" ? OracleActive : OracleInactive}
                    className={classes.listIcon}
                  />
                  <ListItemText primary="Oracle Analytics" />
                </ListItem>

                {/* <ListItem
                  button
                  className={`${(classes.sidebarList, classes.listText)} ${
                    url === 'governance' && classes.activeNav
                  } `}
                >
                  <img src={GovernanceIcon} className={classes.listIcon} />
                  <ListItemText primary='Governance' />
                </ListItem> */}
              </List>
              <div className="social-links">
                <ul>
                  <li>
                    <a
                      href="https://docs.bird.money/"
                      rel="nofollow"
                      target="_blank"
                    >
                      <img src={Doc} alt="Document Icon" /> Docs
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://t.me/joinchat/AAAAAEzyFurRdr3sZZnrBw"
                      rel="nofollow"
                      target="_blank"
                    >
                      <img src={Telegram} alt="Telegram Icon" /> Telegram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/Z2BeCnS"
                      rel="nofollow"
                      target="_blank"
                    >
                      <img src={Discord} alt="Discord Icon" /> Discord
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/_birdmoney"
                      rel="nofollow"
                      target="_blank"
                    >
                      <img src={Twitter} alt="Twitter Icon" /> Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://medium.com/bird-money"
                      rel="nofollow"
                      target="_blank"
                    >
                      <img src={Medium} alt="Medium Icon" /> Medium
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col10" style={{ background: "#fafbfc" }}>
            <Switch>
              <Route path="/" exact>
                <Farms
                  account={account}
                  logoutOfWeb3Modal={logoutOfWeb3Modal}
                  loadWeb3Modal={loadWeb3Modal}
                />
              </Route>
              <Route path="/farms">
                <BirdFarmCards
                  logoutOfWeb3Modal={logoutOfWeb3Modal}
                  loadWeb3Modal={loadWeb3Modal}
                />
              </Route>
              <Route path="/oracle">
                <OracleAnalytics
                  account={account}
                  web3Obj={web3Obj}
                  testNetwork={testNetwork}
                  logoutOfWeb3Modal={logoutOfWeb3Modal}
                  loadWeb3Modal={loadWeb3Modal}
                />
                <Route path="/farm/:farmid">
                  <Farm />
                </Route>
              </Route>
            </Switch>
          </div>
        </div>
      </div>

      <Disclaimer />
    </>
  );
}

export default App;
