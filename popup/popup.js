function startCounter() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {"message": "start"}, response => {
      console.log('start response', response);
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("start-connection").addEventListener("click", startCounter);
});

function stopCounter() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {"message": "stop"}, response => {
      console.log("stop response", response);
      document.querySelector('.connected-text').style.display = "block";
      document.querySelector('#connected-number').innerHTML = response.length;
      let allProfileExist = "allProfiles" in response[response.length - 1];
      console.log("allProfileExist", allProfileExist);
      if (allProfileExist) {
        document.querySelector('#all-profiles-number').innerHTML = response[response.length - 1].allProfiles;
      }
      response.map((item) => {
        document.querySelector('.results').innerHTML += '<a href="https://my.shaadi.com/profile?profileid=0' + item.id + '" target="_blank" class="profile-bio"><div class="profile-image-div"><img class="profile-image" src="' + item.src + '" alt="profile-photo"></div><div class="profile-bio-div"><p class="profile-id">' + item.id + '</p><p class="profile-name">' + item.name + '</p><p class="profile-age">' + item.age + '</p><p class="profile-createdBy">' + item.createdBy + '</p><p class="profile-height">' + item.height + '</p><p class="profile-salary">' + item.salary + '</p><p class="profile-location">' + item.location + '</p></div></a>';
      })
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("stop-connection").addEventListener("click", stopCounter);
});