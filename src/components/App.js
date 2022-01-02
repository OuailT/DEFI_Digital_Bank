import React, {useState, useEffect} from 'react';
import Navbar from './Navbar'
import Web3 from 'web3';
import TokenFarm from "../abis/TokenFarm.json";
import EuroToken from "../abis/EuroToken.json";
import DaiToken from "../abis/DaiToken.json";
import './App.css'

// [x] Create a Contract and Methods States
// [x] Load web3
// [] Load Blockchain contracts Data





const App = () => {

const [account, setAccount] = useState("0x0");
const [euroTokens, setEuroTokens] = useState({});
const [daiToken, setDaiTokens] = useState({});
const [farmTokens, setFarmTokens] = useState({});
const [euroTokenBalance, setEuroTokenBalance] = useState("0");
const [daiTokenBalance, setdaiTokenBalance] = useState("0");
const [stackingBalance, setStackingBalance] = useState("0");

useEffect(()=> {
  ethEnabled();
  blockchainDataLoad();
},[])


  //Load Web3
  const ethEnabled = async () => {

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // Load Blockchain Contracts Data
  const blockchainDataLoad = async () => {

    const web3 = window.web3;

    // get the Accounts
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts);


    // get the Network Id of The contracts
    const networkId = await web3.eth.net.getId();
    
    // Load DaiToken

    //get the the contracts objects
    const daiTokenData = DaiToken.networks[networkId];
    
    if(daiTokenData) {
      // Create a instance of the contract
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address);
      setDaiTokens(daiToken);
      // get the balance 
      let daiTokenBalance = await daiToken.methods.balanceOf(account).call();
      console.log(daiTokenBalance);
      
    }

  } 




  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
            <div className="content mr-auto ml-auto">
              <a
                href="http://www.dappuniversity.com/bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>

              <h1>{account}</h1>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


export default App;
