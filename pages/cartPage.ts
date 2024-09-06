import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
    private page: Page;
    private myCartLink: Locator;
    private deleteProductButton: Locator;
    private returnToShopLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.myCartLink = page.getByRole('link', { name: 'My Cart (1)' });
        this.deleteProductButton = page.locator('.xoo-wsc-smr-del');
        this.returnToShopLink = page.getByRole('link', { name: 'Return to Shop' });
    }

    async navigateToCart() {
        await expect(this.page.locator('body')).toContainText('My Cart (1)');
    
        for (let i = 0; i < 3; i++) {
            await this.page.getByRole('link', { name: 'My Cart (1)' }).click();
            const productVisible = await this.page.locator('.xoo-wsc-product').first().isVisible();
            if (productVisible) break;
        }
    }

    async deleteProduct() {
        await this.deleteProductButton.click();
    }

    async verifyCartIsEmpty(quantity: number) {
        const expectedCartText = `My Cart (${quantity})`;
        await expect(this.page.locator('body')).toContainText(expectedCartText);
    }

    async returnToShop() {
        await this.returnToShopLink.click();
    }
}
