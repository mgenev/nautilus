module.exports = {
  // Will be translated to get("/people/custom") (subsections automatically appended)
  get_custom: function (req, res) {
    res.send("A custom post");
  }
}
