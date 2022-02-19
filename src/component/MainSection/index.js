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
    connectWallet,
    loading,
    whitelistMint,
    publicMint,
    walletConnected
}) => {

    const [counter, setCounter] = useState(0);

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
                    <Title>PRESALE IS NOW LIVE!</Title>
                    <CounterContainer>
                        <MinusButton onClick={minusButton}>-</MinusButton>
                        <CounterNumber>{counter}</CounterNumber>
                        <PlusButton onClick={plusButton}>+</PlusButton>
                    </CounterContainer>
                    <CurrentPrice>PRICE: {(counter * 0.069).toFixed(5)} ETH</CurrentPrice>
                    <ConnectButton onClick={connectWallet}>{walletConnected ? 'Mint' : 'Connect Wallet'}</ConnectButton>
                </MainBoxContent>
            </MainBoxContainer>
        </MainContainer>
    </>
  )
}

export default MainSection