
document.getElementById("signinbtn").addEventListener("click", async () =>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;


    if (!email || !password || !name) {
        alert("Please Enter login/password");
        return;
    }

    const res = await fetch("/register", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password, name})
    });

    const text = await res.text();
    alert(text);
})


// const form = document.getElementById('registerForm');



// let isSubmitting = false;

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   if (isSubmitting) return;
//   isSubmitting = true;

//   const btn = form.querySelector('button');
//   btn.disabled = true;

//   try {
//     const res = await fetch('/register', {
//       method: 'POST',
//       body: new FormData(form),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       alert(data.message);
//       return;
//     }

//     alert('Регистрация успешна 🎉');
//     form.reset(); // 🔥 сброс формы
//   } 
// //   catch (err) {
// //     console.error(err);
// //   } 
//   finally {
//     isSubmitting = false;
//     btn.disabled = false;
//   }
// });
