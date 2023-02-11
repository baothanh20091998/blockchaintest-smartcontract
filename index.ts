import Web3 from "web3";
import { AbiItem } from "web3-utils";

const web3 = new Web3(Web3.givenProvider);

const blockchainTestABI: AbiItem[] = [
  {
    inputs: [],
    name: "get",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "data", type: "string" }],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const blockchainTestAddress: string =
  "0xc06fdEbA4F7Fa673aCe5E5440ab3d495133EcE7a";
const testPrivateKey: string =
  "4bd2e642a117cecf1184841799a95707685b66c7f001d3e4a1a2df132fa15abe";

const main = async () => {
  try {
    const testAccount = web3.eth.accounts.privateKeyToAccount(testPrivateKey);
    console.log("account : ", testAccount);
    console.log("=====================");

    const blockchainTestContract = new web3.eth.Contract(
      blockchainTestABI,
      blockchainTestAddress
    );
    console.log("blockchainTestContract: ", blockchainTestContract);
    console.log("=====================");

    const res = await blockchainTestContract.methods
      .set("Hoang Le Bao Thanh")
      .send({ from: testAccount.address });

    console.log(
      "Integrate smart contract and using function set successfully: ",
      res
    );
  } catch (error) {
    console.log("Error occur: ", error);
  }
};

main();
