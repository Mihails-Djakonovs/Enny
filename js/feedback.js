"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formDate = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch(sendmail.php, {
                method: 'Post',
                body: formDate
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');

            } else {
                alert('Ошибка');
                form.classList.remove('_sending');
            }
        } else {
            showTooltips();
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }
            else if (input.classList.contains('_phone')) {
                if (phoneTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }

            }
        }
        return error;
    }
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');

        const tooltip = input.nextElementSibling;
        tooltip.classList.add('active');

    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');

        const tooltip = input.nextElementSibling;
        tooltip.classList.remove('active');
    }
    function emailTest(input) {
        if (input.value === '') return false;
        return !/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i.test(input.value);
    }
    function phoneTest(input) {
        if (input.value === '') return false;
        return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value);
    }
    function showTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => {
            const input = tooltip.previousElementSibling;
            if (input.classList.contains('_req') && input.value === '') {
                tooltip.classList.add('active');
            } else if (input.classList.contains('_email') && emailTest(input)) {
                tooltip.classList.add('active');
            } else if (input.classList.contains('_phone') && phoneTest(input)) {
                tooltip.classList.add('active');
            } else {
                tooltip.classList.remove('active');
            }
        });
    }
});