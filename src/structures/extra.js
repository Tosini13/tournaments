export const setBackBtn = (func) => {
    const btnBack = document.getElementsByClassName('btn-back')[0];
    if (btnBack) {
        if (func) {
            btnBack.onclick = func;
            btnBack.classList.add('btn-back-show');
        } else {
            btnBack.classList.remove('btn-back-show');
        }
    }
} 