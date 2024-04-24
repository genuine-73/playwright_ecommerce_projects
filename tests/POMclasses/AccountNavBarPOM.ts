import {Page, Locator} from '@playwright/test'

export default class AccountNavBarPOM {
    
    //variable declaration
    page: Page;

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
    async goToOrders() {
        await this.orderTabButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }

}
