import { test as base, expect } from '@playwright/test'

import NavBarPOM from '../POMclasses/NavBarPOM';
import CartPOM from '../POMclasses/CartPOM';
import product from '../test-data/product.json';

export type ProductOptions ={
    item: string;
}

type MyFixtures = {
    cart: CartPOM;
    homePage: NavBarPOM;
}

export const test = base.extend<MyFixtures & ProductOptions>({ 

    item: [product.name, {option: true}],  

    homePage: async({page,}, use) => {

        //Navigates to account page
        await page.goto('./my-account/')
        const navbar = new NavBarPOM(page);
        await use(navbar);

    },
    
    cart: async({item, homePage}, use) => {

        //Navigates to Shop page
        const shop = await homePage.goToShopSuccess(item);
        const cart = await shop.addItemToCart();   
    
        //Checks to see if an item has been added to cart
        await expect(cart.productName.filter({hasText: item}),"Needed to check if the item added from the shop page is in cart")
        .toHaveText(item);   
        
        await use(cart);

        //Removes coupon and delete items from the cart
        await homePage.goToCartSuccess();
        await cart.cartCleanUp(homePage);
      
    }

});

