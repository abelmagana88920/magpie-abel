import postData from "../helpers/postData";

const magpie = {};

const errorObj = obj => {
  return { code: obj.code, message: obj.detail };
};

magpie.createToken = data => {
  const postUrl = "https://api.magpie.im/v1/tokens";

  return new Promise((resolve, reject) => {
    if (!data) {
      reject(errorObj("no_data", "No data provided"));
      return;
    }

    postData(postUrl, data, "public").then(result => {
      if (result.status === "error") reject(errorObj(result.data.errors[0]));

      resolve(result.data);
    });
  });
};

magpie.createPayment = data => {
  const postUrl = "https://api.magpie.im/v1/charges";

  return new Promise((resolve, reject) => {
    if (!data) {
      reject(errorObj("no_token", "No data provided"));
      return;
    }

    postData(postUrl, data, "secret").then(result => {
      if (result.status === "error") reject(errorObj(result.data.errors[0]));

      resolve(result.data);
    });
  });
};

export default magpie;
