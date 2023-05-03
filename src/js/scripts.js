'use strict';

// Registration range
const range = document.querySelector('.registration__form-range__slider');
const pointer = document.querySelector('.registration__form-range__pointer');

pointer.innerHTML = range.value;

const setBagePosition = (curentRange, curentPointer) => {
  const radius = curentRange.scrollHeight;
  const dxPixels = radius / 2 + (curentRange.valueAsNumber - parseInt(curentRange.min)) * (curentRange.scrollWidth - radius) / (parseInt(curentRange.max) - parseInt(curentRange.min));

  curentPointer.style.left = dxPixels - (curentPointer.offsetWidth / 2) + 'px';
};

setBagePosition(range, pointer);

range.oninput = () => {
  pointer.innerHTML = range.value + 'm';
  setBagePosition(range, pointer);
};

const changeRange = () => {
  let x = range.value;
  let color = 'linear-gradient(90deg, rgb(130,130,130)' + x / 10 + '%, rgb(214,214,214)' + x / 10 + '%)';
  range.style.background = color;
};

range.addEventListener('mousemove', changeRange);
range.addEventListener('touchmove', changeRange);
range.addEventListener('touchend', changeRange);

// Registration validation
const form = document.querySelector('.registration__form');
const inputs = form.querySelectorAll('.registration__form-input');

const generateError = (text) => {
  const error = document.createElement('div');

  error.className = 'error';
  error.innerHTML = text;
  return error;
};

const removeValidation = () => {
  const errors = form.querySelectorAll('.error');

  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
};

const checkInputsPresence = () => {
  let formValid = true;

  for (let i = 0; i < inputs.length; i++) {
    const isValid = inputs[i].value.match('^[a-zA-Z]');

    if (!inputs[i].value.length) {
      const error = generateError('Field cant be blank');
      form[i].parentElement.insertBefore(error, inputs[i]);
      formValid = false;
    } else if (!isValid) {
      const error = generateError('Field is not valid');
      form[i].parentElement.insertBefore(error, inputs[i]);
      formValid = false;
    }
  }

  return formValid;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  removeValidation();

  if (checkInputsPresence()) {
    changePage('profiles');
  }
});


const changePage = (name) => {
  document.querySelector('body').className = name;
};

const doRemove = (id) => {
  userRemove(id);
  changePage('profiles');
  hideModal();
};

const showModal = (id) => {
  document.querySelector('body').classList.add('show-modal');
  document.querySelector('.modal__block-button').addEventListener('click', () => doRemove(id), false);
};

const hideModal = () => {
  document.querySelector('body').classList.remove('show-modal');

  const btnBlock = document.querySelector('.modal__block-button');
  btnBlock.replaceWith(btnBlock.cloneNode(true));
};

