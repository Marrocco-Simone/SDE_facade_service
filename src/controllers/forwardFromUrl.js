const { default: fetch } = require("node-fetch");

function forwardFromUrl(url) {
  return async function (req, res) {
    try {
      const { method, body, token } = req;
      const headers = token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : null;

      const response = await fetch(url, {
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
