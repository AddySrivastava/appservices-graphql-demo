exports = async () => {
  const cluster = context.services.get("mongodb-atlas");
  const transactions = cluster.db("sample_analytics").collection("transactions");
  console.log("coming from github webhook");
  const totalTransactions = await transactions.aggregate([
    {
        '$unwind': {
            'path': '$transactions'
        }
    }, {
        '$group': {
            '_id': '$transactions.symbol', 
            'sum': {
                '$sum': '$transactions.amount'
            }
        }
    }
]).toArray();

return totalTransactions;
  
};
