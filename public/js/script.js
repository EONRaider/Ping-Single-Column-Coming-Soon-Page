/* eslint-disable no-undef */

function Email(address) {
  this.address = address;
}

Email.prototype.validate = function validate() {
  return String(this.address)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

function EmailSubmission({ input, submit, error }) {
  this.input = input;
  this.submit = submit;
  this.error = error;
}

EmailSubmission.prototype = {
  get emailAddress() {
    return document.querySelector(this.input).value;
  },
};

EmailSubmission.prototype.hideErrorMessage = function hideErrorMessage() {
  document.querySelector(this.error).classList.remove('error');
};

EmailSubmission.prototype.showErrorMessage = function showErrorMessage() {
  document.querySelector(this.error).classList.add('error');
};

EmailSubmission.prototype.setErrorDisplay = function setErrorDisplay() {
  const email = new Email(this.emailAddress);
  return email.validate() ? this.hideErrorMessage() : this.showErrorMessage();
};

EmailSubmission.prototype.registerEvents = function registerEvents() {
  document.querySelector(this.submit).addEventListener('click', () => this.setErrorDisplay());
  document.querySelector(this.input).addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      this.setErrorDisplay();
    }
  });
};

EmailSubmission.prototype.startField = function startField() {
  this.registerEvents();
};

const email = new EmailSubmission({
  input: '.sign-up input',
  submit: '.sign-up button',
  error: '.sign-up .error-message',
});

email.startField();
