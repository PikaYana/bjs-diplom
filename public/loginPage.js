'use strict';

class UserForm {
  constructor() {
    this.loginFormCallback = (data) => {
      ApiConnector.login(data, (response) => {
        if (response.success) {
         console.log(response);
          location.reload();
        } else {
            this.setLoginErrorMessage(response.error);
        }
      });
    };
    this.registerFormCallback = (data) => {
        ApiConnector.register(data,(response) => {
            if (response.success) {
                console.log(response);
                location.reload();  
            } else {
              this.setRegisterErrorMessage(response.error);
            }
        });
    }
  }
}

const userForm = new UserForm();

