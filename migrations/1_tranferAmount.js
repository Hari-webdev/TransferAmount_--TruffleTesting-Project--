const TransferAmount = artifacts.require('transferAmount');

module.exports = async(deployer,_network,accounts)=>{
    await deployer.deploy(TransferAmount,accounts[0]);
}