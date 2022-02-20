describe('E2E testing Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })
    //5.17
    it('login page is the one that opens first', function() {
        cy.contains('log in to application')
    })

    describe('when there\'s a user in our database', function () {
        beforeEach(function() {
            const user = {
                name: 'Testi Kayttaja',
                username: 'testi',
                password: 'salasana'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
        })
        //5.18
        it('login works', function() {
            cy.get('#username').type('testi')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()

            cy.contains('Testi Kayttaja logged in')
        })
        //5.18
        it('login fails with wrong password', function() {
            cy.get('#username').type('testi')
            cy.get('#password').type('vaarasalasana')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
            cy.get('html').should('not.contain', 'Testi Kayttaja logged in')
        })

        describe('when logged in', function() {
            beforeEach(function() {
                cy.request('POST', 'http://localhost:3003/api/login', {
                    username: 'testi', password: 'salasana'
                }).then(response => {
                    localStorage.setItem('loggedUser', JSON.stringify(response.body))
                    cy.visit('http://localhost:3000')
                })
            })
            //5.19
            it('a new blog can be created', function() {
                cy.contains('add new blog').click()
                cy.get('#t').type('e2e tests with cypress')
                cy.get('#a').type('mluukkai')
                cy.get('#u').type('www.fi')
                cy.contains('create').click()
                cy.contains('e2e tests with cypress')
            })

            describe('when there is a blog initially added by logged user', function() {
                beforeEach(function () {
                    cy.request({
                        url: 'http://localhost:3003/api/blogs',
                        method: 'POST',
                        body: {
                            title: 'testing web applications',
                            author: 'mluukkai',
                            url: 'www.fi',
                            user : JSON.parse(localStorage.getItem('loggedUser'))
                        },
                        headers: {
                            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
                        }
                    }).then(() => {
                        cy.visit('http://localhost:3000')
                    })
                })
                //5.20
                it('clicking like works', function() {
                    cy.contains('view').click()
                    cy.contains('like').click()
                    cy.contains('likes 1')
                })
                //5.21
                it.only('removing a blog works', function() {
                    cy.contains('testing web applications').as('theBlog')
                    cy.contains('view').click()
                    cy.get('@theBlog').should('contain', 'Testi Kayttaja')
                    cy.contains('remove').click()
                    cy.get('html').should('not.contain', '@theBlog')
                })
            })
        })
    })
})