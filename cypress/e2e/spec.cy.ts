describe("app flow", () => {
  it("should add product to cart and checkout", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Products").click();
    cy.url().should("include", "/products");
    cy.contains("Add to cart").click();
    cy.contains("Cart").click();
    cy.get('[data-testid="checkout-button"]').click();
    cy.url().should("include", "/checkout.stripe");
  });
});
