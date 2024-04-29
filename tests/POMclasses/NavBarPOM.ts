import { Page, Locator } from '@playwright/test'
import CartPOM from './CartPOM';
import ShopPOM from './ShopPOM';
import AccountPOM from './AccountPOM';

export default class NavBarPOM {

    page: Page;
    shop: Locator;
    account: Locator;
    cart: Locator;

    constructor(page: Page){

        this.page = page;

        this.shop = this.page.locator('#menu-main').getByRole('link', { name: 'Shop' });  
        this.account = this.page.locator('#menu-main').getByRole('link', { name: 'My account' });
        this.cart = this.page.locator('#menu-main').getByRole('link', {name: 'Cart'});
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
