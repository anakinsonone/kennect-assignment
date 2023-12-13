function findPrimes(firstNumber, secondNumber) {
	const arrayOfPrimes = [];
	for (let i = firstNumber; i <= secondNumber; i++) {
		const startTime = performance.now();
		const isCurrentPrime = isPrime(i);
		const endTime = performance.now();
		const totalTime = endTime - startTime;
		if (isCurrentPrime) {
			arrayOfPrimes.push({ number: i, type: "Prime", totalTime });
		} else {
			arrayOfPrimes.push({ number: i, type: "Normal", totalTime });
		}
	}
	return arrayOfPrimes;
}

function isPrime(number) {
	for (let i = 2; i * i <= number; i++) {
		if (number % i === 0) return false;
	}
	return true;
}

function createTable(rows, columns, headers, data) {
	const table = document.createElement("table");

	const thead = table.createTHead();
	const headerRow = thead.insertRow(0);
	for (let k = 0; k < columns; k++) {
		const headerCell = document.createElement("th");
		headerCell.innerHTML = headers[k];
		headerRow.appendChild(headerCell);
	}

	for (let i = 0; i < rows; i++) {
		const row = table.insertRow(i + 1);
		const currentRowValues = Object.values(data[i]);
		for (let j = 0; j < columns; j++) {
			const cell = row.insertCell(j);
			cell.innerHTML = currentRowValues[j];
		}
	}
	return table;
}

function renderTables() {
	const firstNumber = document.getElementById("first-number").value;
	const secondNumber = document.getElementById("second-number").value;
	const headersForTable1 = ["Number", "Result", "Time in ms"];
	const headersForTable2 = ["Number", "Time in ms"];

	const startTime = performance.now();
	const tableRows = findPrimes(firstNumber, secondNumber);
	const endTime = performance.now();
	const timeToExecute = endTime - startTime;

	const primeRows = tableRows
		.filter((obj) => obj.type === "Prime")
		.map((obj) => {
			const { number, totalTime } = obj;
			return { number, totalTime };
		});
	const result = `<p>Found ${primeRows.length} prime numbers between ${firstNumber} and ${secondNumber} in ${timeToExecute} ms. Click on details to know more.`;

	const table1 = createTable(tableRows.length, 3, headersForTable1, tableRows);
	const table2 = createTable(primeRows.length, 2, headersForTable2, primeRows);
	// Create tab content
	var tabContent = document.createElement("div");
	tabContent.className = "tab-content";

	// Create tab 1
	var tab1 = document.createElement("div");
	tab1.className = "tab-pane fade show active";
	tab1.id = "tab1";
	tab1.appendChild(table1);

	// Create tab 2
	var tab2 = document.createElement("div");
	tab2.className = "tab-pane fade";
	tab2.id = "tab2";
	tab2.appendChild(table2);

	tabContent.appendChild(tab1);
	tabContent.appendChild(tab2);

	// Create tab controls
	var tabControls = document.createElement("ul");
	tabControls.className = "nav nav-tabs";
	tabControls.innerHTML = `
  <li class="nav-item">
    <a class="nav-link active" id="tab1-tab" data-toggle="tab" href="#tab1">Table 1</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2">Table 2</a>
  </li>
  `;

	// Update modal content with tabs and tables
	document.getElementById("modal-body").innerHTML =
		tabControls.outerHTML + tabContent.outerHTML;
	document.getElementById("result-paragraph").innerHTML = result;
}

function showTablesModal() {
	$("#myModal").modal("show");
}
