import Web3 from "web3";
import { AbiItem } from "web3-utils";

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

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
  "0xee947e56c328b24cea60f3515ae7db98ac8cea1642f1eea52397032984e9395d";

const main = async () => {
  try {
    const blockchainTestContract = new web3.eth.Contract(
      blockchainTestABI,
      blockchainTestAddress
    );
    console.log("blockchainTestContract: ", blockchainTestContract);

    const testAccount = web3.eth.accounts.privateKeyToAccount(testPrivateKey);
    console.log("account : ", testAccount);

    const gasPrice = await web3.eth.getGasPrice();
    console.log("Gas price: ", gasPrice);

    const nonce = await web3.eth.getTransactionCount(testAccount.address);
    console.log("Test account nonce: ", nonce);

    const networkId = await web3.eth.net.getId();
    console.log("Chain id: ", networkId);

    const gas = await blockchainTestContract.methods
      .set("Hoang Le Bao Thanh")
      .estimateGas();

    console.log("Gas: ", gas);

    const data = await blockchainTestContract.methods
      .set("Hoang Le Bao Thanh")
      .encodeABI();

    console.log("Data function set in byte code: ", data);

    const signedTransaction = await web3.eth.accounts.signTransaction(
      {
        from: testAccount.address,
        to: blockchainTestAddress,
        gas,
        data,
        gasPrice,
        nonce,
        chainId: networkId,
      },
      testAccount.privateKey
    );
    console.log("Signed Transaction: ", signedTransaction);

    const receipt = signedTransaction?.rawTransaction
      ? await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      : null;

    console.log("receipt: ", receipt);
  } catch (error) {
    console.log("Error occur: ", error);
  }
};

main();
