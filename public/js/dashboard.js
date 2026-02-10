const buttons = document.querySelectorAll('.option');
  const slider = document.querySelector('.slider');

  const count = buttons.length;

  // ширина ползунка = 100% / количество кнопок
  slider.style.width = `calc(${100 / count}% - 4px)`;

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      slider.style.transform = `translateX(${index * 100}%)`;
    });
  });

document.getElementById("dashboard-name").disabled = true;

document.getElementById("dashboard-email").disabled = true;

const section = document.querySelector('.section');
const header = document.querySelector('.section-header');

  header.addEventListener('click', () => {
    section.classList.toggle('open');
  });


const box = document.getElementById('box');
const box1 = document.getElementById('box1');
const btn = document.getElementById('toggle');
const btn1 = document.getElementById('toggle1');
const cancel = document.getElementById('cancel');
const infoblock = document.getElementById('info-form');
const infoblock1 = document.getElementById('info-form1');
const cancel1 = document.getElementById('cancel1'); 



  btn.addEventListener('click', () => {
    // btn.classList.toogle('hidden');
    box.classList.toggle('hidden');
    infoblock.classList.toggle('hidden'); 
    btn.classList.toggle('hidden');
    document.getElementById("dashboard-name").disabled = false;
  });

  btn1.addEventListener('click', () => {
    // btn.classList.toogle('hidden');
    document.getElementById("dashboard-email").disabled = false;
    box1.classList.toggle('hidden');
    infoblock1.classList.toggle('hidden'); 
    btn1.classList.toggle('hidden');
  });

  cancel.addEventListener('click', () => {
    box.classList.remove('hidden');
    infoblock.classList.remove('hidden');
    btn.classList.remove('hidden')
    document.getElementById("dashboard-name").disabled = true;
  })

  cancel1.addEventListener('click', () => {
    box1.classList.remove('hidden');
    infoblock1.classList.remove('hidden');
    btn1.classList.remove('hidden')
    document.getElementById("dashboard-email").disabled = true;
  })

const backbtn = document.getElementById('backbtn')

backbtn.addEventListener('click', () => {
        console.log('CLICKED');
        window.location.href = '/';
    })

const logoutBtn = document.getElementById('logout-btn')

logoutBtn.onclick = async () => {
    const res = await fetch('/logout', { method: 'POST' })

    if (res.ok) {
        window.location.reload()
    } else {
        alert('Logout failed')
    }
    }
//   btn.document.getElementById('click', () => {
//     btn.classList.remove('hidden')
//   })

