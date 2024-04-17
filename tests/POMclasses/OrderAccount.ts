import {Page, Locator} from '@playwright/test'
import AccountNavBarPOM from './AccountNavBarPOM';

export default class OrderAccount extends AccountNavBarPOM {
    
    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    //Locators
    get latestOrderNumber() {
        return this.page.locator('tr.woocommerce-orders-table__row:nth-child(1) > td:nth-child(1)').innerText();
    }
}