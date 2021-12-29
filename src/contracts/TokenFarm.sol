pragma solidity ^0.5.0;


import "./EuroToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    EuroToken public euroToken; // store Address of Fake euro Token with type of Euro Token
    DaiToken public daiToken; // store Address of DaiToken with type of Euro Token

    // keep track of all stakers
    address[] public stakers;

    // keep track of the balance of a specific investor
    mapping (address => uint) public stakingBalance;

    // keep track of stakers
    mapping(address => bool) public hasStaked;

    mapping(address => bool) public isStaking;

    constructor(EuroToken _euroToken, DaiToken _daiToken) public {
        euroToken = _euroToken;
        daiToken = _daiToken;
    }

    //Stake Token (deposit)
    function stakeTokens(uint _amount) public {

        // Approve to transfer daiToken
        daiToken.approve(address(this), _amount);

        // Transfer tokens from the investor wallet to "this" farm
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // Store deposit balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // To store inside the array *Only* who haven't stake yet(The new investor);
       //  if hasStacked is false then will be true ! then will execute the code
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        //update staking status
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;

    }
}
