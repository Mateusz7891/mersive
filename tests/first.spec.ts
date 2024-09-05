import { test } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { CartPage } from '../pages/cartPage';

test('test', async ({ browser }) => {
    const context = await browser.newContext();

    // First Tab
    const page = await context.newPage();
    const mainPage = new MainPage(page);

    await mainPage.navigate();
    await mainPage.acceptCookies();
    await mainPage.clickBuyNow();
    await mainPage.addToCart();
    await mainPage.verifyProductInCart();

    // Second Tab
    const page1 = await context.newPage();
    const cartPage = new CartPage(page1);
    await page1.goto('https://www.mersive.com/');
    await cartPage.navigateToCart();
    await cartPage.deleteProduct();
    await cartPage.verifyCartIsEmpty();
    await cartPage.returnToShop();

    // Back to the main page
    await mainPage.goToProductPageWithReload(context);
});
