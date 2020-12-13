var counter = 0;
var connectedCounter = 0;
var formatted_images = [];
console.log("content.js loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.message === "start") {
		console.log("Connection started")
		console.log("10 formatted_images", formatted_images);
		readyStateCheckInterval = setInterval( function() {
			var moreButtons = document.querySelectorAll(".styles__MoreBtn-bCIqEA");
			for (let i = 0; i < moreButtons.length; i++) {
			  moreButtons[i].click();
			}

			let profileName = document.querySelector(".stylesB__NameSpan-cComH").innerHTML;
			let profileCreateWrap = document.querySelector(".styles__ProfileCreatedWapper-dXmDLO").innerText.split("|");
			let profileId = profileCreateWrap[0].trim();
			let profilecreatedBy = profileCreateWrap[1].trim();
			let profileBio = document.querySelector(".stylesB__DetailDesc-bGawpS").innerText.split(",");
			let profileAge = profileBio[0];
			let profileHeight = profileBio[1].trim();

			console.log("profileName", profileName);
			console.log("profileId", profileId);
			console.log("profilecreatedBy", profilecreatedBy);
			console.log("profileAge", profileAge);
			console.log("profileHeight", profileHeight);

			let citizenNodeList = document.querySelectorAll('.sumKV');
			let countryNodeList = document.querySelectorAll('.dnuBhe');

			let citizenCountryValue, citizenCountryResult;
			for (let i = 0; i < citizenNodeList.length; i++) {
		    citizenCountryValue = citizenNodeList[i].innerHTML;
		    if (citizenCountryValue.substring(0, 5) === "Lives") {
	        citizenCountryResult = citizenCountryValue;
	        break;
		    }
			}

			let citizenSalaryValue, citizenSalaryResult;
			for (let i = 0; i < citizenNodeList.length; i++) {
		    citizenSalaryValue = citizenNodeList[i].innerHTML;
		    if (citizenSalaryValue.substring(0, 5) === "Earns") {
	        citizenSalaryResult = citizenSalaryValue;
	        break;
		    }
			}

			console.log("citizenCountryResult", citizenCountryResult);
			console.log("citizenSalaryResult", citizenSalaryResult);


			if (typeof citizenCountryResult === "undefined") {
			  profileLocation = "Location not mentioned";
			} else {
			  profileLocation = citizenCountryResult;
			}

			if (typeof citizenSalaryResult === "undefined") {
			  profileSalary = "Salary not mentioned";
			} else {
			  profileSalary = citizenSalaryResult;
			}

			let imageSrc = document.querySelector('div[src]').getAttribute('src');

			var citizenNodeListText = "";
			for (let i = 0; i < citizenNodeList.length; i++) {
			  citizenNodeListText += citizenNodeList[i].innerHTML;
			}
			let citizenSearch = citizenNodeListText.includes("Citizen");

			var countryNodeListText = "";
			for (i = 0; i < countryNodeList.length; i++) {
			  countryNodeListText += countryNodeList[i].innerHTML;
			}
			let countrySearch = countryNodeListText.includes("India");

			console.log("Are they a citizen?", citizenSearch);
			console.log("Is India in their list?", countrySearch);


			let allNextButtons = document.querySelectorAll(".eKaeaC");
			let nextButtonPosition = allNextButtons.length - 1;
			

			if(citizenSearch == true && countrySearch == true) {
				counter ++;
				connectedCounter ++;
				console.log("All profiles:", counter);
				console.log("Profiles Connected:", connectedCounter);
				formatted_images.push({
					name: profileName,
					id: profileId,
					age: profileAge,
					createdBy: profilecreatedBy,
					height: profileHeight,
					salary: profileSalary,
					location: profileLocation,
					src: imageSrc,
					allProfiles: counter,
					connectedProfiles: connectedCounter
				})
				document.querySelector(".styles__CustomRoundButton-jzLtVo").click();
				console.log("CONNECTED!!!", formatted_images);
				allNextButtons[nextButtonPosition].click();
			}  else {
				counter ++;
				allNextButtons[nextButtonPosition].click();
			}
		}, 5000);
		sendResponse(formatted_images);
		console.log("All profiles counter", counter);
		console.log("Connected profiles counter", connectedCounter);
		console.log("Connecting started", formatted_images);
	} else if (request.message === "stop") {
		clearInterval(readyStateCheckInterval);
		sendResponse(formatted_images);
	}
});