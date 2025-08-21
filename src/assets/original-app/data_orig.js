var allFuncs = []
var allVids = []
var vidNum = 0
var totalVids = 0
var linkChanges = []
var videoChanges = []
var demoChanges = []
var funcText = ""
var linkText = ""
var demoLinks = ""
var toggleState = 0
var vidSize = 94

function pause_button(){
	if (playValue == 1){
		clearTimeout(myTimeout);
		playValue = 0
		document.getElementById("pauser").src = "content/images/play.png"
	}else{
		vidNum = vidNum - 1;
		my_function()
		document.getElementById("pauser").src = "content/images/pause.png"
		playValue = 1
	}
}
	
function forward_button(){
	clearTimeout(myTimeout);
	my_function()
	document.getElementById("pauser").src = "content/images/pause.png"
	playValue = 1
}
	
function backward_button(){
	clearTimeout(myTimeout);
	if (vidNum == 0){
		vidNum = totalVids
	}
	vidNum = vidNum - 2
	my_function()
	document.getElementById("pauser").src = "content/images/pause.png"
	playValue = 1
}

function table1_click(val, j){
	if (document.getElementById(j).checked){
		linkChanges = linkChanges.filter(v => v !== "yes_" + j);
		linkChanges = linkChanges.filter(v => v !== "no_" + j);
		linkChanges.push("yes_" + j)
	}else{
		linkChanges = linkChanges.filter(v => v !== "yes_" + j);
		linkChanges = linkChanges.filter(v => v !== "no_" + j);
		linkChanges.push("no_" + j)
	}
}

function table2_click(val, j){
	if (document.getElementById(j).checked){
		videoChanges = videoChanges.filter(v => v !== "yes_" + j);
		videoChanges = videoChanges.filter(v => v !== "no_" + j);
		videoChanges.push("yes_" + j)
	}else{
		videoChanges = videoChanges.filter(v => v !== "yes_" + j);
		videoChanges = videoChanges.filter(v => v !== "no_" + j);
		videoChanges.push("no_" + j)
	}
}

function table3_click(val, j){
	if (document.getElementById(j).checked){
		demoChanges = demoChanges.filter(v => v !== "yes_" + j);
		demoChanges = demoChanges.filter(v => v !== "no_" + j);
		demoChanges.push("yes_" + j)
	}else{
		demoChanges = demoChanges.filter(v => v !== "yes_" + j);
		demoChanges = demoChanges.filter(v => v !== "no_" + j);
		demoChanges.push("no_" + j)
	}
}

function settings_button(){
	var modal_text = "<h2>Top Links:</h2>&nbsp;&nbsp;&nbsp;<table style='width:90%' id='linkTable'><tr><th>Title</th><th style='width:50px;'><button class=\"modal__btn2\" onclick=\"toggle0()\" data-micromodal-clear>Toggle</button></th></tr></table><br><h2>Videos:</h2><table style='width:90%' id='videoTable'><tr><th>Title</th><th style='width:50px;'><button class=\"modal__btn2\" onclick=\"toggle1()\" data-micromodal-clear>Toggle</button></th></tr></table><br><h2>Demos:</h2><table style='width:90%' id='demoTable'><tr><th>Title</th><th style='width:50px;'><button class=\"modal__btn2\" onclick=\"toggle2()\" data-micromodal-clear>Toggle</button></th></tr></table><br>"
	document.getElementById("modal_edit").innerHTML = modal_text
	
	var table1 = document.getElementById("linkTable");
	for (var i = 0; i < jsonInfo.demos[0].data.length; i++) {
		var row1 = table1.insertRow(-1)
		var cell1a = row1.insertCell(0)
		var cell1b = row1.insertCell(1)
		cell1a.innerHTML = "<span id='table1b_" + i + "'>" + jsonInfo.demos[0].data[i][0] + "</span>"
		if (jsonInfo.demos[0].data[i][2] == "Yes"){
			cell1b.innerHTML = "<input onclick='table1_click(\"yes\", \"" + jsonInfo.demos[0].data[i][0] + "\")' type='checkbox' class='checks0' id='" + jsonInfo.demos[0].data[i][0] + "' checked>"
		}else{
			cell1b.innerHTML = "<input onclick='table1_click(\"no\", \"" + jsonInfo.demos[0].data[i][0] + "\")' type='checkbox' class='checks0' id='" + jsonInfo.demos[0].data[i][0] + "'>"
		}
	}
	
	
	var table2 = document.getElementById("videoTable");
		for (var i = 0; i < jsonInfo.demos[1].data.length; i++) {
			var row1 = table2.insertRow(-1)
			var cell1a = row1.insertCell(0)
			var cell1b = row1.insertCell(1)
			cell1a.innerHTML = "<span id='table2b_" + i + "'>" + jsonInfo.demos[1].data[i][0] + "</span>"
			if (jsonInfo.demos[1].data[i][3] == "Yes"){
				cell1b.innerHTML = "<input onclick='table2_click(\"yes\", \"" + jsonInfo.demos[1].data[i][0] + "\")' type='checkbox' class='checks1' id='" + jsonInfo.demos[1].data[i][0] + "' checked>"
			}else{
				cell1b.innerHTML = "<input onclick='table2_click(\"no\", \"" + jsonInfo.demos[1].data[i][0] + "\")' type='checkbox' class='checks1' id='" + jsonInfo.demos[1].data[i][0] + "'>"
			}
		}
		
	
	var table3 = document.getElementById("demoTable");
		for (var i = 0; i < jsonInfo.demos[2].data.length; i++) {
			var row1 = table3.insertRow(-1)
			var cell1a = row1.insertCell(0)
			var cell1b = row1.insertCell(1)
			cell1a.innerHTML = "<span id='table3b_" + i + "'>" + jsonInfo.demos[2].data[i][0].replace("<br>", "") + "</span>"
			if (jsonInfo.demos[2].data[i][3] == "Yes"){
				cell1b.innerHTML = "<input onclick='table3_click(\"yes\", \"" + jsonInfo.demos[2].data[i][0] + "\")' type='checkbox' class='checks2' id='" + jsonInfo.demos[2].data[i][0] + "' checked>"
			}else{
				cell1b.innerHTML = "<input onclick='table3_click(\"no\", \"" + jsonInfo.demos[2].data[i][0] + "\")' type='checkbox' class='checks2' id='" + jsonInfo.demos[2].data[i][0] + "'>"
			}
		}
	
	linkChanges = []
	MicroModal.show('modal-1');
}

