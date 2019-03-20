function capitalizeName(req, res, next) {
  // Need this part for both the put and post, so I figured why not add it here,rather than write it twice.
  // If the body doesn't have a name property, send status 400 with and error message
  if (!req.body.name) {
    // return, don't run next middleware
    return res.status(400).json({
      error:
        "Please make sure you include the name of the user you want to add."
    });
  }
  req.body.name = req.body.name
    .split(" ")
    .map(el => el.replace(el[0], el[0].toUpperCase()))
    .join(" ");
  next();
}

module.exports = capitalizeName;
