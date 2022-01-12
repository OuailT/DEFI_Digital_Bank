import web3 from "../web3";
import DaiTokens from "../abis/DaiToken.json";


// create a instance of daiToken contract

const daiTokenInstance = new web3.eth
      .Contract(JSON.parse(DaiTokens.interface),
      "0x6020DB1CD80CC83447B31467ba756cA93df9cAbc"
      );


export default daiTokenInstance;

