import { Page, Locator } from '@playwright/test'
import CartPOM from './CartPOM';

export default class ShopPOM {

    page: Page;
    addToCartButton: Locator;
    viewCartButton: Locator;

    constructor(page: Page, item:string){
        
        this.page = page;

        //locators
        this.addToCartButton = page.getByLabel(`Add “${item}” to your cart`);
        this.viewCartButton = page.getByRole('link', { name: 'View cart' });
    }

    //service methods
    async addItemToCart(): Promise<CartPOM> {

        await this.addToCartButton.click();
        await this.viewCartButton.click();
        return new CartPOM(this.page);
    }
}
