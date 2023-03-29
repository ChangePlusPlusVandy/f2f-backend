// async function checkEmailSF(conn, email) {
//   let isEmail = "FAILURE";
//   await conn.query("SELECT Email FROM Contact", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       result.records.forEach((account) => {
//         if (account.Email === email) {
//           console.log(account.Email);
//           isEmail = 'SUCCESS';
//         }
//       });
//     }
//   });

//   return isEmail;
// }

// module.exports = {checkEmailSF}
