import request from 'umi-request';
import axios from 'axios';

const config = {     
  headers: { 'content-type': 'multipart/form-data' }
}

axios.post('http://localhost:4000/users/add', data, config)
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
