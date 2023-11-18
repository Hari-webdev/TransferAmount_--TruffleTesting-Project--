const transferAmount =artifacts.require('transferAmount');

contract('TransferAmount',(accounts)=>{
    let TransferAmounts = null;

    before(async()=>{ TransferAmounts = await transferAmount.deployed()});
   
    it('Should transfer amount', async()=>{
        const recipents = [accounts[1], accounts[2],accounts[3]];
        const amounts = [10,20,30];

        const initialBalances = await Promise.all(
            recipents.map((recipient)=>{
                return web3.eth.getBalance(recipient);
        })
        )

        console.log(initialBalances);

        await  TransferAmounts.send(recipents,amounts,{from:accounts[0] , value : 100}); 

        const finalBalance = await Promise.all( recipents.map((event)=>{return web3.eth.getBalance(event)}));

        console.log("Hey This is my final Balance",finalBalance);


       recipents.forEach((_value, _index) => {

            let FinalBalance = web3.utils.toBN(finalBalance[_index]);
            let initialBalance = web3.utils.toBN(initialBalances[_index]);
            console.log("This code working _________1");
            
            assert(FinalBalance.sub(initialBalance).toNumber() === amounts[_index]);

        });

    });

    it('should not transfer amount if array length is not hte same', async()=>{
        const recipients = [accounts[1],accounts[2],accounts[3]];
        const amounts = [10,20];

        try{
            await TransferAmounts.send(recipients,amounts,{from:accounts[0],value:10});
        }catch(e){
            //console.error(e);
            assert(e.message.includes(" to must be same length as amount"));
            return;
        }
        assert(false);
    
    });

    it('should not transfer amount if caller is not the owner', async)

});