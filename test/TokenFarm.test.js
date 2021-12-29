/* eslint-disable no-undef */
const { assert } = require("chai");
const { default: Web3 } = require("web3");

const TokenFarm = artifacts.require("TokenFarm");
const EuroToken = artifacts.require("EuroToken");
const DaiToken= artifacts.require("DaiToken");


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
        tokenFarm = await TokenFarm.new(daiToken.address, euroToken.address);

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
            await daiToken.approve(tokenFarm.address, tokens("100"), {from : investor});
            await tokenFarm.stakeTokens(tokens("100"), {from : investor });

            // Check investor Mock dai balance after staking
            // result = await daiToken.balanceOf(investor);
            // assert.equal(result.toString(), tokens("0"), "investor Mock DAI balance is correct after staking");
        });
    });
});

