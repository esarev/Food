
import {closeModal, openModal} from './modal';

function forms(modalTimerId) {
  // Forms

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/forms/spinner.svg',
    success: 'Спасибо! Ваша заявка принята',
    error: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    bindpostData(item);
  });

  const postData = async (url, data) => {
  let res = await fetch( url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });

  return await res.json();
};

function bindpostData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let statusMessage = document.createElement('img');
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    form.insertAdjacentElement('afterend', statusMessage);
    
    // const request = new XMLHttpRequest();
    // request.open('POST', 'server.php');
    

    // request.setRequestHeader('Content-type', 'aplication/json; charset=utf-8' );
    const formData = new FormData(form);

    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    

    // request.send(json);
    
    postData('http://localhost:3000/requests', json)
    .then(data => {
      console.log(data);
      showThanksModal(message.success);
      statusMessage.remove();
    }).catch(() => {
      showThanksModal(message.error);
    }).finally (() => {
      form.reset();
    });

    

    // request.addEventListener('load', () => {
    //     if (request.status === 200) {
    //         console.log(request.response);
    //         showThanksModal(message.succes);
    //         statusMessage.remove();
    //         form.reset();                  
    //     } else {
    //         showThanksModal(message.error);
    //     }
    // });
  });
}

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
          <div class="modal__close" data-close>×</div>
          <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;