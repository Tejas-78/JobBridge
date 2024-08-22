document.addEventListener('DOMContentLoaded', function() {
    const animatedText = document.querySelector('.animated-text');
    const text = animatedText.textContent;
    animatedText.innerHTML = text.split('').map(char => `<span>${char === ' ' ? '&nbsp;' : char}</span>`).join('');
  });
/// delete job
document.addEventListener("DOMContentLoaded", () => {
  const deleteBtn = document.getElementById("deleteBtn");
  const confirmPopup = document.getElementById("confirmPopup");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

  deleteBtn.addEventListener("click", () => {
    confirmPopup.style.display = "block";
  });

  confirmDeleteBtn.addEventListener("click", () => {
    
    console.log("Job deleted");
    confirmPopup.style.display = "none";
    
  });

  cancelDeleteBtn.addEventListener("click", () => {
    confirmPopup.style.display = "none";
  });
});

