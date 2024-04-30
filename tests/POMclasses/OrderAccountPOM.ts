import { Locator, Page } from '@playwright/test';
import AccountNavBarPOM from './AccountNavBarPOM';

//inherits nav links (logout and orders) from account nav bar
export default class OrderAccount extends AccountNavBarPOM {


    latestOrderNumber: Locator;

    constructor(page: Page){

        super(page);
        this.latestOrderNumber = this.page.locator('.woocommerce-orders-table__row:first-child > .woocommerce-orders-table__cell-order-number > a');
    }

    async getOrderNumber() {
    
        return await this.latestOrderNumber.innerText();
    }
}
