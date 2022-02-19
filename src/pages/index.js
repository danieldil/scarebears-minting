import React, {useState} from 'react'
import Web3 from 'web3';
import ScareBearsABI from '../ABI/ScareBears.json';
import MainSection from '../component/MainSection';

const Minting = () => {
    const web3 = new Web3(window.ethereum);

    const {MerkleTree} = require ('merkletreejs');
    const keccak256 = require ('keccak256');
    
    const [userAddress, setUserAddres] = useState();
    const [walletConnected, setWalletConnected] = useState();
    const [scareBears, setScareBears] = useState();
    const [balanceQty, setBalanceQty] = useState();
    const [balanceId, setBalanceId] = useState();
    const [publicSalePrice, setPublicSalePrice] = useState();
    const [whitelistSalePrice, setWhitelistSalePrice] = useState();
    const [loading, setLoading] = useState(false);

    const scareBearsAddress = '0x275b2Cf8FD5542747486673A7D551A9b5617b0b3';
    let whitelistAddresses = ["0x7Da8e9089A94b6D353E3AD13D76B8a765EA2038D", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"];

    
  
    const leafNode = whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNode, keccak256, {sortPairs: true});

    const connectWallet = async() =>{
        if(typeof window.ethereum != 'undefined'){
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const tempAccount = web3.utils.toChecksumAddress(accounts[0]);
            setUserAddres(tempAccount);

            connectContract(tempAccount);

            setWalletConnected(true);

            console.log('0x'+merkleRoot());
        }
    }

    const connectContract = async(tempAccount) =>{
        try{
            const tempScareBears = new web3.eth.Contract(ScareBearsABI.abi, scareBearsAddress);
            setScareBears(tempScareBears);

            const tempBalanceQty = await tempScareBears.methods.balanceOf(tempAccount).call();
            setBalanceQty(tempBalanceQty);

            const tempBalanceId = await tempScareBears.methods.walletOf().call({from: tempAccount});
            setBalanceId(tempBalanceId);

            const tempPublicSalePrice = await tempScareBears.methods.PUBLIC_SALE_PRICE().call();
            console.log(tempPublicSalePrice);
            setPublicSalePrice(tempPublicSalePrice);

            const tempWhitelistSalePrice = await tempScareBears.methods.WHITELIST_SALE_PRICE().call();
            console.log(tempWhitelistSalePrice);
            setWhitelistSalePrice(tempWhitelistSalePrice);
        }
        catch(e){

        }
    }

    const merkleRoot = () =>{
        return merkleTree.getRoot().toString('hex');
    }

    const hexProof = () =>{
        let index = whitelistAddresses.indexOf(userAddress);
        return merkleTree.getHexProof(leafNode[index]);
    }

    const publicMint = async() =>{
        const qty = parseInt(document.getElementById('publicMintQty').value);
        const price = String(parseInt(publicSalePrice) * qty);
        try{
            await scareBears.methods.mint(qty).send({value: price, from: userAddress});
            setLoading(false);
        }
        catch(e){
            console.log(e);
        }
    }

    const whitelistMint = async() =>{
        const qty = parseInt(document.getElementById('whitelistMintQty').value);
        const price = String(parseInt(whitelistSalePrice) * qty);
        console.log(hexProof());
        try{
            await scareBears.methods.whitelistMint(hexProof(), qty).send({value: price, from: userAddress});
        }
        catch(e){
            console.log(e);
        }
    }

    window.onload = () =>{
        if(typeof window.ethereum !== 'undefined'){
            connectWallet();
        }
        else{
            window.alert('Please use browser the supports metamask!');
        }
    }

  return (
    <>
        <MainSection
        userAddress={userAddress}
        connectWallet={connectWallet}
        balanceQty={balanceQty}
        balanceId={balanceId}
        loading={loading}
        whitelistMint={whitelistMint}
        publicMint={publicMint}
        walletConnected={walletConnected}
        ></MainSection>
    </>
  )
}

export default Minting