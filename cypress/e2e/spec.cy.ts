describe("My First Test", () => {
  it("Tests the flow of my application", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Products").click();
    cy.url().should("include", "/products");
    cy.contains("Add to cart").click();
    cy.contains("Cart").click();
    cy.get('[data-testid="checkout-button"]').click();
    cy.url().should("include", "/checkout.stripe");
  });
});
