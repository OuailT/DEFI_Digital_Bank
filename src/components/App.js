import React, {useState, useEffect} from 'react';
import Navbar from "./Navbar/Navbar";
// import Web3 from 'web3';
import web3 from '../web3';
import TokenFarm from "../abis/TokenFarm.json";
import EuroToken from "../abis/EuroToken.json";
import DaiToken from "../abis/DaiToken.json";
import './App.css'
import Main from './Main';



const App = () => {

  web3.eth.getAccounts().then(console.log);

  useEffect(()=> {
    const LoadData = async () => {
      // await ethEnabled();
      await blockchainDataLoad();
      
      }
      LoadData();
   
  },[])
  
  // useEffect(()=> {    
  //     const getAccount = async () => {
  //       const accounts = await window.ethereum.send('eth_requestAccounts');
  //       let metaAccount = accounts.result;
  //       setInvestorAccount(metaAccount);
        
  //     }
  //     getAccount();  
  // },[])


const [investorAccount, setInvestorAccount] = useState("0x263bE8ab7c38DDdFb51E879f87F13D336CEDfB2B");
const [eTokens, setETokens] = useState({});
const [dTokens, setDTokens] = useState({});
const [fTokens, setFTokens] = useState({});
const [eTokenBalance, setETokenBalance] = useState("0");
const [dTokenBalance, setDTokenBalance] = useState("0");
const [stackingBalance, setStackingBalance] = useState("0");
const [FarmAddress, setFarmAddress] = useState("");


console.log()

  // ******************************** Load Web3 ************************* //
  // const ethEnabled = async () => {

  //   if (window.ethereum) {
  //     await window.ethereum.send('eth_requestAccounts');
  //     window.web3 = new Web3(window.ethereum);
  //     return true;
  //   }
  //   return false;
  // }

 // ******************************** Load Blockchain Contracts Data ************************* //

  const blockchainDataLoad = async () => {
      
    // const web3 = window.web3;

    try {

      const accounts = await web3.eth.getAccounts();
      

    // get the Network Id of The contracts
    // const networkId = await web3.eth.net.getId();(not working);
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
  
    // ******************************** Dai Token EuroToken ************************* //

    // Get the deployed contract object using the network ID
    const daiTokenData = DaiToken.networks[networkId];
    
    if(daiTokenData) {

      // Create a instance of the contract
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
      const daiTokenAddress =  daiToken.options.address;
      console.log(daiTokenAddress);
      setDTokens(daiToken);
      

      // get the balance of the investor account
      let daiTokenBalance = await daiToken.methods.balanceOf(investorAccount).call();
      setDTokenBalance(daiTokenBalance.toString());
      
      
    } else {
      window.alert("DaiToken contract not deployed to detected network");
    }

    // ********************************Load EuroToken************************* //

    // Get the deployed contract object using the network ID
    const euroTokenData = EuroToken.networks[networkId];

    if(euroTokenData) {
      
      //Create an instance of the contract
      const euroToken = new web3.eth.Contract(EuroToken.abi, euroTokenData.address);
      
      setETokens(euroToken);
      // get the balance

      let euroTokenBalance = await euroToken.methods.balanceOf(investorAccount).call();
      setETokenBalance(euroTokenBalance.toString());

    } else {
      window.alert("Euro Token is not deployed to detected network");
    }


    // ********************************Load Farm Token************************* //
    // Get the deployed contract object using the network ID
    const farmTokenData = TokenFarm.networks[networkId];

    if(farmTokenData) {
      
      // Create an instance of the contract
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, farmTokenData.address);
      const farmTokensBalance = tokenFarm.options.address;
      setFarmAddress(farmTokensBalance);
      setFTokens(tokenFarm);
      

      // get the balance 
      let stakingBalanceFarm = await tokenFarm.methods.stakingBalance(investorAccount).call();
      setStackingBalance(stakingBalanceFarm.toString());

    } else {
      window.alert("Farm Token not deployed to detected network");
    }

  } catch (error) {
    console.error(error);
  }

  } 


// ********************************StakeToken************************* //

const stakeTokens = (amount) => {
  dTokens.methods
    .approve(fTokens._address, amount)
    .send({ from: investorAccount })
    .on('transitionsHash', hash => {
      fTokens.methods
        .stakeTokens(amount)
        .send({ from: investorAccount })
        .on('transitionsHash', hash => {
          console.log('stacking has been validated');
        })
        
    });
}




// ******************************** unStake Token************************* //

const unstakeTokens = async (amount) => {
  await fTokens.methods.unstakeTokens(amount)
  .send({from : investorAccount}).on("transitions Hash", (hash)=> {
      console.log("unstacking has been validated")
  });
}

  return (
    <div>
      <Navbar/>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
            <div className="content mr-auto ml-auto">
              <Main
              stackingBalance = {stackingBalance}
              dTokenBalance = {dTokenBalance}
              stakeTokens={stakeTokens}
              eTokenBalance={eTokenBalance}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


export default App;
