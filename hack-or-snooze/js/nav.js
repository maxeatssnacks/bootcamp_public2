"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  getAndShowStoriesOnStart();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
  $loginForm.hide();
  $signupForm.hide();
}

function navNewStoryClick(evt) {
  console.log("navNewStory", evt);
  hidePageComponents();
  $newStoryForm.show();
  $allStoriesList.show();

}

$navNewStory.on("click", navNewStoryClick);

function navFavoritesClick(evt) {
  hidePageComponents();
  putFavoritesOnPage();
  $favoritesList.show();
}

$navFavorites.on("click", navFavoritesClick);

function navMyStoriesClick(evt) {
  hidePageComponents();
  putMyStoriesOnPage();
  let $starIcons = $("#my-stories-list i");
  $starIcons.each(function() {
    let $trash = $('<i>').addClass('fa fa-trash').attr('id', 'trash');
    $(this).after($trash.prop('outerHTML'));
});
  $myStoriesList.show();
}

$navMyStories.on("click", navMyStoriesClick);