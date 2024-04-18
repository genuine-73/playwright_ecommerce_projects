import {test as base} from '@playwright/test'

import NavBarPOM from './POMclasses/NavBarPOM';
import AccountPOM from './POMclasses/AccountPOM';
import ShopPOM from './POMclasses/ShopPOM';
import CartPOM from './POMclasses/CartPOM';
import CheckoutPOM from './POMclasses/CheckoutPOM';
import PopUpsPOM from './POMclasses/PopUpsPOM';
import OrderSummaryPOM from './POMclasses/OrderSummaryPOM';
import OrderAccount from './POMclasses/OrderAccount';

type MyFixtures = {
    navbar: NavBarPOM;
    account: AccountPOM;
    shop: ShopPOM;
    cart: CartPOM;
    checkout: CheckoutPOM;
    popups: PopUpsPOM;
    orderSummary: OrderSummaryPOM;
    OrderAccount: OrderAccount;
}

export const test = base.extend<MyFixtures>({ 
    
});