document.addEventListener("DOMContentLoaded", function () {
    const chainNameInput = document.getElementById("chainName");
    const suggestions = document.getElementById("suggestions");
    let chainNames = [];

    // Fetch chain names from the text file
    fetch("chainnames.txt")
        .then((response) => response.text())
        .then((data) => {
            chainNames = data.split("\n").map((name) => name.trim());
        })
        .catch((error) => console.error("Error loading chain names:", error));

    // Filter and display suggestions as the user types
    chainNameInput.addEventListener("input", function () {
        const query = chainNameInput.value.toLowerCase();
        suggestions.innerHTML = ""; // Clear previous suggestions

        if (query) {
            const filteredNames = chainNames.filter((name) =>
                name.toLowerCase().startsWith(query)
            );

            if (filteredNames.length > 0) {
                filteredNames.forEach((name) => {
                    const li = document.createElement("li");
                    li.textContent = name;
                    li.addEventListener("click", function () {
                        chainNameInput.value = name; // Set input value to selected name
                        suggestions.innerHTML = ""; // Clear suggestions
                        suggestions.style.display = "none"; // Hide dropdown
                    });
                    suggestions.appendChild(li);
                });
                suggestions.style.display = "block"; // Show dropdown
            } else {
                suggestions.style.display = "none"; // Hide dropdown if no matches
            }
        } else {
            suggestions.style.display = "none"; // Hide dropdown if input is empty
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!suggestions.contains(event.target) && event.target !== chainNameInput) {
            suggestions.style.display = "none";
        }
    });
});
