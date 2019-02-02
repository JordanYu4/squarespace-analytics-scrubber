// Written referencing https://stackoverflow.com/a/18849208

const tableBody = document.getElementsByClassName("Table-tableBody-3AHXZ")[0];
const tableRows = tableBody.getElementsByClassName("Table-tableRow-3bY57");
const colLabels = ["Search Keyword", "Clicks", "Impressions", "Click Rate", "Avg. Position"];

// Create compile CSV string
// Simplify closer to: rows.map(e => e.join(",")).join("\n") ?

const compileCsvArr = (htmlRows, colLabels, accArr = []) => {
	for (var i = 0; i < htmlRows.length; i++) {
		let rowText = htmlRows[i].innerText.split("\n");
		// Combine second and third values (both belong to "clicks" col)
		rowText[1] = rowText[1] + rowText[2];
		rowText.splice(2, 1);
		// Clean commas that may throw off CSV 
		rowText = rowText.map(str => str.replace(",", ""));
		accArr.push(rowText.join(","));
	}
	accArr.unshift(colLabels.join(","));
	return accArr.join("\n");
};

const csvString = compileCsvArr(tableRows, colLabels);
const csvContent = "data:text/csv;charset=utf-8," + csvString;

// Encode CSV content 

var encodedUri = encodeURI(csvContent);
// window.open(encodedUri);

// Give file specific name 

var fileName = "scrubbed.csv"
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", fileName);

// Download file 

document.body.appendChild(link);
link.click();
