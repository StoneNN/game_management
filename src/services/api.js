import axios from 'axios'

export async function queryMatches(params) { console.log(params)
    return axios.post('/api/match',params).then(function(response){
        return response.data;
    })
  }