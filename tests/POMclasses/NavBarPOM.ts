import {Page, Locator} from '@playwright/test'
import CartPOM from './CartPOM';
import ShopPOM from './ShopPOM';
import AccountNavBarPOM from './AccountNavBarPOM';
import AccountPOM from './AccountPOM';

export default class NavBarPOM {

    //variable declaration
    page: Page;

    //Instantiation
    constructor(page: Page){
        this.page = page;
    }

    //Locators
    get shop() {
        return this.page.locator('#menu-main').getByRole('link', { name: 'Shop' });  
    }

    get account() {
        return this.page.locator('#menu-main').getByRole('link', { name: 'My account' });   
    }

    get cart(){
        return this.page.locator('#menu-main').getByRole('link', {name: 'Cart'});
    }

    //Service methods

    async goToAccountSuccess(): Promise<AccountPOM>{
        await this.account.click();
        return new AccountPOM(this.page);
    }

    async goToShopSuccess(item: string): Promise<ShopPOM>{
        await this.shop.click();
        return new ShopPOM(this.page, item);
    }

    async goToCartSuccess(): Promise<CartPOM>{
        await this.cart.click();
        return new CartPOM(this.page);
    }

}
