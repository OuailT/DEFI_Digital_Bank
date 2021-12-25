pragma solidity ^0.5.0;


import "./Feuro";
import "./DaiToken";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    Feuro public feuro; // store Address Feuro
    DaiToken public daiToken; // store Address DaiToken

    constructor(Feuro _feuro, DaiToken _daiToken) public {
        feuro = _feuro;
        daiToken = _daiToken;
    }
}
