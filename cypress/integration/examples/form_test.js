
describe('User Onboarding App', () => {
    //here are our tests
    //we are trying to simulate what the user does

    beforeEach(() => {
        //code we want running before our test run
        cy.visit('http://localhost:3000')
    });

    const nameInput = () => cy.get('input[name="name"]')
    const emailInput = () => cy.get('input[name="email"]')
    const passwordInput = () => cy.get('input[name="password"]')
    const roleSelect = () => cy.get('select[name="role"]')
    const termsBox = () => cy.get('input[name="terms"]')
    const submitBtn = () => cy.get('button')

    //every time it reinvokes the function it will grab the latest input
    //it must be done in a logical flow

    it('sanity test to make sure tests work', () => {
        // 'expect' is an assertion
        //there can be many assertions per test
        //though inside of the 'it' statement (the test),
        //usually those assertions are logically grouped together
        //we are expecting the code to run a certain way
        expect(1 + 2).to.equal(3);
        expect(2 + 2).not.to.equal(5);
        expect({}).not.to.equal({}) //not strict (==)
        expect({}).to.eql({}) //strict (===) These are 2 different objects in memory so they wouldnt strictly be equal
    });

    it("can type in the inputs", () => {
        // grab the inputs
        // assert that they are empty (has value of empty string)
        // assert that the thing we typed is there
        // type in them
        nameInput()
          .should("have.value", "")
          .type("Joe Mama")
          .should("have.value", "Joe Mama")

        emailInput()
          .should("have.value", "")
          .type("billy@bob.com")
          .should("have.value", "billy@bob.com")
        
        passwordInput()
          .should("have.value", "")
          .type("babaloooo")
          .should("have.value", "babaloooo")
    });

    it('can make a selection from roles', () => {

        roleSelect()
            .should("have.value", "")
            .select("Back-End Developer")
            .should("have.value", "Back-End Developer")
    })

    it('can check and uncheck the checkbox', () => {
        termsBox().check().uncheck()
    })


    it('submit button is disabled until everything is filled out', () => {
        //1. Arrange: set up sanity checks to make sure initial state is the state we expect
        //2. Act: (like typing or clicking -mimicking user input)
        //3. Assert that the action has the effect we expect

        // button is disabled is true
        submitBtn().should('be.disabled')
        // type in name
        nameInput().type("Joey")
        // button is disabled is true
        submitBtn().should('be.disabled')
        // clear the text field
        nameInput().clear()
        // type in email field
        emailInput().type("joe@mama.com")
        // button is disabled is true
        submitBtn().should("be.disabled")
        // clear the text field
        emailInput().clear()
        // terms should not be selected
        termsBox().should('be.enabled')
        termsBox().should('not.be.checked')
        termsBox().check()
        termsBox().should('be.checked')
        // select terms
        roleSelect().select('Front-End Developer')
        // type in password
        passwordInput().type("babalooo")
        // button is disabled is true
        submitBtn().should('be.disabled')
        // type in the name field
        nameInput().type("Joey")
        // type in email field
        emailInput().type("joe@mama.com")
        // select a role
        // button is disabled is false
        submitBtn().should('not.be.disabled')

    
    })

    it ('shows all error messages', () => {
        nameInput().type("Jimmay")
        nameInput().clear()
        roleSelect().select('Front-End Developer')
        roleSelect().select('')
        emailInput().type("jimmay@jimmay.com")
        emailInput().clear()
        passwordInput().type("babalooo")
        passwordInput().clear()
        termsBox().check()
        termsBox().uncheck()
    })
    
    it ('add a user to screen', () => {
        nameInput().type("Jimmay")
        roleSelect().select('Front-End Developer')
        emailInput().type("jimmay@jimmay.com")
        passwordInput().type("babalooo")
        termsBox().check()
        submitBtn().click()
    })
})