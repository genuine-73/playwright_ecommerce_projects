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
    shop: ShopPOM;
    account: AccountPOM;
    orderTab: OrderAccount;
}

export const test = base.extend<MyFixtures & ProductOptions>({ 

    item: [test_data.item, {option: true}],

    page: async({page,}, use) => {
        await page.goto('./my-account/')
        console.log("Successfully logged into my account")
        await use(page);
    },

    navbar: async ({page,}, use) => {
        await use(new NavBarPOM(page));
    },

    shop: async({page, item, }, use) => {
        await use(new ShopPOM(page, item));
    },

    account: async({page}, use) => {
        await use(new AccountPOM(page));
    },

    orderTab: async({page}, use) => {
        await use(new OrderAccount(page));
    },
});