import {test as base, expect} from '@playwright/test'

import NavBarPOM from '../POMclasses/NavBarPOM';
import ShopPOM from '../POMclasses/ShopPOM';
import CartPOM from '../POMclasses/CartPOM';
import CheckoutPOM from '../POMclasses/CheckoutPOM';
import PopUpsPOM from '../POMclasses/PopUpsPOM';
import OrderSummaryPOM from '../POMclasses/OrderSummaryPOM';
import OrderAccount from '../POMclasses/OrderAccount';
import AccountPOM from '../POMclasses/AccountPOM';
import test_data from '../test-data/test_case_one.json';

export type ProductOptions ={
    item: string;
}

type MyFixtures = {
    navbar: NavBarPOM;
    orderTab: OrderAccount;
    loginToAccount: ShopPOM;
    cart: CartPOM;
}

export const test = base.extend<MyFixtures & ProductOptions>({ 

    item: [test_data.item, {option: true}],

    page: async({page,}, use) => {
        await page.goto('./')
        console.log("Successfully navigated to my account");

        //Gets rid of the popup below page
        const popup = new PopUpsPOM(page);
        await popup.clickDismissButton();
        console.log("Successfully dismissed a banner below");

        await use(page);
    },

    navbar: async ({page,}, use) => {
        await use(new NavBarPOM(page));
    },

    orderTab: async({page}, use) => {
        await use(new OrderAccount(page));
    },

    loginToAccount: async({page, navbar, item}, use) => {
        //Navigates to account
        let account = await navbar.goToAccountSuccess();
        console.log("Successfully navigated to my account");

        //logging in to account
        await account.login('hellogen@edgewords.co.uk', 'HelloEdgewords!23');
        expect(account.logoutButton, "should be logged in").toBeVisible();
        console.log("Successfully logged into my account");

        await use(await navbar.goToShopSuccess(item));

        account = await navbar.goToAccountSuccess();

        //Navigate to page
        await account.clickLogoutButton();

        //close down the website
        await page.close();
        console.log("Successfully closed the website")
    },

    
    cart: async({loginToAccount, item}, use) => {
        const cart = await loginToAccount.clickAddCartButton();
        console.log("Successfully added an item to cart")
    
        //Checks to see if an item has been added to cart
        await expect(cart.productName.filter({hasText: item}),"Needed to check if the item added from the shop page is in cart").toHaveText(item);
        
        await use(cart);

        await cart.cartCleanUpProcess()
    
    }

});

// test.beforeEach('Setup process', async ({page, navbar})=>{

//     //Navigates to account
//     const account = await navbar.goToAccountSuccess();
//     console.log("Successfully navigated to my account");

//     //logging in to account
//     await account.login('hellogen@edgewords.co.uk', 'HelloEdgewords!23');
//     expect(account.logoutButton, "should be logged in").toBeVisible();
//     console.log("Successfully logged into my account");
    
// })

// test.afterEach('Teardown', async ({page, navbar}) => {

//     //Navigate to page
//     const account = await navbar.goToAccountSuccess();
//     await account.clickLogoutButton();

//     //close down the website
//     await page.close();
//     console.log("Successfully closed the website")
// })