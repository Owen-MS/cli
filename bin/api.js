#!/usr/bin/env node
import axios from "axios";

axios.interceptors.response.use(res => {
  return res.data;
})

export async function getRepo() {
  // return axios.get('https://api.github.com/orgs/zhurong-cli/repos').then(data => {
  return axios.get('https://api.github.com/Owen-MS/cli/repos').then(data => {
    console.log(1111, data);
  }).catch((error) => {
    console.log(2222, error);
  });
}

export async function getTagsByRepo(repo) {
  return [
    {
      name: 'v1'
    }, {
      name: 'V2'
    }
  ]
  // return await axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
}