describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'Ryujin',
      password: 'password',
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login').click();
  });

  describe('Login', function () {
    beforeEach(function () {});
    it('succeeds with correct credentials', function () {
      cy.get('#usernameInput').type('Ryujin');
      cy.get('#passwordInput').type('password');
      cy.contains('login').click();
      cy.contains('Ryujin logged in');
    });

    it('fails with wrong credentails', function () {
      cy.contains('login').click();
      cy.contains('invalid username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'Ryujin',
        password: 'password',
      }).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
      cy.createBlog({
        title: 'Best blog ever',
        author: 'Shikimaru',
        url: 'www.testing.com',
      });
    });

    it('a new blog can be created', function () {
      cy.contains('Best blog ever Shikimaru');
    });

    it('like button works properly', function () {
      cy.contains('Best blog ever Shikimaru').contains('view').click();
      cy.contains('Best blog ever Shikimaru').get('#like-button').click();
      cy.contains('likes 1');
    });

    it('a user can delete its own blog', function () {
      cy.contains('remove').click();
      cy.contains('Best blog ever Shikimaru').should('not.exist');
    });

    it.only('blog is ordered starting with most likes', function () {
      cy.createBlog({
        title: 'wtf',
        author: 'dan',
        url: 'www.testing.com',
      });
      cy.createBlog({
        title: 'andrew tate',
        author: 'cobra',
        url: 'www.testing.com',
      });
      cy.contains('wtf dan').contains('view').click();
      cy.contains('andrew tate cobra').contains('view').click();
      cy.contains('wtf dan')
        .parent()
        .find('.afterView')
        .find('#like-button')
        .click();
      for (let i = 0; i < 3; ++i) {
        cy.contains('andrew tate cobra')
          .parent()
          .find('.afterView')
          .find('#like-button')
          .click();
      }
      cy.visit('http://localhost:3000');
      cy.get('.blog').eq(0).should('contain', 'andrew tate cobra');
      cy.get('.blog').eq(1).should('contain', 'wtf dan');
      cy.get('.blog').eq(2).should('contain', 'Best blog ever Shikimaru');
    });
  });
});
