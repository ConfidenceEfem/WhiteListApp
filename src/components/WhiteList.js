import React from 'react'
import styled from "styled-components"
import img from "./hero.svg"
import {ethers} from "ethers"
import Swal from "sweetalert2"
import WhiteListAbi from './WhiteListAbi'

const WhiteList = () => {

    const [userNumber, setUserNumber] = React.useState(0)
    const [registered, setRegistered] = React.useState(false)

    console.log(WhiteListAbi.abi)

    const ContractAddress = "0x32f9339eD08fcb32F32d5f6A1A1829f6f8696f92"

    const openWallet = async () => {
        if(window.ethereum){
         const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
       const account = await accounts[0]
       if(account){
             const provider = new ethers.providers.Web3Provider(window.ethereum)
        const network  = await provider.getNetwork() 
       if(network.chainId === 4){
                const getSignerD = provider.getSigner()
                const contract = new ethers.Contract(ContractAddress,WhiteListAbi.abi, getSignerD)

                const createContract = await contract.createWhitleList()

           const created =      await createContract.wait()

                if(created){
                    getWhiteListCount()
                    joinWhiteListCheck()
                    Swal.fire({
                        icon: "success",
                        title: "You have successfully joined CryptoDev WhiteList",
                        showConfirmButton: false,
                        position: "center",
                        timer: 6500
                    })
                }

       }else{
        Swal.fire({
            title: "Please choose Rinkeby Network",
            showConfirmButton: true,
            position: "center"
        })
       }
       }else{
        Swal.fire({
            title: "Please connect Wallet Account",
            showConfirmButton: true,
            position: "center"
        })
       }
        }else{
            Swal.fire({
                title: "Please install a Metamask account",
                showConfirmButton: true,
                position: "center"
            })
        }
    }

    const joinWhiteListCheck = async () => {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
        const account = await accounts[0]
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const getSignerD = provider.getSigner()
            const contract = new ethers.Contract(ContractAddress, WhiteListAbi.abi, getSignerD)

            const checkAddress = await contract.whiteListAddress(account)
            // console.log(checkAddress)
            setRegistered(checkAddress)
    }

    const getWhiteListCount = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const getSignerD = provider.getSigner()
            const contract = new ethers.Contract(ContractAddress, WhiteListAbi.abi, getSignerD)

            const getWhiteListCount = await contract.numWhiteList()
            const convertBigNumber = getWhiteListCount.toString()    
                    console.log(convertBigNumber)
                    setUserNumber(convertBigNumber)

    }

    React.useEffect(()=>{
        getWhiteListCount()
        joinWhiteListCheck()

    },[])

  return (
    <Container>
        <Wrapper>
            <Left>
                <Title>Welcome to Crypto Devs</Title>
                <Desc>Its an NFT collection for developers in Crypto</Desc>
                {userNumber <= 0? 
                    <SubDesc>
                    Currently, you are the first to register
                </SubDesc>
                : 
                <SubDesc>
                   { userNumber == 1? "One": userNumber} have already joined the WhiteList
                </SubDesc>
                }
            
            {registered?  
            <Button
            style={{
                backgroundColor: "red"
            }}
                >
                    Joined successfully
            </Button>
                : 
            <Button
                onClick={()=>{
                    openWallet()
                }}
                >
                    Join the Waitlist
            </Button>
            }
               
            </Left>
            <Right>
                <Image src={img}/>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default WhiteList

const Image = styled.img`
object-fit: contain;
width: 500px;
height: 550px;

@media screen and (max-width: 1100px){
    width: 450px;
    height: 500px;
}
@media screen and (max-width: 1000px){
    width: 400px;
    height: 450px;
}

@media screen and (max-width: 900px){
   width: 80%;
   height: 500px;
}
@media screen and (max-width: 700px){
    height: 400px;
}
@media screen and (max-width: 500px){
    height: 350px;
}
@media screen and (max-width: 450px){
    height:300px;
}
`
const Button = styled.div`
width: 300px;
height: 65px;
background-color: blue;
display: flex;
align-items: center;
color: white;
justify-content: center;
border-radius: 4px;
cursor:pointer;
transition: all 550ms;
:hover{
    transform: scale(1.02);
}
@media screen and (max-width: 900px){
    width: 270px;
    height: 60px;
    font-size: 15px;
}
`

const SubDesc = styled.div`
margin-bottom: 25px;
font-size: 20px;
letter-spacing: 2.1px;
font-weight: 400;
@media screen and (max-width: 900px){
    text-align: center;
}
@media screen and (max-width: 500px){
    letter-spacing: 1.0px;
    font-size: 18px;

}
`
const Desc = styled.div`
margin: 25px 0;
font-size: 20px;
letter-spacing: 3.1px;
font-weight: 400;
@media screen and (max-width: 900px){
    text-align: center;
}
@media screen and (max-width: 700px){
   letter-spacing: 2.5px;
}
@media screen and (max-width: 500px){
    letter-spacing: 1.5px;
    font-size: 18px;
}

`
const Title = styled.div`
font-size: 40px;
font-weight: bold;
font-family: poppins;
@media screen and (max-width: 900px){
    text-align: center;
}
@media screen and (max-width: 700px){
    font-size: 35px;
}
@media screen and (max-width: 500px){
    font-size: 30px;
}
@media screen and (max-width: 420px){
    font-size: 25px;
}
`

const Right = styled.div`
/* background-color: red; */
/* width: 100%; */
display: flex;
align-items: center;
@media screen and (max-width: 900px){
    justify-content: center;
}
`

const Left = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
height: 100%;
@media screen and (max-width: 900px){
    margin-bottom: 70px;
    align-items: center;
    justify-content: flex-start;
}
@media screen and (max-width: 500px){
    margin-bottom: 40px;
}
`

const Wrapper = styled.div`
width: 85%;
display:flex;
height: 100%;
align-items: center;
justify-content: space-between;
@media screen and (max-width: 1000px){
    width: 90%;
    flex-wrap: wrap;
}
@media screen and (max-width: 950px){
    flex-wrap: wrap;
}
@media screen and (max-width: 900px){
    justify-content: center;
    flex-direction: column-reverse;

}
`

const Container = styled.div`
width: 100%;
display:flex;
height: 100vh;
align-items: center;
justify-content: center;
font-family: poppins;
@media screen and (max-width: 1000px){
    height: 100%;
}
`