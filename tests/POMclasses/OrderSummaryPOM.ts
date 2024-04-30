import { Page } from '@playwright/test'

export default class OrderSummaryPOM {

    page: Page;

    constructor(page: Page){

        this.page = page;
    }

    //Locators
    get Ordernumber() {

        return this.page.locator('.woocommerce-order-overview__order > strong').innerText();
    }
}
