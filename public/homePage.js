const { response } = require("express");

const logoutButton = new LogoutButton();
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

const ratesBoard = new RatesBoard();
const updateRates = ()=> {
ApiConnector.getStocks((response) => {
if (response.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(data);
}
})
}
updateRates();
setInterval(updateRates, 60 * 1000);

const moneyManager = new moneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage;
        } else {
            moneyManager.setMessage;
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage
        } else {
            moneyManager.setMessage;
        }
    })
}
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
      if (response.success) {
        ProfileWidget.showProfile(response.data);
        moneyManager.setMessage;
      } else {
        moneyManager.setMessage;
      }
    });
  };