import {Page, Locator} from '@playwright/test'

export default class AccountNavBarPOM {
    
    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    get logoutButton() {
        return this.page.getByRole('link', { name: 'Logout' });
    }

    get orderTabButton() {
        return this.page.getByRole('link', { name: ' Orders' });
    }

    //service methods
    async clickOrderTabButton() {
        await this.orderTabButton.click();
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }
}
