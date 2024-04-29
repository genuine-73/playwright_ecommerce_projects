import  {Page, expect, Locator } from '@playwright/test'
import AccountNavBarPOM from './AccountNavBarPOM';

//inherits nav links (logout and orders) from account nav bar
export default class AccountPOM extends AccountNavBarPOM {

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
    async enterUsername(username: string){

        await expect(this.usernameField).toBeEditable();
        await this.usernameField.clear();
        await this.usernameField.fill(username);
    }


    async enterPassword(password: string){

        await expect(this.passwordField).toBeEditable();
        await this.passwordField.clear();
        await this.passwordField.fill(password);
    }

    async loginExpectSuccess(username: string, password: string){

        if(username && password){

            await this.enterUsername(username);
            await this.enterPassword(password);
            await this.loginButton.click();
        }
        
        expect(this.logoutButton, "should be logged in").toBeVisible();
    }
}