function save_changes(){
	MicroModal.close('modal-1');
	
	//top links
	
	var newNOs = []
	var newYESs = []
	for (var i = 0; i < linkChanges.length; i++){
		if (linkChanges[i].includes("yes_")){
			newYESs.push(linkChanges[i].replace("yes_", ""))
		}else{
			newNOs.push(linkChanges[i].replace("no_", ""))
		}
	}
	

	for (var j = 0; j < newNOs.length; j++){
		for (var i = 0; i < jsonInfo.demos[0].data.length; i++){
			if (jsonInfo.demos[0].data[i][0] == newNOs[j]){
				jsonInfo.demos[0].data[i][2] = "No"
			}
		}
	}
	for (var j = 0; j < newYESs.length; j++){
		for (var i = 0; i < jsonInfo.demos[0].data.length; i++){
			if (jsonInfo.demos[0].data[i][0] == newYESs[j]){
				jsonInfo.demos[0].data[i][2] = "Yes"
			}
		}
	}
	
	
	
	//videos
	
	newNOs = []
	newYESs = []
	for (var i = 0; i < videoChanges.length; i++){
		if (videoChanges[i].includes("yes_")){
			newYESs.push(videoChanges[i].replace("yes_", ""))
		}else{
			newNOs.push(videoChanges[i].replace("no_", ""))
		}
	}
	
	for (var j = 0; j < newNOs.length; j++){
		for (var i = 0; i < jsonInfo.demos[1].data.length; i++){
			if (jsonInfo.demos[1].data[i][0] == newNOs[j]){
				jsonInfo.demos[1].data[i][3] = "No"
			}
		}
	}
	for (var j = 0; j < newYESs.length; j++){
		for (var i = 0; i < jsonInfo.demos[1].data.length; i++){
			if (jsonInfo.demos[1].data[i][0] == newYESs[j]){
				jsonInfo.demos[1].data[i][3] = "Yes"
			}
		}
	}
	
	//demos
	
	newNOs = []
	newYESs = []
	for (var i = 0; i < demoChanges.length; i++){
		if (demoChanges[i].includes("yes_")){
			newYESs.push(demoChanges[i].replace("yes_", ""))
		}else{
			newNOs.push(demoChanges[i].replace("no_", ""))
		}
	}
	
	for (var j = 0; j < newNOs.length; j++){
		for (var i = 0; i < jsonInfo.demos[2].data.length; i++){
			if (jsonInfo.demos[2].data[i][0] == newNOs[j]){
				jsonInfo.demos[2].data[i][3] = "No"
			}
		}
	}
	for (var j = 0; j < newYESs.length; j++){
		for (var i = 0; i < jsonInfo.demos[2].data.length; i++){
			if (jsonInfo.demos[2].data[i][0] == newYESs[j]){
				jsonInfo.demos[2].data[i][3] = "Yes"
			}
		}
	}
	
	//reload everything
	clearTimeout(myTimeout);
	loader()
	
	
}

function toggle0(){
	var checks = document.querySelectorAll(".checks0");
	if (toggleState == 0){
		for (var i = 0; i < checks.length; i++) {
			checks[i].checked = false;
		}
		for (var i = 0; i < jsonInfo.demos[1].data.length; i++){
			jsonInfo.demos[0].data[i][2] = "No"
		}
		toggleState = 1
	}else{
		for (var i = 0; i < checks.length; i++) {
			checks[i].checked = true;
		}
		for (var i = 0; i < jsonInfo.demos[1].data.length; i++){
			jsonInfo.demos[0].data[i][2] = "Yes"
		}
		toggleState = 0
	}
}

