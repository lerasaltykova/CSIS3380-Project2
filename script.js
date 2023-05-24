console.log(users);

const contactList = document.getElementsByClassName("contact-list");
const pageLimit = 10;
const pageAmount = Math.ceil(users.length / pageLimit);

const numberOfUsers = document.getElementById("number-of-users");
numberOfUsers.textContent += users.length;

// the function that creates page links
const addPageNumber = (i) => {
  var pageList = document.getElementById("paginationList");
  var pageNumberElement = document.createElement("li");
  var link = document.createElement("a");
  link.classList.add("page-link");
  var linkText = document.createTextNode(i);
  link.appendChild(linkText);
  link.title = i;
  link.href = "javascript:choosePage(" + i + ");";
  pageNumberElement.appendChild(link);
  pageList.appendChild(pageNumberElement);
};

// the function that sets a page link active
const setActivePage = (activeNumber) => {
  var pageLinks = document.querySelectorAll(".page-link");
  for (let i = 0; i < pageLinks.length; i++) {
    pageLinks[i].classList.remove("active");
  }
  pageLinks[activeNumber].classList.add("active");
};

// the function that loads the whole list of users from the data and creates html
const loadList = () => {
  for (let i = 0; i < users.length; i++) {
    var profileItem = document.createElement("li");
    profileItem.classList.add("contact-item");
    profileItem.classList.add("display-none");
    var profileDiv = document.createElement("div");
    profileDiv.classList.add("contact-details");
    var profileImg = document.createElement("img");
    profileImg.setAttribute("src", users[i].image);
    profileImg.setAttribute("class", "avatar");
    profileDiv.appendChild(profileImg);
    var profileName = document.createElement("h3");
    profileName.textContent = users[i].name;
    profileDiv.appendChild(profileName);
    var profileEmail = document.createElement("span");
    profileEmail.classList.add("email");
    profileEmail.textContent = users[i].email;
    var profileDateDiv = document.createElement("div");
    profileDateDiv.classList.add("joined-details");
    var dateSpan = document.createElement("span");
    dateSpan.classList.add("date");
    dateSpan.textContent = "Joined " + users[i].joined;
    profileDateDiv.appendChild(dateSpan);
    profileItem.appendChild(profileDiv);
    profileItem.appendChild(profileDateDiv);
    profileItem.appendChild(profileEmail);
    contactList[0].appendChild(profileItem);
  }
};

// the function that sets the first page link as the active link and also only shows first 10 profiles for the page
const initialLoad = () => {
  setActivePage(0);
  let pageOneLimit = 0;
  var profileList = document.querySelectorAll(".contact-item");
  //   if the data has less than 10 users, the limit for the list will be the length of the data
  if (users.length >= 10) {
    pageOneLimit = 10;
  } else {
    pageOneLimit = users.length;
  }
  for (let i = 0; i < pageOneLimit; i++) {
    profileList[i].classList.remove("display-none");
  }
};

// the function that displays the right data based on page selection
const choosePage = (pageNum) => {
  setActivePage(pageNum - 1);

  let lastPage = (pageNum - 1) * pageLimit;
  let curPage = pageNum * pageLimit;

  var profileList = document.querySelectorAll(".contact-item");
  profileList.forEach((element, i) => {
    element.classList.add("display-none");
    if (i >= lastPage && i < curPage) {
      element.classList.remove("display-none");
    }
  });
};

loadList();
for (let i = 1; i <= pageAmount; i++) {
  addPageNumber(i);
}
initialLoad();
