const TokenFarm = artifacts.require("TokenFarm");
const EuroToken = artifacts.require("EuroToken");
const DaiToken= artifacts.require("DaiToken");

module.exports = async function(deployer) {
  
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

  // Transfer some euroToken to the investor / account[1] in order to use and deposit it to the bank;

  await daiToken.transfer(accounts[1], "100000000000000000000");


};


