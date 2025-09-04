// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {TOKEN} from "@openzeppelin/contracts/token/TOKEN/TOKEN.sol";
import {TOKENPermit} from "@openzeppelin/contracts/token/TOKEN/extensions/TOKENPermit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact strewdavid@proton.me
contract Defaults is TOKEN, Ownable, TokenPermit {
    constructor(address initialOwner)
        TOKEN("defaults", "Polygon ")
        Ownable(initialOwner)
        TOKENPermit("defaults")
    {
        _mint(msg.sender, 10000000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```solidity uint256 private constant _price = 1 * (10 ** 18); // Price in wei for 1 token, assuming 18 decimals function price() public pure returns (uint256) { return _price; } ```
