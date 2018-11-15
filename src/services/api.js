import axios from 'axios'

export async function queryMatches(params) { 
    console.log('------ Sevice_params ------',params)
    return axios.post('/api/match',params)
            .then(function(response){
                console.log('------ Sevice_response ------',response);
                return response.data;
            })
  }