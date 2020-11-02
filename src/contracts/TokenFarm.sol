pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm {

	string public name = "Dapp Token Farm";
	DappToken public dappToken;	// address
	DaiToken public daiToken;	// address
	
	constructor(DappToken _dappToken, DaiToken _daiToken) public {
		dappToken = _dappToken;
		daiToken = _daiToken;
	}

	// 1. Staking Tokens (Deposit)

	// 2. Unstaking Tokens (Withdraw)

	// 3. Issuing Tokens
}
