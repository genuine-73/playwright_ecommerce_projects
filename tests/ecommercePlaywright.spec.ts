import { test, expect } from '@playwright/test';

import NavBarPOM from './POMclasses/NavBarPOM';
import AccountPOM from './POMclasses/AccountPOM';
import ShopPOM from './POMclasses/ShopPOM';
import CartPOM from './POMclasses/CartPOM';
import CheckoutPOM from './POMclasses/CheckoutPOM';
import PopUpsPOM from './POMclasses/PopUpsPOM';
import OrderSummaryPOM from './POMclasses/OrderSummaryPOM';
import OrderAccount from './POMclasses/OrderAccount';
import data from './test-data/test_case_one.json';
/*----------TODO
    - Cart Expect Statements - 1
    - Take Screenshot and video - 4
    - Change locator strategies - 6
    - Generate Reports - 3
    - Push files into GitHub - 2




*/

// test.beforeEach("Setup", async function ({page}){
//     //Navigate to page
//     await page.goto('./')
//     console.log("Successfully navigated to the ecommerce website")
//     const popup = new PopUpsPOM(page);
//     await popup.clickDismissButton();

// })

// test.afterEach("Teardown", async function ({page}){
//     //Navigate to page
//     const navbar = new NavBarPOM(page);
//     await navbar.goToAccount();

//     //Logout from Account
//     const account = new AccountPOM(page);
//     await account.clickLogoutButton();

//     //close down the website
//     await page.close();
//     console.log("Successfully closed the website")


// })

test.beforeEach("Setup", async function ({page}){
    //Navigate to page
    await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/')
    console.log("Successfully navigatedlogged into my account")

})



test("Test Case One: Applying Coupon", async function({page}){

    // //Navigates to account
    // const navbar = new NavBarPOM(page);
    // await navbar.goToAccount();
    // console.log("Successfully navigated to my account");

    // //logging in to account
    // const account = new AccountPOM(page);
    // await account.login('hellogen@edgewords.co.uk', 'HelloEdgewords!23');
    // expect(account.logoutButton).toBeVisible();
    // console.log("Successfully logged into my account");

    const navbar = new NavBarPOM(page);
    const account = new AccountPOM(page);

    //navigates to shop page
    await navbar.goToShop();
    console.log("Successfully navigated to the shop page");

    //Add item to cart
    const item = new ShopPOM(page, "Belt")
    await item.clickAddToCart();
    console.log("Successfully entered coupon code")

    //Go to the cart page
    await item.clickViewCartButton();
    console.log("Successfully applied coupon code");

    //Enter Coupon Code
    const cart = new CartPOM(page);
    const coupon = 'edgewords';
    await cart.enterCouponCode(coupon);
    await cart.clickApplyCoupon();
    console.log("Successfully applied coupon " + coupon + "to cart");

    //Grab the string value
    const expectedTotal = await cart.calculateExpectedTotal();
    const actualTotal = await cart.getTotal();
    const expectedDiscount = await cart.calculateDiscount(15);
    const actualDiscount = await cart.getDiscount();

    //Assert statement checks
    expect(actualTotal).toEqual(expectedTotal);
    console.log("Total from the website: £" + actualTotal/100 + " Total from calculating subtotal, discount and shipping: £" + expectedTotal/100);
    expect(actualDiscount).toEqual(expectedDiscount);
    console.log("Discount from the website: £" + actualDiscount/100 + " Discount from calculating subtotal, discount and shipping: £" + expectedDiscount/100);
    
    //cart cleanup process
    await cart.cartCleanUpProcess();

    


});

test("Test Case Two: Placing Order", async function({page}){
    // //Navigates to account
    // const navbar = new NavBarPOM(page);
    // await navbar.goToAccount();
    // console.log("Successfully navigated to my account");

    // //logging in to account
    // const account = new AccountPOM(page);
    // await account.login('hellogen@edgewords.co.uk', 'HelloEdgewords!23');
    // expect(account.logoutButton).toBeVisible();
    // console.log("Successfully logged into my account");

    const navbar = new NavBarPOM(page);
    const account = new AccountPOM(page);

    //navigates to shop page
    await navbar.goToShop();
    console.log("Successfully navigated to the shop page");

    //Add item to cart
    const item = new ShopPOM(page, "Tshirt")
    await item.clickAddToCart();
    console.log("Successfully added an item to cart")

    //Go to the cart page
    await item.clickViewCartButton();
    console.log("Successfully navigated to cart page");

    //Proceed to checkout page
    const cart = new CartPOM(page);
    await cart.clickProceedToCheckout();

    //Fill out the billing details and place an order
    const checkout = new CheckoutPOM(page);
    await checkout.enterBillingDetails('David', 'Jacob', '10 Downing Street', 'London', 'SW1A 2AA', '096745746', 'hellogen@edgewords.co.uk');
    await checkout.clickCheckPayment();
    await checkout.clickPlaceOrder();

    //Get order number from Order Summary page
    const orderSummary = new OrderSummaryPOM(page);
    const orderNo = await orderSummary.Ordernumber;
    console.log('Successfully stored order number');

    //Navigate to account
    await navbar.goToAccount();

    //Get order number from My account -> order page
    await account.clickOrderTabButton();
    const orderTab = new OrderAccount(page);
    const latestOrderNo = await orderTab.latestOrderNumber;

    // check if order number match
    console.log(orderNo, latestOrderNo);

    //check if the number match
    expect(orderNo).toContain(latestOrderNo.substring(1));


});

for (let credentials of data) {

    test(`Running coupon tests: ${credentials.coupon}, ${credentials.coupon}`, async ({ page }) => {
        //Navigates to account
    const navbar = new NavBarPOM(page);
    await navbar.goToAccount();
    console.log("Successfully navigated to my account");

    //logging in to account
    const account = new AccountPOM(page);
    await account.login(credentials.username, credentials.password);
    expect(account.logoutButton).toBeVisible();
    console.log("Successfully logged into my account");

    //navigates to shop page
    await navbar.goToShop();
    console.log("Successfully navigated to the shop page");

    //Add item to cart
    const item = new ShopPOM(page, credentials.item)
    await item.clickAddToCart();
    console.log("Successfully entered coupon code")

    //Go to the cart page
    await item.clickViewCartButton();
    console.log("Successfully applied coupon code");

    //Enter Coupon Code
    const cart = new CartPOM(page);
    const coupon = 'edgewords';
    await cart.enterCouponCode(credentials.coupon);
    await cart.clickApplyCoupon();
    console.log("Successfully applied coupon " + coupon + "to cart");

    //Grab the string value
    const expectedTotal = await cart.calculateExpectedTotal();
    const actualTotal = await cart.getTotal();
    const expectedDiscount = await cart.calculateDiscount(credentials.discount);
    const actualDiscount = await cart.getDiscount();

    //Assert statement checks
    expect(actualTotal).toEqual(expectedTotal);
    console.log("Total from the website: £" + actualTotal/100 + " Total from calculating subtotal, discount and shipping: £" + expectedTotal/100);
    expect(actualDiscount).toEqual(expectedDiscount);
    console.log("Discount from the website: £" + actualDiscount/100 + " Discount from calculating subtotal, discount and shipping: £" + expectedDiscount/100);
    
    //cart cleanup process
    await cart.cartCleanUpProcess();
    });

}