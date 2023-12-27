const axios = require("axios");

const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InU4eUdqd2p3VDV6SmZDVFBEQTVaTSJ9.eyJpc3MiOiJodHRwczovL2Rldi1zM3BjczFvdm9nNDY0YmF5LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMzYxNDQ1NzUyMTA2NTgyMjA4NSIsImF1ZCI6Imh0dHBzOi8vd3d3LnByb3RlY3RBUEkuY29tIiwiaWF0IjoxNzAzNjM4MTAzLCJleHAiOjE3MDM3MjQ1MDMsImF6cCI6IlYxbU9kMUtWNjBXbU1CZEg5TGd3OHZXV0NFSDdrb0RZIiwic2NvcGUiOiJhZG1pbjplZGl0IiwicGVybWlzc2lvbnMiOlsiYWRtaW46ZWRpdCJdfQ.YU7SqfOZeSqb10TSAzMTLI_esAD_ZK4Y3Q637mvI31q9l0drzUXobMnVpugYhVkSQYHjY2P-yJwc90_lpUnfYMckiWMbfJgr0x5fYlc0ZFr_3P1vICaKNCPwRO0yQx_C1ZQ1Ji55kMx-ovjc-D_iips9pANtt2jUguurspw4rW06kbmDjCg1J_BBnSDcKcCEodcfSJZv_1latbcYzHZAEn8aLZT_zgmJVOoGm0NRw95lWYguhIpT36LpvLbvRt8H1G2q7NeLYABYE-RVEXjaYuFbSXmlxifo4AcRQLXncE-CdlirCvTYNXCm5RO5sk_dyBz2q98B00Fkl-gpj9Vl3A';

const config = {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
};

axios.get('https://dev-s3pcs1ovog464bay.us.auth0.com/userinfo', config)
  .then(response => console.log(response.data))
  .catch(error => console.error('Error al obtener información del usuario:', error));
