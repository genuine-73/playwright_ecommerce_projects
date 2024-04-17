import { test, expect } from '@playwright/test';

import NavBarPOM from './POMclasses/NavBarPOM';
import AccountPOM from './POMclasses/AccountPOM';
import ShopPOM from './POMclasses/ShopPOM';
import CartPOM from './POMclasses/CartPOM';
import CheckoutPOM from './POMclasses/CheckoutPOM';
import PopUpsPOM from './POMclasses/PopUpsPOM';
import OrderSummaryPOM from './POMclasses/OrderSummaryPOM';
import OrderAccount from './POMclasses/OrderAccount';
import test_case_two_data from './test-data/test_case_two.json';
import test_case_one_data from './test-data/test_case_one.json';

/*----------TODO
    - Fix cart cleanup process
    - Change locator strategies
    - reporting 
*/

test.beforeEach("Setup", async function ({page}){
    //Navigate to page
    await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/')
    console.log("Successfully navigatedlogged into my account")

})



test("Test Case One: Applying Coupon", async function({page}){

    //Instantiates Objects
    const navbar = new NavBarPOM(page);
    const account = new AccountPOM(page);

    //navigates to shop page
    await navbar.goToShop();
    console.log("Successfully navigated to the shop page");

    //Add item to cart
    const shop = new ShopPOM(page, test_case_one_data.item);
    await shop.clickAddToCart();
    await expect(shop.addToCartButton).toBeVisible();
    console.log("Successfully entered coupon code")

    //Go to the cart page
    await shop.clickViewCartButton();
    console.log("Successfully applied coupon code");

    //Enter Coupon Code
    const cart = new CartPOM(page);
    await cart.enterCouponCode(test_case_one_data.coupon);
    await cart.clickApplyCoupon();
    await expect(cart.removeCoupon).toBeVisible();
    console.log("Successfully applied coupon " + test_case_one_data.coupon + "to cart");

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

    //Instantiates Objects
    const navbar = new NavBarPOM(page);
    const account = new AccountPOM(page);

    //navigates to shop page
    await navbar.goToShop();
    console.log("Successfully navigated to the shop page");

    //Add item to cart
    const shop = new ShopPOM(page, test_case_two_data.item);
    await shop.clickAddToCart();
    await expect(shop.addToCartButton).toBeVisible();
    console.log("Successfully added an item to cart")

    //Go to the cart page
    await shop.clickViewCartButton();
    console.log("Successfully navigated to cart page");

    //Proceed to checkout page
    const cart = new CartPOM(page);
    await cart.clickProceedToCheckout();

    //Setup variables for filling out billing details
    const setFirstName = test_case_two_data.firstname;
    const setLastName = test_case_two_data.lastname;
    const setStreetAddress = test_case_two_data.streetAddress;
    const setCity = test_case_two_data.city;
    const setPostcode = test_case_two_data.postcode;
    const setPhoneNo = test_case_two_data.phoneNo;
    const setEmail = test_case_two_data.email;

    //Fill out the billing details and place an order
    let checkout = new CheckoutPOM(page);
    await checkout.enterBillingDetails(setFirstName, setLastName, setStreetAddress, setCity, setPostcode, setPhoneNo, setEmail);

    // //Assert Statements to check text fields have been filled;
    await expect(checkout.firstName).toHaveValue(setFirstName);
    await expect(checkout.lastName).toHaveValue(setLastName);
    await expect(checkout.streetAddress).toHaveValue(setStreetAddress);
    await expect(checkout.city).toHaveValue(setCity);
    await expect(checkout.postCode).toHaveValue(setPostcode);
    await expect(checkout.phoneNo).toHaveValue(setPhoneNo);
    await expect(checkout.emailAddress).toHaveValue(setEmail);
    
    //Place order
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

// for (let credentials of data) {

//     test(`Running coupon tests: ${credentials.coupon}, ${credentials.coupon}`, async ({ page }) => {
    
//         //Instantiates objects
//     const navbar = new NavBarPOM(page);
//     const account = new AccountPOM(page);

//     //navigates to shop page
//     await navbar.goToShop();
//     console.log("Successfully navigated to the shop page");

//     //Add item to cart
//     const item = new ShopPOM(page, credentials.item)
//     await item.clickAddToCart();
//     console.log("Successfully entered coupon code")

//     //Go to the cart page
//     await item.clickViewCartButton();
//     console.log("Successfully applied coupon code");

//     //Enter Coupon Code
//     const cart = new CartPOM(page);
//     const coupon = 'edgewords';
//     await cart.enterCouponCode(credentials.coupon);
//     await cart.clickApplyCoupon();
//     console.log("Successfully applied coupon " + coupon + "to cart");

//     //Grab the string value
//     const expectedTotal = await cart.calculateExpectedTotal();
//     const actualTotal = await cart.getTotal();
//     const expectedDiscount = await cart.calculateDiscount(credentials.discount);
//     const actualDiscount = await cart.getDiscount();

//     //Assert statement checks
//     expect(actualTotal).toEqual(expectedTotal);
//     console.log("Total from the website: £" + actualTotal/100 + " Total from calculating subtotal, discount and shipping: £" + expectedTotal/100);
//     expect(actualDiscount).toEqual(expectedDiscount);
//     console.log("Discount from the website: £" + actualDiscount/100 + " Discount from calculating subtotal, discount and shipping: £" + expectedDiscount/100);
    
//     //cart cleanup process
//     await cart.cartCleanUpProcess();
//     });

// }

