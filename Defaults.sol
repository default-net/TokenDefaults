// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact strewdavid@proton.me
contract Defaults is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("defaults", "Polygon ")
        Ownable(initialOwner)
        ERC20Permit("defaults")
    {
        _mint(msg.sender, 10000000000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```solidity uint256 private constant _price = 1 * (10 ** 18); // Price in wei for 1 token, assuming 18 decimals function price() public pure returns (uint256) { return _price; } ```
