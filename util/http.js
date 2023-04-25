import axios from "axios";
const URL = "https://sendit-demo-default-rtdb.firebaseio.com";

export async function storeTransactions(transactionData) {
  const response = await axios.post(
    `${URL}/transactions.json`,
    transactionData
  );
  console.log(response.data);
  const id = response.data.name;
  return id;
}

export async function fetchTransactions() {
  const response = await axios.get(`${URL}/transactions.json`);
  console.log(response.data);

  let transaction = [];
  for (const key in response.data) {
    const transactionObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
      name: response.data[key].name,
      accountId: response.data[key].accountId,
    };
    transaction.push(transactionObj);
  }
  return transaction;
}

export function updateTransactions(id, transactionData) {
  return axios.put(`${URL}/transactions/${id}.json`, transactionData);
}

export function deleteTransactions(id) {
  return axios.delete(`${URL}/transactions/${id}.json`);
}
