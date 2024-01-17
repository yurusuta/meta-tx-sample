// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721, Context} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract MetaTxNft is ERC2771Context, ERC721 {
    constructor(
        address trustedForwarder_
    ) ERC721("metaYYK", "YYK") ERC2771Context(trustedForwarder_) {}

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }

    // --------------------------------------------------
    // Internal
    // --------------------------------------------------

    function _msgSender()
        internal
        view
        override(Context, ERC2771Context)
        returns (address)
    {
        return ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    function _contextSuffixLength()
        internal
        view
        override(Context, ERC2771Context)
        returns (uint256)
    {
        return ERC2771Context._contextSuffixLength();
    }
}
