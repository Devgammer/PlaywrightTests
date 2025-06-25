import { Locator } from "@playwright/test";
import BasePage from "../pages/BasePage";

export default class SignUpForm extends BasePage{

public readonly nameField:  Locator = this.page.locator('input#signupName'); 
public readonly lastNameField:  Locator = this.page.locator('input#signupLastName'); 
public readonly emailField:  Locator = this.page.locator('input#signupEmail'); 
public readonly passwordField:  Locator = this.page.locator('input#signupPassword'); 
public readonly repeatPasswordField:  Locator = this.page.locator('input#signupRepeatPassword'); 
public readonly invalidFeedback:  Locator = this.page.locator('.invalid-feedback'); 
public readonly registerButton:  Locator = this.page.locator('div.modal-footer .btn-primary'); 
public readonly successMessage:  Locator = this.page.locator(''); 
public readonly nameFieldError:  Locator = this.page.locator('.invalid-feedback'); 


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

async verifyDataIsInvalid(field: Locator){
await this.nameFieldError

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