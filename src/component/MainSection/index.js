import React, { useState } from 'react'
import { MainContainer, 
    MainBoxContent, 
    MainBoxContainer, 
    Title, 
    CounterContainer, 
    MinusButton, 
    PlusButton, 
    CounterNumber,
    CurrentPrice,
    ConnectButton,
    MainBg,
    ImageBg,
    BackgroundOpacity} from './MainSectionElements'
import bg from '../../images/bg.jpg';
import Web3 from 'web3';

const MainSection = ({
    userAddress,
    connectWallet,
    walletConnected,
    scareBears,
    publicSalePrice,
    whitelistSalePrice,
    whitelistSale,
    whitelistAddresses
}) => {
    const {MerkleTree} = require ('merkletreejs');
    const keccak256 = require ('keccak256');

    const [counter, setCounter] = useState(0);
    const [loading, setLoading] = useState(false);

    // let whitelistAddresses = ["0x7Da8e9089A94b6D353E3AD13D76B8a765EA2038D", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "0x02e3451AA4Ec12Cb350b3d969a6057ef6ECc96ef"];
    const leafNode = whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNode, keccak256, {sortPairs: true});

    const web3 = new Web3(window.ethereum); 

    const hexProof = () =>{
        let index = whitelistAddresses.indexOf(userAddress);
        return merkleTree.getHexProof(leafNode[index]);
    }

    const whitelistMint = async() =>{
        const price = String(whitelistSalePrice * counter);
        //console.log('0x'+merkleRoot());
        try{
            setLoading(true);
            await scareBears.methods.whitelistMint(hexProof(), counter).send({value: web3.utils.toWei(price), from: userAddress});
            window.alert('Transaction Submitted!');
            setLoading(false);
        }
        catch(e){
            console.log(e);
            setLoading(false);
        }
    }

    const publicMint = async() =>{
        const price = String(publicSalePrice * counter);
        //console.log('0x'+merkleRoot());
        try{
            setLoading(true);
            await scareBears.methods.mint(counter).send({value: web3.utils.toWei(price), from: userAddress});
            window.alert('Transaction Submitted!');
            setLoading(false);
        }
        catch(e){
            console.log(e);
            setLoading(false);
        }
    }

    const mintFunction = async() =>{
        if(whitelistSale){
            whitelistMint();
            return;
        }
        publicMint();
    }

    const plusButton = () =>{
        if(whitelistSale){
            if(counter === 3){
                return;
            }
        }
        else{
            if(counter === 10){
                return;
            }
        }
        setCounter(counter+1);
    }

    const minusButton = () =>{
        if(counter === 0){
            return;
        }
        setCounter(counter-1);
    }

  return (
    <>
        <MainContainer>
            <MainBg>
                <ImageBg src={bg}></ImageBg>
            </MainBg>
            <MainBoxContainer>
                <MainBoxContent>
                    <BackgroundOpacity></BackgroundOpacity>
                    <Title>{(whitelistSale ? 'PRESALE' : 'PUBLIC SALE')} IS NOW LIVE!</Title>
                    <CounterContainer>
                        <MinusButton onClick={minusButton}>-</MinusButton>
                        <CounterNumber>{counter}</CounterNumber>
                        <PlusButton onClick={plusButton}>+</PlusButton>
                    </CounterContainer>
                    <CurrentPrice>PRICE: {(counter * (whitelistSale ? whitelistSalePrice : publicSalePrice)).toFixed(5)} ETH</CurrentPrice>
                    <ConnectButton onClick={walletConnected ? mintFunction : connectWallet} disabled={loading ? 'disabled' : ''}>{walletConnected ? 'Mint' : 'Connect Wallet'}</ConnectButton>
                </MainBoxContent>
            </MainBoxContainer>
        </MainContainer>
    </>
  )
}

export default MainSection