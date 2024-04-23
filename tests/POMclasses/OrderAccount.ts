import {Page, Locator} from '@playwright/test'
import AccountNavBarPOM from './AccountNavBarPOM';

//inherits nav links (logout and orders) from account nav bar
export default class OrderAccount extends AccountNavBarPOM {

    //Locators
    get latestOrderNumber() {
        return this.page.locator('tr.woocommerce-orders-table__row:nth-child(1) > td:nth-child(1)').innerText();
    }
}