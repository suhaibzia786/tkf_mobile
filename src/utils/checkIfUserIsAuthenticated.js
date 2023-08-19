export const checkIfUserIsAuthenticated = () => {
    return !!localStorage.getItem('user');
}
