import {Page, Locator} from '@playwright/test'

export default class NavBarPOM {

    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page){
        this.page = page;
    }

    //Locators
    get cart() {
        return this.page.locator('#menu-item-44').getByRole('link', { name: 'Cart' });
    }

    get checkout() {
        return this.page.locator('#menu-item-45').getByRole('link', { name: 'Checkout' });
    }

    get shop() {
        return this.page.locator('#menu-item-43').getByRole('link', { name: 'Shop' });  
    }

    get account() {
        return this.page.locator('#menu-item-46').getByRole('link', { name: 'My account' });   
    }

    //Service methods
    async goToCart(){
        await this.cart.click()
    }

    async goToCheckout(){
        await this.checkout.click()
    }

    async goToShop(){
        await this.shop.click()
    }

    async goToAccount(){
        await this.account.click()}


}
