
/*
  This function is run when a GraphQL Query is made requesting your
  custom field name. The return value of this function is used to
  populate the resolver generated from your Payload Type.

  This function expects the following input object:

  {
    "type": "object",
    "title": "MyCustomResolverInput",
    "properties": {
      "name": {
        "type": "string"
      }
    },
    "required": ["name"]
  }

  And the following payload object:

  {
    "type": "object",
    "title": "MyCustomResolverResult",
    "properties": {
      "hello": {
        "type": "string"
      }
    }
  }
*/

exports = async () => {
  const cluster = context.services.get("mongodb-atlas");
  const transactions = cluster.db("sample_analytics").collection("transactions");
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
