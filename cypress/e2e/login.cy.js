describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("Login form tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });
  it("should login succesfully with valid data", () => {
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("StrongP@ss1");
    cy.get("input[name=terms]").check();
    cy.get("button[type=submit]").should("not.be.disabled").click();

    cy.url().should("include", "/success");
    cy.contains("Login Successful!").should("be.visible");
  });

  it("shows errors for mail and password", () => {
    cy.get("input[name=email]").type("yanlisEmail");
    cy.get("input[name=password]").type("sifreKisa");
    cy.get("input[name=terms]").check();

    cy.get("button[type=submit]").should("be.disabled");
    cy.contains("Geçerli bir email giriniz.").should("be.visible");
    cy.contains(
      "Parola en az 8 karakter, bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
    ).should("be.visible");
  });

  it("does not allow submit if terms not accepted", () => {
    cy.get("input[name=email]").type("test@exapmple.com");
    cy.get("input[name=password]").type("StrongP@ss1");
    cy.get("button[type=submit]").should("be.disabled");
  });
});
