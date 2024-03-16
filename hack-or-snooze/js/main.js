"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $favoritesList = $("#favorites-list");
const $myStoriesList = $("#my-stories-list");


const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $newStoryForm = $("#new-story-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navNewStory = $("#nav-new-story");
const $navFavorites = $("#nav-favorites");
const $navMyStories = $("#nav-my-stories");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $allStoriesList,
    $favoritesList,
    $myStoriesList,
    $loginForm,
    $signupForm,
    $newStoryForm
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");

  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);

function addInputValidation(inputElement) {
  const errorElementId = inputElement.id + "-error"; // Assumes error elements have IDs corresponding to input IDs with '-error' suffix
  const errorElement = document.getElementById(errorElementId);

  inputElement.addEventListener("input", function (event) {
    if (event.target.value.trim() === '') {
      const errorMessage = "This cannot be blank!";
      event.target.setCustomValidity(errorMessage);
      if (errorElement) errorElement.textContent = errorMessage; // Update the text content of the error message element
      event.target.reportValidity();
    } else {
      event.target.setCustomValidity("");
      if (errorElement) errorElement.textContent = ""; // Clear the error message
    }
  });
}

addInputValidation($("#signup-name").get(0));
addInputValidation($("#signup-username").get(0));
addInputValidation($("#signup-password").get(0));
addInputValidation($("#login-username").get(0));
addInputValidation($("#login-password").get(0));
addInputValidation($("#new-story-title").get(0));
addInputValidation($("#new-story-author").get(0));
addInputValidation($("#new-story-url").get(0));