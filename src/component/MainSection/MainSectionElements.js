import styled from 'styled-components';

export const MainContainer = styled.div`
   background: white;
   width: 100%;
   height: 100%;
   position: fixed;
   top: 0; bottom: 0; right: 0; left: 0;
   border: 1px solid black;
   display: flex;
   justify-content: center;
   align-items: center;
   margin: auto;
`;

export const MainBg = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const ImageBg = styled.img`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
`

export const MainBoxContainer = styled.div`
    width: 600px;
    height: 400px;
    border: 5px solid #36107F;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: rgba(29, 9, 72, .5);

    @media screen and (max-width: 480px){
        width: 300px;
        height: 400px;
    }
`;

export const BackgroundOpacity = styled.div`
    // position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(29, 9, 72, .05);
    opacity: .8;
`

export const MainBoxContent = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1`
    font-family: Century Gothic;
    color: #FFAF02;
    font-size: xx-large;
    @media screen and (max-width: 480px){
        font-size: x-large;
    }
`
export const CounterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const MinusButton = styled.button`
    white-space: nowrap;
    border: none;
    outline: none;
    background: none;
    font-family: Century Gothic;
    font-size: 50px;
    font-weight: bolder;
    color: #FFAF02;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    cursor: pointer;
`

export const PlusButton = styled.button`
    white-space: nowrap;
    border: none;
    outline: none;
    background: none;
    font-family: Century Gothic;
    font-size: 50px;
    font-weight: bolder;
    color: #FFAF02;
    width: 50px;
    height: 50px;
    margin-left: 10px;
    cursor: pointer;
`

export const CounterNumber = styled.h1`
    font-family: Century Gothic;
    font-size: 50px;
    color: #FFAF02;
`

export const CurrentPrice = styled.h2`
    font-family: Century Gothic;
    font-size: large;
    color: #FFAF02;
`

export const ConnectButton = styled.button`
    border-radius: 50px;
    background: #FFAF02;
    white-space: nowrap;
    padding: 12px 30px;
    color: #FFFFFF;
    font-family: Century Gothic;
    font-size: medium;
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center; 
    
    &:hover{
        transition: all 0.2s ease-in-out;
        background: none;
        color: white;
        border: 1px solid #FFAF02;
    }
`
