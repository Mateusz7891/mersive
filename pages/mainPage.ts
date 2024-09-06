import { Locator, Page, expect } from '@playwright/test';

export class MainPage {
    private page: Page;
    private acceptAllButton: Locator;
    private buyNowLink: Locator;
    private addToCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptAllButton = page.getByRole('button', { name: 'Accept All' });
        this.buyNowLink = page.getByRole('link', { name: 'Buy Now' }).first();
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' }).nth(1);
    }

    async navigate() {
        await this.page.goto('/');
    }

    async acceptCookies() {
        await this.acceptAllButton.click();
    }

    async clickBuyNow() {
        await this.buyNowLink.click();
    }

    async addToCart() {
        await this.page.waitForLoadState('networkidle'); //had to add that, there is some glitch on the page
        await this.addToCartButton.waitFor({ state: 'visible' });
        await this.addToCartButton.click();
    }
    

    async verifyProductInCart(price: string, quantity: number) {
        const expectedProductText = `Solstice Element - + $${price}`;
        const expectedSubtotalText = `Subtotal $${price}`;
        const expectedCartText = `My Cart (${quantity})`;
    
        // Verify product text, subtotal, and cart quantity
        await expect(this.page.locator('body')).toContainText(expectedProductText);
        await expect(this.page.locator('body')).toContainText(expectedSubtotalText);
        await expect(this.page.locator('body')).toContainText(expectedCartText);
    }
    

    async goToProductPageWithReload(context) {
        const pages = context.pages();
        const firstPage = pages[0];
        await firstPage.bringToFront();
        await firstPage.reload();
        await expect(firstPage.locator('body')).toContainText('Buy Now');
    }
    
}
