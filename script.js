/* ==========================================================
   АБСОЛЮТ КЛИНИНГ — script.js
   Бургер-меню, калькулятор стоимости, валидация формы, тост
   ========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Бургер-меню ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      burger.classList.toggle('burger--active');
    });

    // Закрытие меню по клику на ссылку (на мобильных)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 720) {
          nav.classList.remove('nav--open');
          burger.classList.remove('burger--active');
        }
      });
    });
  }

  /* ---------- Калькулятор стоимости (services.html) ---------- */
  const calcForm = document.getElementById('calcForm');
  if (calcForm) {
    const service = document.getElementById('calcService');
    const area = document.getElementById('calcArea');
    const total = document.getElementById('calcTotal');

    const format = function (n) {
      return n.toLocaleString('ru-RU') + ' ₽';
    };

    function updateCalc() {
      const price = Number(service.value) || 0;
      const a = Math.max(10, Number(area.value) || 0);
      total.textContent = format(price * a);
    }

    service.addEventListener('change', updateCalc);
    area.addEventListener('input', updateCalc);
    updateCalc();
  }

  /* ---------- Тост-уведомления ---------- */
  const toastWrap = document.getElementById('toastWrap');

  function showToast(title, text, isError) {
    if (!toastWrap) return;

    toastWrap.innerHTML =
      '<div class="toast' + (isError ? ' toast--error' : '') + '">' +
        '<div class="toast__icon">' + (isError ? '!' : '✓') + '</div>' +
        '<div class="toast__body">' +
          '<div class="toast__title">' + title + '</div>' +
          '<div class="toast__text">' + text + '</div>' +
        '</div>' +
        '<button class="toast__close" type="button" aria-label="Закрыть">×</button>' +
      '</div>';

    toastWrap.classList.add('toast-wrap--open');

    const closeBtn = toastWrap.querySelector('.toast__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        toastWrap.classList.remove('toast-wrap--open');
      });
    }

    setTimeout(function () {
      toastWrap.classList.remove('toast-wrap--open');
    }, 6000);
  }

  /* ---------- Форма заявки (order.html) ---------- */
  const orderForm = document.getElementById('orderForm');

  if (orderForm) {
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = orderForm.querySelector('[name="name"]');
      const phoneInput = orderForm.querySelector('[name="phone"]');

      const name = (nameInput.value || '').trim();
      const phone = (phoneInput.value || '').trim();

      // Простая валидация ФИО
      if (name.length < 2) {
        showToast('Проверьте ФИО', 'Укажите имя (минимум 2 символа).', true);
        nameInput.focus();
        return;
      }

      // Валидация телефона: минимум 10 цифр
      const digits = phone.replace(/\D/g, '');
      if (digits.length < 10) {
        showToast('Проверьте телефон', 'Введите корректный номер (минимум 10 цифр).', true);
        phoneInput.focus();
        return;
      }

      // Успех (демо-режим — без отправки на сервер)
      showToast(
        'Заявка отправлена!',
        'Спасибо, ' + name + '. Менеджер свяжется с вами в течение 15 минут в рабочее время.'
      );

      orderForm.reset();
    });
  }

});