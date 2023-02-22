const { default: fetch } = require("node-fetch");

function forwardFromUrl(url, paramIdName) {
  return async function (req, res) {
    // modify the static param id with the actual one
    const paramId = req.params[paramIdName];
    const newurl = paramId ? url.replace(`:${paramIdName}`, paramId) : url;
    console.log(`Called redirect to ${newurl}`);

    try {
      const method = req.method;
      const token = req.token;
      const body =
        req.body && Object.keys(req.body).length !== 0
          ? JSON.stringify(req.body)
          : null;
      const headers = {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      };

      const response = await fetch(newurl, {
        method,
        headers,
        body,
      });

      const response_json = await response.json();

      res.status(response.status).send(response_json);
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  };
}

module.exports = { forwardFromUrl };
