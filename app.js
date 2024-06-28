let web3;
let contract;
const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';
const contractABI = [ [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] ];

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            document.getElementById('account').innerText = accounts[0];
            
            contract = new web3.eth.Contract(contractABI, contractAddress);
            
            const tokenName = await contract.methods.tokenName().call();
            document.getElementById('tokenName').innerText = tokenName;
            
            const tokenAbbrv = await contract.methods.tokenAbbrv().call();
            document.getElementById('tokenAbbrv').innerText = tokenAbbrv;
            
            const totalSupply = await contract.methods.totalSupply().call();
            document.getElementById('totalSupply').innerText = totalSupply;
            
            document.getElementById('mintButton').addEventListener('click', mintTokens);
            document.getElementById('burnButton').addEventListener('click', burnTokens);
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('MetaMask is not installed. Please install it to use this DApp.');
    }
});

async function mintTokens() {
    const address = document.getElementById('mintAddress').value;
    const value = document.getElementById('mintValue').value;
    const accounts = await web3.eth.getAccounts();
    
    try {
        await contract.methods.mint(address, value).send({ from: accounts[0] });
        const totalSupply = await contract.methods.totalSupply().call();
        document.getElementById('totalSupply').innerText = totalSupply;
        alert('Tokens minted successfully');
    } catch (error) {
        console.error(error);
        alert('Error minting tokens');
    }
}

async function burnTokens() {
    const address = document.getElementById('burnAddress').value;
    const value = document.getElementById('burnValue').value;
    const accounts = await web3.eth.getAccounts();
    
    try {
        await contract.methods.burn(address, value).send({ from: accounts[0] });
        const totalSupply = await contract.methods.totalSupply().call();
        document.getElementById('totalSupply').innerText = totalSupply;
        alert('Tokens burned successfully');
    } catch (error) {
        console.error(error);
        alert('Error burning tokens');
    }
}