const users = [
  {
    id: '001',
    name: 'Girl1',
    photo: ['girl1.jpg', 'girl1.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '002',
    name: 'Girl2',
    photo: ['girl2.jpg', 'girl2.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '003',
    name: 'Girl3',
    photo: ['girl3.jpg', 'girl3.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '004',
    name: 'Girl4',
    photo: ['girl4.jpg', 'girl4.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '005',
    name: 'Girl5',
    photo: ['girl5.jpg', 'girl5.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '006',
    name: 'Girl6',
    photo: ['girl6.jpg', 'girl6.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '007',
    name: 'Girl7',
    photo: ['girl7.jpg', 'girl7.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '008',
    name: 'Girl8',
    photo: ['girl8.jpg', 'girl8.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '009',
    name: 'Girl9',
    photo: ['girl9.jpg', 'girl9.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
  {
    id: '010',
    name: 'Girl10',
    photo: ['girl10.jpg', 'girl10.jpg'],
    from: [
      'hi'
    ],
    to: [],
  },
];

const profileContainer = document.querySelector('.all-profiles');

const userRemove = (id) => {
  const currentUsers = JSON.parse(sessionStorage.getItem('users'));
  const newUsers = currentUsers.filter(item => +item.id !== +id);

  sessionStorage.setItem('users', JSON.stringify(newUsers));

  createSearch(newUsers);
};

const userAdd = (user) => {
  profileContainer.innerHTML +=
  `<div class="all-profile" id="${user.id}">
    <img class="all-profile__photo" src="../../img/profile-photo/${user.photo[0]}" alt="photo" onclick="openProfile('${user.id}')"/>
    <div class="all-profile__button__wrapper">
      <button class="button button-border all-profile__button" onclick="showModal('${user.id}')">
        <img class="all-profile__button-icon" src="../../img/block.svg" alt="block-icon"/>
        Block
      </button>
      <button class="button button-pink all-profile__button" onclick="openChat('${user.id}')">
        <img class="all-profile__button-icon" src="../../img/chat.svg" alt="chat-icon "/>
        Chat
      </button>
    </div>
  </div>`;
};

const openProfile = (id) => {
  changePage('profile');

  const currentUsers = JSON.parse(sessionStorage.getItem('users'));
  const profile = currentUsers.filter(item => +item.id === +id);


  document.querySelector('.profile__card').innerHTML =
  `<div class="profile__slider">
      ${profile[0].photo.map(photo => (
    `<img class="profile__photo" src="../../img/profile-photo/${photo}" alt="photo"/>`
  )).join('')}
    </div>
    <button class="button button-pink profile__chat-button" onclick="openChat('${id}')">
      <img class="profile__chat-button__icon" src="../../img/chat.svg" alt="chat-icon "/>
    </button>
    <button class="button button-border profile__block-button" onclick="showModal('${id}')">
      Block the user
    </button>`;

  tns({
    'container': '.profile__slider',
    'center': true,
    'autoplay': false,
    'items': 1,
    'touch': false,
  });
};

// Chat
const sendMessage = (id) => {
  const currentUsers = JSON.parse(sessionStorage.getItem('users'));
  const profile = currentUsers.findIndex(item => +item.id === +id);

  const input = document.querySelector('.message__input-text');
  const msg = input.value;
  input.value = '';
  writeLine(msg);

  currentUsers[profile].to = [
    ...currentUsers[profile].to,
    msg
  ];

  sessionStorage.setItem('users', JSON.stringify(currentUsers));
};

const writeLine = (text) => {
  const messages = document.querySelector('.message__list');
  const message = document.createElement('li');
  message.classList.add('message__item');
  message.innerHTML = text;
  messages.appendChild(message);
};

const openChat = (id) => {
  changePage('chat');

  const currentUsers = JSON.parse(sessionStorage.getItem('users'));
  const profile = currentUsers.filter(item => +item.id === +id);

  const hasMessages = profile[0].to.length > 0;

  document.querySelector('.chat__wrapper').innerHTML =
  `<div class="chat__header">
    <div class="chat__profile">
      <div class="chat__profile-photo">
        <img src="../../img/profile-photo/${profile[0].photo[0]}" alt="girl-photo"/>
      </div>
      <span class="chat__profile-name">
        ${profile[0].name}
      </span>
    </div>
    <button class="chat__btn" type="button" onclick="showModal('${id}')">Block</button>
  </div>
  <div class="messages">
    <ul class="message__list">
      <li class="message__item-primary ${hasMessages ? 'show' : ''}">
        <img src="../../img/profile-photo/${profile[0].photo[0]}" alt="girl-photo"/>
        <span>
          Hi sweety! I'm boring...
        </span>
      </li>

      ${profile[0].to.map(msg => (
    `<li class="message__item">
          ${msg}
        </li>`
  )).join('')}
    </ul>
  </div>
  <div class="message__input">
    <input class="message__input-text" type="text" placeholder="Enter your message" />
    <button class="button button-pink message__input-btn" type="button" onclick="sendMessage('${id}')">
      <img class="message__input-btn__icon" src="../../img/send-message.svg" alt="send-message"/>
    </button>
  </div>`;

  if (!hasMessages) {
    setTimeout(() => {
      document.querySelector('.message__item-primary').classList.add('show');
    }, 2000);
  }
};

const createSearch = (usersList) => {
  profileContainer.innerHTML = '';

  usersList.map(item => userAdd(item));
};


document.addEventListener('DOMContentLoaded', function () {
  let existUsers = JSON.parse(sessionStorage.getItem('users'));

  if (existUsers === null) {
    sessionStorage.setItem('users', JSON.stringify(users));

    existUsers = users;
  }

  createSearch(existUsers);
});
