import {Page, expect, Locator} from '@playwright/test'
import AccountNavBarPOM from './AccountNavBarPOM';

export default class AccountPOM extends AccountNavBarPOM {

    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page) {
        super(page);
        this.page = page;
        expect(page).toHaveURL("https://www.edgewordstraining.co.uk/demo-site/my-account/");
    }

    //Locators
    get usernameField() {
        return this.page.getByLabel('Username or email address *');
    }

    get passwordField() {
        return this.page.locator('#password');

    }

    get loginButton() {
        return this.page.getByText('Log in');
    }

    //service methods
    async login(username: string, password: string){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}