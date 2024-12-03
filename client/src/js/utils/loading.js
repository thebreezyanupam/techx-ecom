export const showLoading = () => {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.remove('hidden');
};

export const hideLoading = () => {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
};

export const showError = () => {
    const error = document.getElementById('error');
    if (error) error.classList.remove('hidden');
};

export const hideError = () => {
    const error = document.getElementById('error');
    if (error) error.classList.add('hidden');
}; 