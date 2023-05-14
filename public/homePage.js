const logoutButton = new LogoutButton;
logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();    
        } 
    })
}

ApiConnector.current((response) => {
    if (response.success){
        ProfileWidget.showProfile(response.data);
    }
})

const ratesBoard = new RatesBoard;
function updateRates(){
ApiConnector.getStocks((response) => {
if (response.success) {
    this.clearTable();
    this.fillTable(data);
}
})
}
ratesBoard.updateRates();
setInterval(updateRates, 60 * 1000);