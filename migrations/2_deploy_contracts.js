const TokenFarm = artifacts.require("TokenFarm");
const EuroToken = artifacts.require("EuroToken");
const DaiToken= artifacts.require("DaiToken");


// deployer =>  put the smart contract on the network
// network itself
// accounts => all the accounts from ganache
module.exports = async function(deployer, network, accounts){
  
  //Deploy EuroToken
  await deployer.deploy(EuroToken);
  const euroToken = await EuroToken.deployed();
  console.log(euroToken);
  // Deploy DaiToken
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //Deployer TokenFarm with EuroToken & DaiToken Address;
  await deployer.deploy(TokenFarm, euroToken.address, daiToken.address);
  const farmToken = await TokenFarm.deployed();

  //Transfer all the EuroToken to FarmToken to give it back to an investor
  await euroToken.transfer(farmToken.address, "1000000000000000000000000");

  // Transfer 100 DaiToken to the investor / account[1] in order to use and deposit it to the bank;
  await daiToken.transfer(accounts[1], "100000000000000000000");

};


