function status(request, response) {
  response.status(200).json({ eu: "sou o máximo", voce: "não é o máximo" });
}

export default status;
