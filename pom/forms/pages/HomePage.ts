import { Locator } from "@playwright/test";
import BasePage from "./BasePage";


export default class HomePage extends BasePage {

private readonly signInButton:  Locator = this.page.locator('//app-signin-modal//button[(@class="btn btn-primary")]'); 



async open(): Promise<any> {
    await this.page.goto("/");
}

async ClickSignInButton(): Promise<any> {
await this.signInButton.click();
}
}