describe("app flow", () => {
  it("should add product to cart and checkout", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Sign In").click();
    cy.url().should("include", "/signin");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Passw0rd");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/products");
    cy.contains("Products").click();
    cy.url().should("include", "/products");
    cy.contains("Add to cart").click();
    cy.contains("Cart").click();
    cy.get('[data-testid="checkout-button"]').click();
    cy.url().should("include", "/checkout.stripe");
  });
});
