pragma solidity ^0.5.0;


import "./EuroToken.sol";
import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Dapp Token Farm";
    address public owner;
    EuroToken public euroToken; // store Address of Fake euro Token with type of Euro Token
    DaiToken public daiToken; // store Address of DaiToken with type of Euro Token

    // store of all stakers to send them EuroToken after staking
    address[] public stakers;

    // keep track of the balance of a specific investor
    mapping(address => uint) public stakingBalance;

    // keep track of stakers
    mapping(address => bool) public hasStaked;

    mapping(address => bool) public isStaking;

    constructor(EuroToken _euroToken, DaiToken _daiToken) public {
        euroToken = _euroToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    //Stake Token (deposit)
    function stakeTokens(uint _amount) public {

        // Approve to transfer daiToken on DaiToken Behalf
        daiToken.approve(address(this), _amount);

        // Transfer tokens from the investor wallet to "this" farm
        daiToken.transferFrom(msg.sender, address(this), _amount);
 
        // Store deposit balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // To store inside the array *Only* who haven't stake yet(The new investors);
       //  if hasStacked is false then will be true ! then will execute the code
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        //update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
        
    }

    // only called by the owner

    // Issue tokens function *Only called by the owner* // send interest to the investor
    function issueTokens() public {
    require(msg.sender == owner, "Called only by the owner");

        for(uint i=0; i < stakers.length; i++) {
            // store the address of the stakers 
            address recipient = stakers[i];
           // get the balance of the i address
           uint balance = stakingBalance[recipient];

           // safety check
           if(balance > 0) {
           //transfer euro token to the stakers(investor) *Issue token*
            euroToken.transfer(recipient, balance);
           }
           
        }
    }

    // unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        
        // Fetch stacking balance
        uint balance = stakingBalance[msg.sender];

        // require amount greater than 0
        require(balance > 0, "stacking balance cannot be 0");

        // Transfer Mock dai token to the person who called this function *WithDraw*
        daiToken.transfer(msg.sender, balance);

        // Reset staking balance
        stakingBalance[msg.sender] = 0;

        // update staking status
        isStaking[msg.sender] = false;
        
    }












}
