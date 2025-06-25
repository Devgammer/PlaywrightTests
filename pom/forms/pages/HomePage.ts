import { Locator } from "@playwright/test";
import BasePage from "./BasePage";


export default class HomePage extends BasePage {

private readonly signUpButton:  Locator = this.page.locator('.hero-descriptor_btn.btn.btn-primary'); 



async open(): Promise<any> {
    await this.page.goto("/");
}

async clickSignUnButton(): Promise<any> {
await this.signUpButton.click();
}
}