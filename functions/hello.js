const items= [
    {id:1,name:"gan"},
    {id:2,name:"minji"},
    {id:3,name:"troy"},
    {id:4,name:"kaho"},
]


exports.handler = async function (event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  };