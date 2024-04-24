import { test} from './fixtures/my-base-test-2';
import {expect} from '@playwright/test';
import { HelperMethods as helper} from './HelperMethods/HelperMethods';
import test_case_two from './test-data/test_case_two.json';
import test_case_one from './test-data/test_case_one.json';



test("Test Case One: Applying Coupon", async function({page, loginToAccount, cart}){

    // //navigates to shop page
    // const cart = await loginToAccount.clickAddCartButton();
    // console.log("Successfully added an item to cart")

    // //Checks to see if an item has been added to cart
    // await expect(cart.productName.filter({hasText: test_case_two.item}),"Needed to check if the item added from the shop page is in cart").toHaveText(test_case_two.item);

    //Passing coupon code
    await cart.enterCouponCode(test_case_one.coupon);
    await cart.clickApplyCoupon();
    await expect(cart.removeCoupon, "A valid coupon should be applied").toBeVisible();
    console.log("Successfully applied coupon " + test_case_one.coupon + "to cart");

    //Grab the string value
    const expectedTotal = await helper.calculateExpectedTotal(page);
    const actualTotal = await helper.getTotal(page);
    const expectedDiscount = await helper.calculateDiscount(test_case_one.discount, page);
    const actualDiscount = await helper.getDiscount(page);

    //Assert statement checks
    expect.soft(actualDiscount, "Test failed: Discount from the website: £" + actualDiscount/100 + " Discount calculated: £" + expectedDiscount/100).toEqual(expectedDiscount);
    expect.soft(actualTotal, "Test failed: Total from the website: £" + actualTotal/100 + " Total from calculating subtotal, discount and shipping: £" + expectedTotal/100).toEqual(expectedTotal);

    //cart cleanup process
    // await cart.cartCleanUpProcess();

});

test("Test Case Two: Placing Order", async function({navbar, loginToAccount, orderTab}){

    //navigates to shop page
    // const shop = await navbar.goToShopSuccess(test_case_one.item);
    // console.log("Successfully navigated to the shop page");

    // const cart = await shop.clickAddCartButton();
    const cart = await loginToAccount.clickAddCartButton();
    console.log("Successfully added an item to cart")

    //Checks to see if an item has been added to cart
    await expect(cart.productName.filter({hasText: test_case_two.item}),"Needed to check if the item added from the shop page is in cart").toHaveText(test_case_two.item);
    
    //Navigates to the product page 
    const checkout = await cart.clickProceedToCheckout();

    //Setup variables for filling out billing details
    const setFirstName = test_case_two.firstname;
    const setLastName = test_case_two.lastname;
    const setStreetAddress = test_case_two.streetAddress;
    const setCity = test_case_two.city;
    const setPostcode = test_case_two.postcode;
    const setPhoneNo = test_case_two.phoneNo;
    const setEmail = test_case_two.email;

    //Fill out the billing details and place an order
    await checkout.enterBillingDetails(setFirstName, setLastName, setStreetAddress, setCity, setPostcode, setPhoneNo, setEmail);

    //Assert Statements to check text fields have been filled;
    await expect(checkout.firstName, "The first name field should be: " + setFirstName).toHaveValue(setFirstName);
    await expect(checkout.lastName, "The last name field should be: " + setLastName).toHaveValue(setLastName);
    await expect(checkout.streetAddress, "The street address field should be: " + setStreetAddress).toHaveValue(setStreetAddress);
    await expect(checkout.city, "The city field should be: " + setCity).toHaveValue(setCity);
    await expect(checkout.postCode, "The postcode field should be: " + setPostcode).toHaveValue(setPostcode);
    await expect(checkout.phoneNo, "The phoneNo field should be: " + setPhoneNo).toHaveValue(setPhoneNo);
    await expect(checkout.emailAddress, "The email address field should be: " + setEmail).toHaveValue(setEmail);
    
    //Get order number from Order Summary page
    const orderSummary = await checkout.clickPlaceOrder();
    console.log("Successfully placed an order")
    const orderNo = await orderSummary.Ordernumber;
    console.log('Successfully assigned order number from order summary page to variable: ' + orderNo);

    //Navigate to account
    const account = await navbar.goToAccountSuccess();
    console.log("Successfully navigated to Account")

    //Get order number from My account -> order page
    await account.clickOrderTabButton();
    const latestOrderNo = await orderTab.latestOrderNumber;
    console.log("Successfully assigned order number from Account->Orders to variable: " + latestOrderNo)

    //check if the number match
    expect(orderNo, `Order number from summary page: ${orderNo} | Order number from Orders Page ${latestOrderNo}`).toContain(latestOrderNo.substring(1));

});