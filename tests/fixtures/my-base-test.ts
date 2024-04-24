import {test as base, expect} from '@playwright/test'

import NavBarPOM from '../POMclasses/NavBarPOM';
import ShopPOM from '../POMclasses/ShopPOM';
import CartPOM from '../POMclasses/CartPOM';
import CheckoutPOM from '../POMclasses/CheckoutPOM';
import PopUpsPOM from '../POMclasses/PopUpsPOM';
import OrderSummaryPOM from '../POMclasses/OrderSummaryPOM';
import OrderAccount from '../POMclasses/OrderAccount';
import AccountPOM from '../POMclasses/AccountPOM';
import test_data from '../test-data/item.json';

export type ProductOptions ={
    item: string;
}

type MyFixtures = {
    cart: CartPOM;
    homePage: NavBarPOM;
}

export const test = base.extend<MyFixtures & ProductOptions>({ 

    item: [test_data.item, {option: true}],

    homePage: async({page,}, use) => {
        await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/')
        console.log("Successfully logged into my account")
        const navbar = new NavBarPOM(page);
        await use(navbar);
    },
    
    cart: async({item, homePage}, use) => {
        const shop = await homePage.goToShopSuccess(item);
        const cart = await shop.addItemToCart();
        console.log("Successfully added an item to cart")
    
        //Checks to see if an item has been added to cart
        await expect(cart.productName.filter({hasText: item}),"Needed to check if the item added from the shop page is in cart").toHaveText(item);
        
        await use(cart);

        await homePage.goToCartSuccess();
        await cart.cartCleanUpProcess(homePage);
    
    }

});