import web3 from "../web3";
import EuroTokens from "../abis/EuroToken.json";



const euroTokensInstance = new web3.eth.Contract(JSON.parse(EuroTokens.interface), 
                            "0x6fFE80F1B848a3aeDE47e0C346Ef95C9A0114aee");


export default euroTokensInstance;