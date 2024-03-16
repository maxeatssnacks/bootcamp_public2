"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  try {
    let favoritedStory = currentUser.favorites.find(obj => obj.storyId === story.storyId);
    if (favoritedStory) {
      return $(`
        <li id="${story.storyId}">
          <i id="star" class="fa fa-star"></i>
          <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
        </li>
      `);
    } else {
      return $(`
      <li id="${story.storyId}">
        <i id="star" class="fa fa-star-o"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
    }
  } catch (error) {
    return $(`
      <li id="${story.storyId}">
        <i id="star" class="fa fa-star-o"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
  }


}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage1");

  $favoritesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $story = generateStoryMarkup(story);
    $favoritesList.append($story);
  }
}

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  $myStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story);
    $myStoriesList.append($story);
  }
}

async function addStoryFromForm(e) {
  e.preventDefault();
  const x = $("#new-story-title").val();
  const y = $("#new-story-author").val();
  const z = $("#new-story-url").val();

  let response = await storyList.addStory(currentUser, { title: x, author: y, url: z });
  const $story = generateStoryMarkup(response);
  currentUser.ownStories.push(response);
  $allStoriesList.prepend($story);
  $("#new-story-title").val("");
  $("#new-story-author").val("");
  $("#new-story-url").val("");
  $newStoryForm.hide();
}

$("#submit-new-story").on("click", addStoryFromForm);

async function clickingStar(e) {
  let clickedStoryId = e.target.parentElement.id;
  if (e.target.classList.contains("fa-star-o")) {
    let response = await User.favoritingStories(currentUser, clickedStoryId);
    currentUser.favorites = [];
    for (let story of response.data.user.favorites) {
      let addToArray = new Story(story);
      currentUser.favorites.push(addToArray);
    }
  } else if (e.target.classList.contains("fa-star")) {
    let response = await User.unfavoritingStories(currentUser, clickedStoryId);
    currentUser.favorites = [];
    for (let story of response.data.user.favorites) {
      let addToArray = new Story(story);
      currentUser.favorites.push(addToArray);
    }
  }
  $(this).toggleClass("fa-star-o")
  $(this).toggleClass("fa-star")
}

$("body").on("click", "#star", clickingStar);


async function clickingTrashCan(e) {
  let clickedStoryId = e.target.parentElement.id;
  const response = await User.deletingStories(currentUser, clickedStoryId);
  currentUser.ownStories = [];
  for (let story of response.data.user.stories) {
    let addToArray = new Story(story);
    currentUser.ownStories.push(addToArray);
  }
  e.target.parentElement.remove();
}


$("body").on("click", "#trash", clickingTrashCan);