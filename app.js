var custName = document.getElementById("custName");
var email = document.getElementById("custEmail");
var custMorningUses = document.getElementById("custMorningUses");
var custAfternonUses = document.getElementById("custAfternonUses");
var custEveningUses = document.getElementById("custEveningUses");
var tvProvince = document.getElementById("tvProvince");
var checkBox = document.getElementById("checkBox");
var nameSpan = document.getElementById("nameSpan");
var emailSpan = document.getElementById("emailSpan");
var morningSpan = document.getElementById("mrninSpan");
var divSection = document.getElementById("outPutSection");

var nameTag = document.createElement("p");
var emailTag = document.createElement("p");
var morningUsesCostTag = document.createElement("p");
var afternonCostTag = document.createElement("p");
var eveningUsesCostTag = document.createElement("p");
var totalUsesTag = document.createElement("p");
var solarEnergyDiscoutTag = document.createElement("p");
var provinceTag = document.createElement("p");
var subTotalTag = document.createElement("p");
var taxTag = document.createElement("p");
var totalTag = document.createElement("p");
var restartButton = document.createElement("button");

var morningCost;
var afternonCost;
var eveningCost;

var totalUsesOfCharge;
var subTotoalAmount;
var solarEnegryDiscount;
var total;
var taxamount;
var provincialCredit;
var taxInPercentage;
const validate = () => {
  morningCost = 0.0;
  afternonCost = 0.0;
  eveningCost = 0.0;
  subTotoalAmount = 0.0;
  solarEnegryDiscount = 0;
  total = 0.0;
  taxAmount = 0.0;
  provincialCredit = 0.0;
  totalUsesOfCharge = 0.0;
  taxInPercentage = "0%";

  var isValidate = false;
  if (custName.value == "") {
    nameSpan.innerText = "Requried";
  } else if (email.value == "") {
    emailSpan.innerText = "Requried";
  } else if (custMorningUses.value == "") {
    morningSpan.innerText = "Requried";
  } else {
    isValidate = true;
  }
  return isValidate;
};

const calculate = () => {
  const flags = validate();
  if (flags == true) {
    morningCost = parseFloat(custMorningUses.value) * 0.25;
    afternonCost = parseFloat(custAfternonUses.value) * 0.31;
    eveningCost = parseFloat(custEveningUses.value) * 0.4;
    totalUsesOfCharge = morningCost + afternonCost + eveningCost;

    if (checkBox.checked == true) {
      solarEnegryDiscount = 0.2 * totalUsesOfCharge;
    }
    if (tvProvince.value == "Quebec") {
      taxInPercentage = "7%";
      taxamount = totalUsesOfCharge * 0.07;
    } else if (tvProvince.value == "British Columbia") {
      taxamount = 0.15;
      provincialCredit = 50;
      taxInPercentage = "15%";
    }
    subTotoalAmount =
      totalUsesOfCharge - solarEnegryDiscount - provincialCredit;
    taxamount = subTotoalAmount * taxamount;
    total = subTotoalAmount + taxamount;
    divSection.style.display = "";

    nameTag.innerHTML = "Name: " + custName.value;
    emailTag.innerHTML = "Email: " + email.value;
    morningUsesCostTag.innerHTML =
      "Morning consumption: $" + morningCost.toFixed(2);
    afternonCostTag.innerHTML =
      "Afternon consumption: $" + afternonCost.toFixed(2);
    eveningUsesCostTag.innerHTML =
      "Evening consumption: $" + eveningCost.toFixed(2);
    totalUsesTag.innerHTML =
      "Total Usage charges:" + totalUsesOfCharge.toFixed(2);
    solarEnergyDiscoutTag.innerHTML =
      "Solar Energy Discount Amount: $" + solarEnegryDiscount.toFixed(2);
    provinceTag.innerHTML =
      "Provincial Credit: $" + provincialCredit.toFixed(2);

    subTotalTag.innerHTML = "Subtotal $" + subTotoalAmount.toFixed(2);
    taxTag.innerHTML =
      "Tax (" + taxInPercentage + "): $" + taxamount.toFixed(2);
    totalTag.innerHTML = "Total: $" + total.toFixed(2);
    restartButton.innerHTML = "Restart";

    divSection.appendChild(nameTag);
    divSection.appendChild(emailTag);
    divSection.appendChild(morningUsesCostTag);
    divSection.appendChild(afternonCostTag);
    divSection.appendChild(eveningUsesCostTag);
    divSection.appendChild(totalUsesTag);
    divSection.appendChild(solarEnergyDiscoutTag);
    divSection.appendChild(provinceTag);
    divSection.appendChild(subTotalTag);
    divSection.appendChild(taxTag);
    divSection.appendChild(totalTag);
    divSection.appendChild(restartButton);
    restartButton.addEventListener("click", restart);
    document.querySelector("form").style.display = "none";
    document.querySelector("h1").innerHTML = "Customer Bill";
  }
};

const onSelect = () => {
  const selectedProvince = tvProvince.value;
  console.log("Gopal" + selectedProvince);
  if (selectedProvince == "British Columbia") {
    checkBox.checked = true;
  } else {
    checkBox.checked = false;
  }
};
const restart = () => {
  document.querySelector("form").style.display = "flex";
  divSection.style.display = "none";
  custName.value = "";
  email.value = "";
  custMorningUses.value = "";
  custAfternonUses.value = "";
  custEveningUses.value = "";
  checkBox.checked = false;
  tvProvince.value = "Alberta";
  nameTag.value = "";
  emailTag.value = "";
  morningUsesCostTag.value = "";
  afternonCostTag.value = "";
  eveningUsesCostTag.value = "";
  totalUsesTag.value = "";
  //not
  solarEnergyDiscoutTag.value = "";
  provinceTag.value = "";
  subTotalTag.value = "";
  taxTag.value = "";
  totalTag.value = "";
};
document.querySelector("button").addEventListener("click", calculate);
document.querySelector("select").addEventListener("change", onSelect);
