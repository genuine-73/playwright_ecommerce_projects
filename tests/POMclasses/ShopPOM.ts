import {Page, expect, Locator} from '@playwright/test'

export default class ShopPOM {
    //variable declaration
    page: Page;
    addToCartButton: Locator;
    viewCartButton: Locator;

    //Instantiation
    constructor(page: Page, item:string){
        this.page = page;
        expect(page).toHaveURL("https://www.edgewordstraining.co.uk/demo-site/shop/");

        //locators
        this.addToCartButton = page.getByLabel(`Add “${item}” to your cart`);
        this.viewCartButton = page.getByRole('link', { name: 'View cart' });
    }

    as

    //service methods
    async clickAddToCart(){
        await this.addToCartButton.click();
    }

    async clickViewCartButton() {
        await this.viewCartButton.click();
    }

    async addToCartSuccess(): Promise<boolean>{
        try
        {
            this.addToCartButton.click();
            return true;
        }
        catch
        {
            return false;
        }
    }
    

}