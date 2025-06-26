import { expect, Locator } from "@playwright/test";
import BasePage from "../pages/BasePage";

export default class SignUpForm extends BasePage{

public readonly nameField:  Locator = this.page.locator('input#signupName'); 
public readonly lastNameField:  Locator = this.page.locator('input#signupLastName'); 
public readonly emailField:  Locator = this.page.locator('input#signupEmail'); 
public readonly passwordField:  Locator = this.page.locator('input#signupPassword'); 
public readonly repeatPasswordField:  Locator = this.page.locator('input#signupRepeatPassword'); 
public readonly invalidFeedback:  Locator = this.page.locator('.invalid-feedback'); 
public readonly registerButton:  Locator = this.page.locator('div.modal-footer .btn-primary'); 
public readonly nameFieldError:  Locator = this.page.locator('#signupName ~ .invalid-feedback'); 

public readonly lastNameErrorMessage:  Locator = this.page.locator('#signupLastName ~ .invalid-feedback'); 
public readonly emailErrorMessage:  Locator = this.page.locator('#signupEmail ~ .invalid-feedback'); 
public readonly passwordErrorMessage:  Locator = this.page.locator('#signupPassword ~ .invalid-feedback'); 
public readonly repeatPasswordErrorMessage: Locator = this.page.locator('#signupRepeatPassword ~ .invalid-feedback'); 
  toHaveClass: any;



  async enterData(data: string, field: Locator) {
await field.fill(data);
await field.blur();
     }

 async confirmSignUp() {
await this.registerButton.click();
     }

       async enterEmail(email: string): Promise<any> {
await this.emailField.fill(email);
     }

async enterPassword(password: string): Promise<any> {
await this.passwordField.fill(password);
     }
   
 async generateErrorByFocusAndBlur(field: Locator) {
   await field.focus();
await field.blur();

}




getField(fieldName) {
        const fields = {
            'name': this.nameField,
            'lastName': this.lastNameField,
            'email': this.emailField,
            'password': this.passwordField,
            'repeatPassword': this.repeatPasswordField
        };
        return fields[fieldName];
    }


async focusField(fieldName) {
        const field = this.getField(fieldName);
        await field.focus();
    }

    async blurField(fieldName) {
        const field = this.getField(fieldName);
        await field.blur();
    }

    async triggerFieldValidation(fieldName) {
        await this.focusField(fieldName);
        await this.blurField(fieldName);
    }

 getErrorMessage(fieldName) {
        const errorMessages = {
            'name': this.emailErrorMessage,
            'lastName': this.lastNameErrorMessage,
            'email': this.emailErrorMessage,
            'password': this.passwordErrorMessage,
            'repeatPassword': this.repeatPasswordErrorMessage
        };
        return errorMessages[fieldName];
    }



async expectFieldToHaveError(fieldName, errorMessage) {
        const field = this.getField(fieldName);
        const errorMsg = this.getErrorMessage(fieldName);

        await expect(errorMsg).toContainText(errorMessage);
        await expect(field).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }



async signUpWithValidCredentials(name: string,lastName: string, email: string, password: string, repeatPassword: string) {
await this.enterData(name,this.nameField);
await this.enterData(lastName,this.lastNameField);
await this.enterData(email,this.emailField);
await this.enterData(password,this.passwordField);
await this.enterData(repeatPassword,this.repeatPasswordField);
await this.confirmSignUp();
}

async signUpWithInvalidCredentials(name: string,lastName: string, email: string, password: string, repeatPassword: string) {
await this.enterData(name,this.nameField);
await this.enterData(lastName,this.lastNameField);
await this.enterData(email,this.emailField);
await this.enterData(password,this.passwordField);
await this.enterData(repeatPassword,this.repeatPasswordField);
await this.confirmSignUp();
}






 }






