document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const errorElement = document.getElementById("error");
    errorElement.style.display = "none";

    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;

    const submitBtn = document.querySelector(".btn-submit");
    const btnText = document.querySelector(".btn-text");
    const originalText = btnText.textContent;

    submitBtn.disabled = true;
    btnText.textContent = "Entrando...";
    submitBtn.style.opacity = "0.7";

    try {
        const response = await fetch("/auth", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password: pw })
        });

        if (response.ok) {
            btnText.textContent = "Sucesso!";
            submitBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 500);
        } else {
            errorElement.style.display = "flex";

            submitBtn.disabled = false;
            btnText.textContent = originalText;
            submitBtn.style.opacity = "1";

            const inputs = document.querySelectorAll("input");
            inputs.forEach(input => {
                input.style.animation = "none";
                setTimeout(() => {
                    input.style.animation = "shake 0.5s";
                }, 10);
            });
        }
    } catch (error) {
        console.error("Erro na autenticação:", error);
        errorElement.textContent = "Erro de conexão. Tente novamente.";
        errorElement.style.display = "flex";

        submitBtn.disabled = false;
        btnText.textContent = originalText;
        submitBtn.style.opacity = "1";
    }
});