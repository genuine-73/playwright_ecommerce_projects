import { test } from './fixtures/my-base-test';
import { expect } from '@playwright/test';
import testContact from './test-data/billing.json';
import testVoucher from './test-data/coupon.json'
import OrderAccountPOM from './POMclasses/OrderAccountPOM';


test("Test Case One: Applying Coupon", async function({ cart }){

    //Passing coupon code
    await cart.enterCouponCode(testVoucher.coupon);
    await cart.applyCoupon();
    await expect(cart.removeCoupon, "A valid coupon should be applied").toBeVisible();

    //Calculates total and discount for testing
    const discount = testVoucher.discount;
    const expectedTotal = await cart.calculateExpectedTotal(discount);
    const actualTotal = await cart.getTotal();
    const expectedDiscount = await cart.calculateDiscount(discount);
    const actualDiscount = await cart.getDiscount();

    //Checks if discount has been applied correctly
    expect.soft(actualDiscount, "Test failed: Discount from the website: £" 
    + actualDiscount/100 + " Discount calculated: £" 
    + expectedDiscount/100).toEqual(expectedDiscount);
    
    //Checks if total has been applied correctly
    expect.soft(actualTotal, "Test failed: Total from the website: £" 
    + actualTotal/100 + " Total from calculating subtotal, discount and shipping: £" 
    + expectedTotal/100).toEqual(expectedTotal);

});

test("Test Case Two: Placing Order", async function({ homePage, cart, page }){
    
    //Navigates to the product page 
    const checkout = await cart.goToCheckout();

    //Setup variables for filling out billing details
    const setFirstName = testContact.firstname;
    const setLastName = testContact.lastname;
    const setStreetAddress = testContact.streetAddress;
    const setCity = testContact.city;
    const setPostcode = testContact.postcode;
    const setPhoneNo = testContact.phoneNo;
    const setEmail = testContact.email;

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
    const orderSummary = await checkout.placeOrder();
    const orderNo = await orderSummary.Ordernumber;

    //Navigate to account
    const account = await homePage.goToAccountSuccess();

    //Get order number from My account -> order page
    await account.goToOrders();
    const orderTab = new OrderAccountPOM(page);
    const latestOrderNo = await orderTab.latestOrderNumber;

    //Check if the order numbers match
    expect(orderNo, `Order number from summary page: ${orderNo} | Order number from Orders Page ${latestOrderNo}`)
    .toContain(latestOrderNo.substring(1));
});
