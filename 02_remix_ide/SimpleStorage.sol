// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract SimpleStorage {
    uint256 favNumber; //initialised to 0 if not specified
    function store(uint256 _favNumber) public {
        favNumber = _favNumber;
    }
}