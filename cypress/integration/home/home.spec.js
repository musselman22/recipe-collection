/* eslint-disable no-undef */
describe("Home page", () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it("header contains recipe heading with a message that there are no recipes", () => {
    cy.findByRole('heading').should('contain', 'My Recipes')
    cy.get('p')
      .findByText('There are no recipes to list.')
      .should('exist')
  })

  it("contains an add recipe button that when clicked opens a form", () => {
    cy.findByRole('button').click();

    cy.get('form')
      .findByRole('button')
      .should('exist')
  })

  it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
    cy.findByRole('button').click();
    expect(cy.findByRole('textbox', { name: /Recipe name/i })).toExist()
    cy.findByRole('textbox', { name: /instructions/i }).should('exist')
  })

  it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
    const recipeName = 'Tofu Scramble Tacos';
    cy.findByRole('button').click()
    cy.findByRole('textbox', { name: /Recipe name/i }).type(recipeName)
    cy.findByRole('textbox', { name: /instructions/i }).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")

    return cy.findByRole('button').click()
      .then(() => {
        expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();
      })
  })

  it("displays multiple recipes under the 'My Recipes' heading after the recipes have been added through the 'Add Recipe' form", () => {
    const recipeName = 'Tofu Scramble Tacos';
    cy.findByRole('button').click()
    cy.findByRole('textbox', { name: /Recipe name/i }).type(recipeName)
    cy.findByRole('textbox', { name: /instructions/i }).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
    cy.findByRole('button').click()
    cy.findByRole('textbox', { name: /Recipe name/i }).clear()
    cy.findByRole('textbox', { name: /instructions/i }).clear()

    const recipeName2 = 'Pizza';
    cy.findByRole('textbox', { name: /Recipe name/i }).type(recipeName2)
    cy.findByRole('textbox', { name: /instructions/i }).type("1. heat an oven to 500 degrees {enter} 2. throw pizza in oven")
    return cy.findByRole('button').click()
      .then(() => cy.findAllByRole('listitem'))
      .then((list) => expect(list).toHaveLength(2))
  })
})