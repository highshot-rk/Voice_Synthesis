export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.data) {
        return { 'Authorization': user.data.id };
    } else {
        return {};
    }
}