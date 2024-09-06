import { test } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { CartPage } from '../pages/cartPage';

test('buy, delete tests', async ({ browser }) => {
    const context = await browser.newContext();
    const value = '698.00'

    // First Tab
    const page = await context.newPage();
    const mainPage = new MainPage(page);

    await mainPage.navigate();
    await mainPage.acceptCookies();
    await mainPage.clickBuyNow();
    await mainPage.addToCart();
    await mainPage.verifyProductInCart(value, 1);

    // Second Tab
    const page1 = await context.newPage();
    const cartPage = new CartPage(page1);
    await page1.goto('/');
    await cartPage.navigateToCart();
    
    await cartPage.deleteProduct();
    await cartPage.verifyCartIsEmpty(1);
    await cartPage.returnToShop();

    // Back to the main page
    await mainPage.goToProductPageWithReload(context);
});
