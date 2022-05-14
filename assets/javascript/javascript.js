const containerPeople = document.querySelector("#number-people-container");
const buttonContainer = document.querySelector(".tip-btn-container");
const buttons = document.querySelectorAll(".tip-btn-container .tip-input");
const moneyInput = document.querySelector("#money");
const peopleInput = document.querySelector("#number-people");
const customInput = document.querySelector("#btn-custom");
const tipAmount = document.querySelector('.tip-amount');
const total = document.querySelector('.total');
const resetButton = document.querySelector('#reset-btn');



//////////////////////////////////////////////
// FUNÇÕES
const toggleCantZero = function () {
  if (parseInt(peopleInput.value) === 0) {
    containerPeople.classList.add("cant-be-zero");
  } else {
    containerPeople.classList.remove("cant-be-zero");
  }
}


const calculateTip = function() {
  const [tip] = Array.from(buttons).filter(btn => btn.classList.contains('button-active'))
  if(!(!+peopleInput.value || !moneyInput.value || !tip)) {
    const tipPerson = Number((moneyInput.value * (tip.dataset.tip / 100) / peopleInput.value).toFixed(2));
    const totalPerson = ((moneyInput.value / peopleInput.value) + tipPerson).toFixed(2);

    tipAmount.textContent = `$${tipPerson}`;
    total.textContent = `$${totalPerson}`;
    resetButton.classList.add('reset-active')

  }
  toggleCantZero();
}
//////////////////////////////////////////////
// EVENTOS
buttonContainer.addEventListener('click', function(e) {
  if(e.target === buttonContainer) return;

  buttons.forEach(btn => btn.classList.remove('button-active'));
  e.target.classList.add('button-active');

  if(e.target === customInput && !customInput.value) return;
  calculateTip();

})

resetButton.addEventListener('click', function(e){
      if(e.target.classList.contains('reset-active')) {
        e.target.classList.remove('reset-active');
        moneyInput.value = '';
        peopleInput.value = ''; 
        buttons.forEach(btn => btn.classList.remove('button-active'));
        customInput.value = '';
        total.textContent = "$0.00";
        tipAmount.textContent = "$0.00";
        containerPeople.classList.remove("cant-be-zero");
      }
})

customInput.addEventListener('keyup', function(e){
  e.target.dataset.tip = e.target.value; 
  calculateTip();
});

moneyInput.addEventListener('keyup', calculateTip);
peopleInput.addEventListener('keyup', calculateTip);




