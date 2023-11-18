// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract transferAmount {
    address owner; // state variable

    modifier ownerOnly() {
        require(msg.sender == owner);
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function send(
        address payable[] memory to,
        uint256[] memory amount
    ) public payable ownerOnly {
        require(to.length == amount.length, "to must be same length as amount"); //

        for (uint256 i = 0; i < to.length; i++) {
            to[i].transfer(amount[i]); // to[i] and amount[i]  had iteration
        }
    }
}
