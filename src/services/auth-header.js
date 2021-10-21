export default function authHeader() {
    let access_token = localStorage.getItem('access_token');
    let token_type = localStorage.getItem('token_type');

    if (access_token && token_type == 'bearer') {
      return { 'Authorization': 'Bearer ' + access_token };
    } else {
      return {};
    }
}
