export default {
  // Public Auth Pages
  login: "/login",
  register: "/register",
  recover: "/recover/:tokenId",
  forgotpassword: "/forgot-password",

  // Requires Authentication Pages
  home: "/",
  bookdetails: "/book-details/:bookId",
  collections: "/collection",
  challenges: "/challenge",
  booksearch: "/book-search",
  similarbooks: "/similar-books/:bookId/:keys",
  readbooks: "/read-books"
};
