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
import bg from '../../images/bg.png';

const MainSection = ({
    userAddress,
    connectWallet,
    loading,
    walletConnected,
    scareBears,
    publicSalePrice,
    whitelistSalePrice,
    setLoading,
    whitelistSale
}) => {
    const {MerkleTree} = require ('merkletreejs');
    const keccak256 = require ('keccak256');

    const [counter, setCounter] = useState(0);

    let whitelistAddresses = ["0x7Da8e9089A94b6D353E3AD13D76B8a765EA2038D", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "0x02e3451AA4Ec12Cb350b3d969a6057ef6ECc96ef"];
    const leafNode = whitelistAddresses.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNode, keccak256, {sortPairs: true});



    const hexProof = () =>{
        let index = whitelistAddresses.indexOf(userAddress);
        return merkleTree.getHexProof(leafNode[index]);
    }

    const merkleRoot = () =>{
        return merkleTree.getRoot().toString('hex');
    }

    const whitelistMint = async() =>{
        const price = String(parseInt(whitelistSalePrice) * counter);
        console.log('0x'+merkleRoot());
        try{
            await scareBears.methods.whitelistMint(hexProof(), counter).send({value: price, from: userAddress});
        }
        catch(e){
            console.log(e);
        }
    }

    const publicMint = async() =>{
        const price = String(parseInt(publicSalePrice) * counter);
        console.log('0x'+merkleRoot());
        try{
            await scareBears.methods.publicMint(hexProof(), counter).send({value: price, from: userAddress});
        }
        catch(e){
            console.log(e);
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
                    <CurrentPrice>PRICE: {(counter * 0.069).toFixed(5)} ETH</CurrentPrice>
                    <ConnectButton onClick={walletConnected ? mintFunction : connectWallet}>{walletConnected ? 'Mint' : 'Connect Wallet'}</ConnectButton>
                </MainBoxContent>
            </MainBoxContainer>
        </MainContainer>
    </>
  )
}

export default MainSection