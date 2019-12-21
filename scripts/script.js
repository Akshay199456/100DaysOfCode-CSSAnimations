/* -------------------------------------- */
/* 			Variable Declarations 		  */
/* -------------------------------------- */

// Used to indicate the current choice of the user. Default is 2 to show the 'roseGold' version.
let currentValue = 2;

// Used to track index numbers and color names to show the right images 
let currentSelectionMap = new Map();

// Used to indicate previous choice. Default is 'roseGold' version.
let previousSelection = "roseGold";

// Setting map values to coordinate with the different colors of product
currentSelectionMap.set(0, "black");
currentSelectionMap.set(1, "gold");
currentSelectionMap.set(2, "roseGold");
currentSelectionMap.set(3, "silver");
currentSelectionMap.set(4, "red");


// Used to assoicate the font color of the text with each color.;
const textColor = {
	"black": "#000000",
	"gold": "#E8D99B",
	"roseGold": "#EACFC1",
	"silver": "#D1D1D1",
	"red": "#DD2D2D"
}

//  Used to associate the image of each product with each color
const imageUrls = {
	red : "loop-product-s1-red.jpg",
	black: "loop-product-s1-black.jpg",
	gold: "loop-product-s1-gold.jpg",
	roseGold: "loop-product-s1-rosegold.jpg",
	silver: "loop-product-s1-silver.jpg"
};

//  Used to associate the background-image with each color of the product
const backgroundUrls = {
	red:"loop-slide-red.jpg",
	black:"loop-slide-black2.jpg" ,
	gold:"loop-slide-gold2.jpg",
	roseGold:"loop-slide-rosegold.jpg",
	silver: "loop-slide-silver.jpg"
};



/* -------------------------------------- */
/* 			Functions			 		  */
/* -------------------------------------- */

// Used to set 'currentValue'
function setCurrentValue(index){
	currentValue+=index;
}


// Used to check that 'currentValue' is always between 0 and 4 to display the right images
function checkCurrentValueOverFlow(){
	if(currentValue < 0)
		currentValue = 4;
	else if(currentValue > 4)
		currentValue = 0;
}



// Used to set the appropriate background image for each of the colors selected by the user.
function setBackgroundAndImage(){
	/* 

	This is used to get the relative path of the file. The value is then used to append to the relative URLS
	to get the images from the local folder instead of having to host them on a website
	*/
	var scripts= document.getElementsByTagName('script');
	var path= scripts[scripts.length-1].src.split('?')[0];      // remove any ?query
	var mydir= path.split('/').slice(0, -1).join('/')+'/';  // remove last filename part of path



	const currentObject = currentSelectionMap.get(currentValue);
	const body = document.body;
	const image = document.getElementById("imageNavigator").children[1];
	// console.log(image.getAttribute("src"));

	const bodyUrl = mydir+"../images/"+backgroundUrls[currentObject];
	const imageUrl = mydir+"../images/"+imageUrls[currentObject];
	// console.log(image);

	// console.log("url('"+bodyUrl+"')");
	body.style.backgroundImage = "url('"+bodyUrl+"')";
	image.setAttribute("src", imageUrl);
}


// Used to get index number of the color that the user has selected.
function findIdFromColor(color){
	for(let [key,value] of currentSelectionMap.entries()){
		if(color === value)
			return key;
	}
}


// Displays the right color along with the right text depending on the choice selected
function displayTextOnSelection(){
	const color = currentSelectionMap.get(currentValue);
	const buttonSelector = document.getElementById(color);
	if(!previousSelection || previousSelection !== color){

		if(previousSelection){
			const previousChoice = document.getElementById(previousSelection);
			previousChoice.classList.remove("showFromBelow");
			previousChoice.classList.add("circle");
			previousChoice.innerHTML = "";
		}
		// console.log(buttonSelector);
		buttonSelector.classList.add("showFromBelow");
		buttonSelector.style.color = textColor[color];
		buttonSelector.innerHTML = color.toUpperCase();
		previousSelection = color;
		// console.log("Previous Selection : " + previousSelection);
		buttonSelector.classList.remove("circle");
	}
}


/* -------------------------------------- */
/* 			Event Listeners			 	  */
/* -------------------------------------- */

