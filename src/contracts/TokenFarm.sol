pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {

	string public name = "Dapp Token Farm";
	DappToken public dappToken;	// address
	DaiToken public daiToken;	// address

	address[] public stakers;
	mapping(address => uint) public stakingBalance;
	mapping(address => bool) public hasStaked;
	mapping(address => bool) public isStaking;
	
	constructor(DappToken _dappToken, DaiToken _daiToken) public {
		dappToken = _dappToken;
		daiToken = _daiToken;
	}

	// 1. Staking Tokens (Deposit)
	function stakeTokens(uint _amount) public {

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

	// 2. Unstaking Tokens (Withdraw)

	// 3. Issuing Tokens
}
