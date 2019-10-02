var axios = require('axios')

exports.listForms = function(access_token, page_number, page_size){
  var options = {
    url: "https://api.typeform.com/forms",
    method: "GET",
    headers: {
      "Authorization": 'Bearer ' + access_token
    },
    params: {
      page: page_number || 1,
      page_size: page_size || 10
    }
  }

  return axios(options)
    .then(function (parsedBody) {
      return parsedBody.data.items;
    })
    .catch(function (err) {
      console.log('err', err)
    });
}

exports.getFormDef = function(form_id){
  var options = {
    url: "https://api.typeform.com/forms/"+form_id,
    method: "GET"
  }

  return axios(options)
    .then(function (parsedBody) {
      return parsedBody.data;
    })
    .catch(function (err) {
      console.log('err', err)
    });
}

exports.updateForm = function(access_token, form_id, form_def) {
  var options = {
    url: "https://api.typeform.com/forms/"+form_id,
    method: "PUT",
    headers: {
      "Authorization": 'Bearer ' + access_token
    },
    data: JSON.stringify(form_def)
  }

  return axios(options)
    .then(function (parsedBody) {
      return parsedBody.data;
    })
    .catch(function (err) {
      console.log('error')
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    });

}
