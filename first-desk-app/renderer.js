async function ping() {
  return await window.api.ping();
}

async function username() {
  return await window.api.username();
}

function displayResult(elementBox, result) {
  if (result) {
    elementBox.innerHTML += `<p><b>Server</b>: ${result}<p>`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const resultBox = document.querySelector("#result");
  const btnPing = document.querySelector("#ping");
  const btnShowName = document.querySelector("#showName");
  const btnChangeName = document.querySelector("#changeName");
  const btnClear = document.querySelector("#clear");

  btnClear.addEventListener("click", () => {
    resultBox.innerHTML = "";
  });

  btnPing.addEventListener("click", async () => {
    displayResult(resultBox, await ping());
  });

  btnShowName.addEventListener("click", async () => {
    displayResult(resultBox, await username());
  });

  btnChangeName.addEventListener("click", async () => {
    const name = "Mark Zukernberg";
    displayResult(resultBox, await window.api.changeName(name));
  });
});
