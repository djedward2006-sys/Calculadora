        // Path Params
        function sumarPathParams() {
            const num1 = document.getElementById("num1").value;
            const num2 = document.getElementById("num2").value;

            fetch(`http://localhost:3001/sumar/${num1}/${num2}`)
                .then(res => res.json())
                .then(data => document.getElementById("resultado").textContent = data.resultado)
                .catch(error => console.error(error));
        }

        // Body Params
        function sumarBodyParams() {
            const num1 = document.getElementById("num1").value;
            const num2 = document.getElementById("num2").value;

            fetch("http://localhost:3001/sumar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ num1, num2 })
            })
                .then(res => res.json())
                .then(data => document.getElementById("resultado").textContent = data.resultado)
                .catch(error => console.error(error));
        }

        // Query Params
        function sumarQueryParams() {
            const num1 = document.getElementById("num1").value;
            const num2 = document.getElementById("num2").value;

            fetch(`http://localhost:3001/sumar?num1=${num1}&num2=${num2}`)
                .then(res => res.json())
                .then(data => document.getElementById("resultado").textContent = data.resultado)
                .catch(error => console.error(error));
        }
    