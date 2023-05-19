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
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
})

const ratesBoard = new RatesBoard();
const updateRates = () => {
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
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, `Сумма ${data.amount} зачислена на баланс`);
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, `Вы успешно обменяли ${data.fromAmount} ${data.fromCurrency} на ${response.data.toAmount} ${data.toCurrency}`);
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};


moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, `Вы успешно перевели ${data.amount} ${data.currency} пользователю ${data.to}`);
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		favoritesWidget.updateUsersList(response.data)
	}
})
favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			favoritesWidget.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, `Пользователь ${data.name} добавлен в избранное`);
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	});
};

avoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			favoritesWidget.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, `Пользователь ${data.name} удален из избранного`);
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	});
};