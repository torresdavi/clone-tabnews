const calculadora = require("../models/calculadora.js");

test("Espero que 1 seja 1", () => {
  expect(1).toBe(1);
});

test("Somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("Somar 16 + 8 deveria retornar 24", () => {
  const resultado = calculadora.somar(16, 8);
  expect(resultado).toBe(24);
});

test("Somar 5 + 100 deveria retornar 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("Somar 'banana' + 100 deveria retornar 'Erro!'", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro!");
});
