import React, {useState} from 'react'
import Web3 from 'web3';
import ScareBearsABI from '../ABI/SquareBears.json';
import MainSection from '../component/MainSection';

const Minting = () => {
    const web3 = new Web3(window.ethereum);
    
    const [userAddress, setUserAddres] = useState();
    const [walletConnected, setWalletConnected] = useState();
    const [scareBears, setScareBears] = useState();
    const [publicSalePrice, setPublicSalePrice] = useState();
    const [whitelistSalePrice, setWhitelistSalePrice] = useState();
    const [whitelistSale, setWhitelistSale] = useState();
    const [loading, setLoading] = useState(false);

    const scareBearsAddress = '0x0fd8589c7a017f07245Ae2a9306B4b833382a414';

    const connectWallet = async() =>{
        connectContract();
        if(typeof window.ethereum != 'undefined'){
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            const tempAccount = web3.utils.toChecksumAddress(accounts[0]);
            setUserAddres(tempAccount);
            setWalletConnected(true);
        }
    }

    const connectContract = async() =>{
        try{
            const tempScareBears = new web3.eth.Contract(ScareBearsABI.abi, scareBearsAddress);
            setScareBears(tempScareBears);

            const tempPublicSalePrice = await tempScareBears.methods.PUBLIC_SALE_PRICE().call();
            console.log(tempPublicSalePrice);
            setPublicSalePrice(web3.utils.fromWei(tempPublicSalePrice));

            const tempWhitelistSalePrice = await tempScareBears.methods.WHITELIST_SALE_PRICE().call();
            console.log(tempWhitelistSalePrice);
            setWhitelistSalePrice(web3.utils.fromWei(tempWhitelistSalePrice));

            const tempWhitelistSale = await tempScareBears.methods.whiteListSale().call();
            setWhitelistSale(tempWhitelistSale);
            console.log(tempWhitelistSale);
        }
        catch(e){

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
        scareBears={scareBears}
        connectWallet={connectWallet}
        loading={loading}
        walletConnected={walletConnected}
        publicSalePrice={publicSalePrice}
        setLoading={setLoading}
        whitelistSalePrice={whitelistSalePrice}
        whitelistSale={whitelistSale}
        ></MainSection>
    </>
  )
}

export default Minting