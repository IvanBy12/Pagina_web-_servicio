document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.getElementById("add-btn");
    const entity1Input = document.getElementById("entity1");
    const entity2Input = document.getElementById("entity2");
    const dataTable = document.querySelector("#data-table tbody");
    const clearBtn = document.getElementById("clear-btn");

   
    for (let i = 0; i < localStorage.length; i++) {
        const data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        addRowToTable(data.entity1, data.entity2);
    }

    addBtn.addEventListener("click", function() {
        const entity1Value = entity1Input.value.trim();
        const entity2Value = entity2Input.value.trim();

        if (entity1Value === "" || entity2Value === "") {
            alert("Por favor, completa ambos campos.");
            return;
        }


        const data = { entity1: entity1Value, entity2: entity2Value };
        localStorage.setItem(entity1Value, JSON.stringify(data));

        addRowToTable(entity1Value, entity2Value);

        entity1Input.value = "";
        entity2Input.value = "";
    });

    clearBtn.addEventListener("click", function() {
        if (confirm("Esta seguro de que quiere borrar todos los datos de la tabla?")) {
            localStorage.clear();
            dataTable.innerHTML = ""; 
        }
    });

    function addRowToTable(entity1Value, entity2Value) {
        const newRow = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");

        cell1.innerHTML = entity1Value;
        cell2.innerHTML = entity2Value;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Eliminar";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", function() {
            dataTable.removeChild(newRow);
            localStorage.removeItem(entity1Value);
        });

        cell3.appendChild(deleteBtn);
        newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        dataTable.appendChild(newRow);
    }
});




