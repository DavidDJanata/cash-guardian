// user input data
const nameInput = document.getElementById('modal-name');
const salaryInput = document.getElementById('modal-salary');
const foodDrinkInput = document.getElementById('food-and-drink');
const housingInput = document.getElementById('housing');
const insuranceInput = document.getElementById('insurance');
const loanPaymentInput = document.getElementById('loan-payments');
const transportationInput = document.getElementById('transportation');
const utilitiesInput = document.getElementById('utilities');
const entertainmentInput = document.getElementById('entertainment');
const otherInput = document.getElementById('other');
const submitExpenses = document.getElementById('submit-form');
const submitModal = document.getElementById('submit-modal');

// MODAL

//launch modal on first visit to page only

if (localStorage.getItem("visited") == null) {
  localStorage.setItem("visited", "true");
  let myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
  });
  myModal.show();
}

// store user's name and salary

submitModal.addEventListener('click', function (event) {
  event.preventDefault();
  let myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false
  });
  myModal.hide();
  window.location.href = 'index.html';

  const userData = {
    name: nameInput.value,
    salary: salaryInput.value,
  };
  localStorage.setItem('userData', JSON.stringify(userData));
})

//FORM & LOCAL STORAGE
// update and store expenses to local storage

document.getElementById('submit-form').addEventListener('click', function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Get the current expenses from local storage
  let currentExpenses = JSON.parse(localStorage.getItem('currentExpenses')) || {
    entertainment: 0,
    foodDrink: 0,
    housing: 0,
    insurance: 0,
    loanPayment: 0,
    transportation: 0,
    utilities: 0,
    other: 0,
  };

  // Update the current expenses with the user's input
  currentExpenses.entertainment += parseFloat(entertainmentInput.value) || 0;
  currentExpenses.foodDrink += parseFloat(foodDrinkInput.value) || 0;
  currentExpenses.housing += parseFloat(housingInput.value) || 0;
  currentExpenses.insurance += parseFloat(insuranceInput.value) || 0;
  currentExpenses.loanPayment += parseFloat(loanPaymentInput.value) || 0;
  currentExpenses.transportation += parseFloat(transportationInput.value) || 0;
  currentExpenses.utilities += parseFloat(utilitiesInput.value) || 0;
  currentExpenses.other += parseFloat(otherInput.value) || 0;

  // Save the updated expenses to local storage
  localStorage.setItem('currentExpenses', JSON.stringify(currentExpenses));

  window.alert('Your expenses have been saved!');

//reload page so tables update dynamically with every expense submission
window.location.reload();
}
);

// Dynamic Table Creation
const expenses = JSON.parse(localStorage.getItem('currentExpenses'));

if (!expenses) {
  console.log('No expenses stored.');
} else {
  const table = document.createElement('table');

  const headerRow = document.createElement('tr');
  const categoryHeader = document.createElement('th');
  categoryHeader.textContent = 'Category';
  const amountHeader = document.createElement('th');
  amountHeader.textContent = 'Amount';
  headerRow.appendChild(categoryHeader);
  headerRow.appendChild(amountHeader);
  table.appendChild(headerRow);

  for (const [category, amount] of Object.entries(expenses)) {
    const row = document.createElement('tr');
    const categoryCell = document.createElement('td');
    categoryCell.textContent = getCategoryLabel(category);
    const amountCell = document.createElement('td');
    amountCell.textContent = amount;
    row.appendChild(categoryCell);
    row.appendChild(amountCell);
    table.appendChild(row);

    function getCategoryLabel(category) {
      switch (category) {
        case 'entertainment':
          return 'Entertainment';
        case 'foodDrink':
          return 'Food and Drink';
        case 'housing':
          return 'Housing';
        case 'insurance':
          return 'Insurance';
        case 'loanPayment':
          return 'Loan Payments';
        case 'transportation':
          return 'Transportation';
        case 'utilities':
          return 'Utilities';
        case 'other':
          return 'Other';
        default:
          return category;
      }
    }
  }

  document.getElementById('expensesTableContainer').appendChild(table);
  table.style.textAlign = 'center';
}

//pie chart update with local storage

const labels = ["Entertainment", "Food and Drink", "Housing", "Insurance", "Loan Payments", "Other", "Transportation", "Utilities"];; // Category names

const data = Object.values(expenses); // Corresponding amounts

const ctx = document.getElementById('myChart').getContext('2d');
const myPieChart =


new Chart(ctx, {
  type: 'pie',
  data: {
    labels: labels,
    datasets: [{
      label: 'Expenses By Category',
      data: data,
      backgroundColor: [
      'rgba(194, 249, 112, 0.7)',
      'rgba(147, 250, 165, 0.7)',
      'rgba(104, 195, 163, 0.7)',
      'rgba(13, 180, 185, 0.7)',
      'rgba(144, 198, 149, 0.7)',
      'rgba(0, 230, 64, 0.7)',
      'rgba(123, 239, 178, 0.7)',
      'rgba(1, 152, 117, 0.7)'

      ],
      borderColor: [
        'rgba(30, 130, 76, 1)',
  
      ],
      borderWidth: 1,
    }]
  },
  options: {
    plugins: {
    title: {
      display: true,
      text: 'EXPENSES BY CATEGORY',
      font: {
        size: 30,
        color: 'black',
      }
    },
    responsive: true,
      legend: {
        position: 'right'
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

}

);

//progress bar update with local storage

const totalExpenses = data.reduce((total, amount) => total + amount, 0);
const salary = JSON.parse(localStorage.getItem('userData')).salary;
const progress = (totalExpenses / salary) * 100;

document.getElementById('progress-bar').style.width = `${progress}%`;
document.getElementById('progress-bar').textContent = `${progress.toFixed(2)}%`;

//line graph update with local storage

const ctx1 = document.getElementById('myChart1');
const myLineChart =

new Chart(ctx1, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Money Spent ($)',
      data: data,
      borderWidth: 1
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'SPENDING TRENDS',
        font: {
          size: 30,
          color: 'black',
        }
      },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
}
});


// Displaying Expense Inputs in Form
function displayEntertainment() {
  var checkBox = document.getElementById("entertainment-check");
  var text = document.getElementById("entertainment");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function displayFoodDrink() {
  var checkBox = document.getElementById("food-and-drink-check");
  var text = document.getElementById("food-and-drink");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function displayHousing() {
  var checkBox = document.getElementById("housing-check");
  var text = document.getElementById("housing");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function displayInsurance() {
  var checkBox = document.getElementById("insurance-check");
  var text = document.getElementById("insurance");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function displayLoanPayments() {
  var checkBox = document.getElementById("loan-payments-check");
  var text = document.getElementById("loan-payments");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function displayTransportation() {
  var checkBox = document.getElementById("transportation-check");
  var text = document.getElementById("transportation");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function displayUtilities() {
  var checkBox = document.getElementById("utilities-check");
  var text = document.getElementById("utilities");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

function displayOther() {
  var checkBox = document.getElementById("other-check");
  var text = document.getElementById("other");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}