function toggle1(){
	var checks = document.querySelectorAll(".checks1");
	if (toggleState == 0){
		for (var i = 0; i < checks.length; i++) {
			checks[i].checked = false;
		}
		for (var i = 0; i < jsonInfo.demos[1].data.length; i++){
			jsonInfo.demos[1].data[i][3] = "No"
		}
		toggleState = 1
	}else{
		for (var i = 0; i < checks.length; i++) {
			checks[i].checked = true;
		}
		for (var i = 0; i < jsonInfo.demos[1].data.length; i++){
			jsonInfo.demos[1].data[i][3] = "Yes"
		}
		toggleState = 0
	}
}

function toggle2(){
	var checks = document.querySelectorAll(".checks2");
	if (toggleState == 0){
		for (var i = 0; i < checks.length; i++) {
			checks[i].checked = false;
		}
		for (var i = 0; i < jsonInfo.demos[2].data.length; i++){
			jsonInfo.demos[2].data[i][3] = "No"
		}
		toggleState = 1
	}else{
		for (var i = 0; i < checks.length; i++) {
			checks[i].checked = true;
		}
		for (var i = 0; i < jsonInfo.demos[2].data.length; i++){
			jsonInfo.demos[2].data[i][3] = "Yes"
		}
		toggleState = 0
	}
}
	
function loader(){
	
	vidSize = jsonInfo.settings[0].video_size_percentage
	
	linkText = ""
	for (var i = 0; i < jsonInfo.demos[0].data.length; i++) {
		if (jsonInfo.demos[0].data[i][2] == "Yes"){
			//console.log(jsonInfo.demos[0].data[i][0])
			linkText = linkText + '<a href="' + jsonInfo.demos[0].data[i][1] + '" target="_blank">' + jsonInfo.demos[0].data[i][0] + '</a>'
		}else{
			
		}
	}
	document.getElementById("toplinks").innerHTML = linkText

	var vidCount = 0
	allVids = []
	for (var i = 0; i < jsonInfo.demos[1].data.length; i++) {
		if (jsonInfo.demos[1].data[i][3] == "Yes"){
			totalVids = totalVids + 1
			allVids.push([jsonInfo.demos[1].data[i][0], jsonInfo.demos[1].data[i][1], jsonInfo.demos[1].data[i][2]])
		}
	}

	funcText = ""
	for (var i = 0; i < allVids.length; i++) {
		if (i == 0){
			funcText = funcText + "if (vidNum == " + i + "){document.getElementById(\"vidID\").innerHTML  = '<video controls width=\"" + vidSize + "%\" autoplay loop muted><source id=\"vidSource\" src=\"" + allVids[i][1] + "\" type=\"video/mp4\"></video>';  document.getElementById(\"spanlarge\").innerHTML = \"" + allVids[i][0] + "\";currentVid = 1;myTimeout = setTimeout(function () {my_function()}, " + allVids[i][2] + "000); vidNum = vidNum + 1;}"
		}else if (i < (allVids.length - 1)){
			funcText = funcText + "else if(vidNum == " + i + "){document.getElementById(\"vidID\").innerHTML  = '<video controls width=\"" + vidSize + "%\" autoplay loop muted><source id=\"vidSource\" src=\"" + allVids[i][1] + "\" type=\"video/mp4\"></video>';  document.getElementById(\"spanlarge\").innerHTML = \"" + allVids[i][0] + "\";currentVid = 1;myTimeout = setTimeout(function () {my_function()}, " + allVids[i][2] + "000); vidNum = vidNum + 1;}"
		}else{
			funcText = funcText + "else {document.getElementById(\"vidID\").innerHTML  = '<video controls width=\"" + vidSize + "%\" autoplay loop muted><source id=\"vidSource\" src=\"" + allVids[i][1] + "\" type=\"video/mp4\"></video>';  document.getElementById(\"spanlarge\").innerHTML = \"" + allVids[i][0] + "\";currentVid = 1;myTimeout = setTimeout(function () {my_function()}, " + allVids[i][2] + "000); vidNum = 0;}"
		}
		
	}
	
	window['my_function'] = function(){
		allFuncs[0] = new Function(funcText)
		allFuncs[0]()
	}

	demoLinks = "<center>"
	for (var i = 0; i < jsonInfo.demos[2].data.length; i++) {
		if (jsonInfo.demos[2].data[i][3] == "Yes"){
			demoLinks = demoLinks + "<h4>" + jsonInfo.demos[2].data[i][0] + "</h4><img onclick=\"openFunc('" + jsonInfo.demos[2].data[i][1] + "')\" src=\"" + jsonInfo.demos[2].data[i][2] + "\" style=\"width:" + vidSize + "%; border: solid black 2px; cursor: pointer;\">"
		}
	}
	document.getElementById("column1").innerHTML = demoLinks + "</center>"
	
	my_function()
	
 }