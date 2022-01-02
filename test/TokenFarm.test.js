/* eslint-disable no-undef */
const { assert } = require("chai");
const { default: Web3 } = require("web3");

const TokenFarm = artifacts.require("TokenFarm");
const EuroToken = artifacts.require("EuroToken");
const DaiToken= artifacts.require("DaiToken");


require('chai')
  .use(require('chai-as-promised'))
  .should()


// Function to convert wei to ether
function tokens(n) {
    return web3.utils.toWei(n, "ether");
}



// truffle contract function makes sure that the contract is deployed;
contract("TokenFarm", ([owner, investor])=> {
    let daiToken, euroToken, tokenFarm;

    before(async ()=> {
        // create an instance for each contracts
        daiToken = await DaiToken.new();
        euroToken= await EuroToken.new();
        tokenFarm = await TokenFarm.new(euroToken.address, daiToken.address);

        // Transfer all euroTokens to the Tokens Farm
        await euroToken.transfer(tokenFarm.address, tokens("1000000"));

        // Transfer 100 Dai token to the investor
        // To be specific with the test who is the owner 
        await daiToken.transfer(investor, tokens("100"), {from : owner});

        });

    describe("Dai token deployment", async ()=> {
        it("it has a name", async ()=> {
            const name = await daiToken.name(); // => get the name of the token
            assert.equal(name, "Mock DAI Token");
        });
    });

    describe("Euro token deployment", async ()=> {
        it("it has a name", async ()=> {
            const name = await euroToken.name();
            assert.equal(name, "Euro Token");
        });
    });


    describe("Farm token deployment", async ()=> {
        it("it has a name", async ()=> {
            const name = await tokenFarm.name();
            assert.equal(name, "Dapp Token Farm");
        });

        it("contract has euro tokens", async ()=> {
            let balance = await euroToken.balanceOf(tokenFarm.address);
            assert.equal(balance.toString(), tokens("1000000"));
        });
    });

    describe("Farming Tokens", async ()=> {
        it("rewards investor for staking Dai Token", async ()=> {

            let result;

            // Check investor balance before staking
            result = await daiToken.balanceOf(investor);
            assert.equal(result.toString(), tokens("100"), "investor Mock DAI balance is correct before staking");

            // Stake Mock Dai tokens
            // We always approve first to give the permission to the 3 part
            await daiToken.approve(tokenFarm.address, tokens("100"), {from: investor});
            await tokenFarm.stakeTokens(tokens("100"), {from: investor });


            // Check investor Mock dai balance after staking
            result = await daiToken.balanceOf(investor);
            assert.equal(result.toString(), tokens("0"), "Investor Dai Token balance is correct after staking");

            // Check inside DaiToken Contract if the FarmToken received Dai Token
            result = await daiToken.balanceOf(tokenFarm.address);
            assert.equal(result.toString(), tokens("100"), "Farm Token Mock Dai token after staking is correct");

            // Check The investor stakingBalance
            result = await tokenFarm.stakingBalance(investor);
            assert.equal(result.toString(), tokens("100"),"Investor staking balance is correct after staking");

            // Check the status of is staking
            result = await tokenFarm.isStaking(investor);
            assert.equal(result.toString(), "true", "Investor isStaking balance correct after staking");

            // Check the status of hasStaked
            result = await tokenFarm.hasStaked(investor);
            assert.equal(result.toString(), "true", "Investor hasStaked balance correct after staking");

            // Issue Tokens function
            
            // Check that Only *The owner can issue Token";
            await tokenFarm.issueTokens({from: investor}).should.be.rejected;

            await tokenFarm.issueTokens({from: owner});

            // check If the investor received 100 euroToken after stacking 
            result = await euroToken.balanceOf(investor);
            assert.equal(result.toString(), tokens("100"));

            // Unstacking tokens
            await tokenFarm.unstakeTokens({from: investor});

            // Check the investor wallet after unstacking;
            result = await daiToken.balanceOf(investor);
            assert.equal(result.toString(), tokens("100"), "Investor mock Dai token balance is correct after unstacking");

            // Check that the investor balance is 0 after unstacking
            result = await tokenFarm.stakingBalance(investor);
            assert.equal(result.toString(), tokens("0"), "Investor stacking balance is correct after unstacking" )

            // Check if isStacking is false after unstacking
            result = await tokenFarm.isStaking(investor);
            assert.equal(result.toString(), "false", "isStacking status is correct after unstacking");
            
        });
    });
});

