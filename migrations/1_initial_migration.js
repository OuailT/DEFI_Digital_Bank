// To tell truffle which contract will interact with
// Migrations helps to deploy contract on the blockchain
const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
