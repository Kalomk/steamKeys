// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import 'base64-sol/base64.sol';

error Dashboard__NotEnoughETHToAddPost();
error Dashboard__NotEnoughETHToBuyItemFromThePost();
error Dashboard__NotItemExist();

contract Dashboard {
  address private immutable i_owner;
  uint256 private immutable i_minEntranceFee;
  uint256 public totalPosts;
  uint256[] public postIds;
  string public constant base64Prefix = 'data:image/svg+xml;base64,';

  constructor(uint256 minEntranceFee) payable {
    i_owner = payable(msg.sender);
    i_minEntranceFee = minEntranceFee;
  }

  event ItemAdded(
    address indexed sender,
    string description,
    string title,
    uint256 price,
    uint256 id,
    bool isPrior,
    string image
  );

  event ItemBuyed(address indexed buyer, uint256 id, uint256 price);

  struct Post {
    address sender;
    string description;
    string title;
    uint256 price;
    uint256 id;
    string image;
    bool isPrior;
  }

  mapping(uint256 => Post) posts;

  function addPost(
    string memory _description,
    string memory _title,
    string memory _image,
    uint256 _price,
    bool _checkInput
  ) public payable {
    if (msg.value < i_minEntranceFee) {
      revert Dashboard__NotEnoughETHToAddPost();
    }

    Post storage newPost = posts[totalPosts];

    newPost.description = _description;
    newPost.title = _title;
    newPost.price = _price;
    newPost.image = _image;
    newPost.sender = msg.sender;
    newPost.id = totalPosts;
    newPost.isPrior = _checkInput == true ? true : false;
    postIds.push(totalPosts);
    emit ItemAdded(msg.sender, _description, _title, _price, totalPosts, _checkInput, _image);

    totalPosts += 1;
  }

  function BuyItemFromThePost(uint256 postId) public payable {
    if (posts[postId].sender == address(0)) {
      revert Dashboard__NotItemExist();
    }
    if (msg.value < posts[postId].price) {
      revert Dashboard__NotEnoughETHToBuyItemFromThePost();
    }

    payable(posts[postId].sender).transfer(msg.value);
    delete posts[postId];
    emit ItemBuyed(msg.sender, postId, msg.value);
  }

  function getMinEntranceFee() external view returns (uint256) {
    return i_minEntranceFee;
  }

  function getTotalPosts() external view returns (uint256) {
    return totalPosts;
  }

  function getPostIds() external view returns (uint256[] memory) {
    return postIds;
  }

  function getPost(uint256 id) external view returns (Post memory) {
    return posts[id];
  }
}