const img = document.getElementById("displayImage");


// Triggered when user clicks on the left symbol
const leftIcon = document.getElementById("moveLeft");
leftIcon.addEventListener("click", () => {
	img.classList.toggle("addTransition");
	console.log("Left button clicked");
	setCurrentValue(-1);
	checkCurrentValueOverFlow();
	// console.log("Current value: " + currentValue);
	displayTextOnSelection();
	setBackgroundAndImage();
});


// Triggered when user clicks on the right symbol
const rightIcon = document.getElementById("moveRight");
rightIcon.addEventListener("click", () => {
	img.classList.toggle("addTransition");
	console.log("Right button clicked");
	setCurrentValue(1);
	checkCurrentValueOverFlow();
	// console.log("Current value: " + currentValue);
	displayTextOnSelection();
	setBackgroundAndImage();
});


// Triggered when the button navigator is used instead for selecting the color of the product.
const buttonNavigator = document.getElementById("buttonNavigator");
buttonNavigator.addEventListener("click", e => {
	console.log("Event Target: " + e.target.id);
	console.log("Event Current Target: " + e.currentTarget.id);
	if(e.target.id !== e.currentTarget.id){
		img.classList.toggle("addTransition");
		currentValue = findIdFromColor(e.target.id);
		displayTextOnSelection();
		// console.log(currentValue);
		setBackgroundAndImage();
	}
});



// Used to display link to Amazon when hovered over
const spanListener = document.getElementById("buttonNavigator").nextElementSibling;
// console.log(spanListener.innerHTML);
spanListener.addEventListener("mouseover", () => {
	spanListener.style.cursor = "pointer";
	spanListener.innerHTML = 'BUY NOW ON AMAZON <i class="giveMargin fas fa-plus"></i> ';
	console.log("SpanListener: " + spanListener.innerHTML);
});

spanListener.addEventListener("mouseout", () => {
	spanListener.innerHTML = 'JPY &nbsp <span id="cost"> 3880 </span>&nbsp tax included';
	console.log("SpanListener: " + spanListener.innerHTML);
});

spanListener.addEventListener("click", ()=>{
	window.open("https://www.amazon.co.jp/%E3%80%90%E5%9B%BD%E5%86%85%E6%AD%A3%E8%A6%8F%E5%93%81%E3%80%91%E3%80%90%E9%9F%B3%E6%A5%BD%E3%83%A9%E3%82%A4%E3%83%96%E7%94%A8-%E3%83%8F%E3%82%A4%E3%83%95%E3%82%A1%E3%82%A4-%E3%82%A4%E3%83%A4%E3%83%BC%E3%83%97%E3%83%A9%E3%82%B0%E3%80%91%E3%83%AB%E3%83%BC%E3%83%97-%E3%80%88%E9%9F%B3%E8%B3%AA%E3%81%AF%E3%82%AF%E3%83%AA%E3%82%A2%E3%81%AA%E3%81%BE%E3%81%BE%E9%9F%B3%E9%87%8F%E3%82%92%E5%9D%87%E7%AD%89%E3%81%AB%E5%AE%89%E5%85%A8%E3%83%AC%E3%83%99%E3%83%AB%E3%81%BE%E3%81%A7%E4%BD%8E%E6%B8%9B%E3%80%89%E3%83%9F%E3%83%A5%E3%83%BC%E3%82%B8%E3%82%B7%E3%83%A3%E3%83%B3-%E3%82%B0%E3%83%AD%E3%83%AA%E3%82%A2%E3%82%B9%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%89/dp/B079TZQX2V/ref=pd_rhf_se_p_img_5?_encoding=UTF8&psc=1&refRID=YTKKA5VHYV44M44HYR8G", "_blank");
});


// Used to navigate to twitter link
const twitterListener  = document.getElementById("twitterIcon");
twitterListener.addEventListener("click", ()=>{
	window.open("https://twitter.com/loopearplugs?lang=en", "_blank");
});

// Used to navigate to facebook link
const facebookListener  = document.getElementById("facebookIcon");
facebookListener.addEventListener("click", ()=>{
	window.open("https://www.facebook.com/loopearplugs/", "_blank");
});

