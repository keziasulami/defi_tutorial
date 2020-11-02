pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {

	string public name = "Dapp Token Farm";
	address public owner;
	DappToken public dappToken;	// address
	DaiToken public daiToken;	// address

	address[] public stakers;
	mapping(address => uint) public stakingBalance;
	mapping(address => bool) public hasStaked;
	mapping(address => bool) public isStaking;
	
	constructor(DappToken _dappToken, DaiToken _daiToken) public {
		dappToken = _dappToken;
		daiToken = _daiToken;
		owner = msg.sender;
	}

	// Staking Tokens (Deposit)
	function stakeTokens(uint _amount) public {

		// Require amount to be greater than 0
		require(_amount > 0, "amount cannot be 0");

		// Transfer Mock DAI tokens to this contract for staking
		daiToken.transferFrom(msg.sender, address(this), _amount);

		// Update staking balance
		stakingBalance[msg.sender] += _amount;

		// Add users to stakers array *only* if they haven't staked already
		if (!hasStaked[msg.sender]) {
			stakers.push(msg.sender);
		}

		// Update staking status
		hasStaked[msg.sender] = true;
		isStaking[msg.sender] = true;
	}

	// Unstaking Tokens (Withdraw)

	// Issuing Tokens
	function issueTokens() public {

		// Only owner can call this function
		require(msg.sender == owner, "caller must be the owner");

		// Issue tokens to all stakers
		for (uint i = 0; i < stakers.length; i++) {
			address recipient = stakers[i];
			uint balance = stakingBalance[recipient];
			if (balance > 0) {
				dappToken.transfer(recipient, balance);
			}
		}
	}
}
