const { validerExpression, evaluerExpression } = require('./calculatrice');

describe('validerExpression', () => {
  test('Doit accepter les caractères valides', () => {
    const expression = '12 + 3.5 * (7 - 2) / 2 ^ 3';
    expect(validerExpression(expression)).toBe(true);
  });

  test('Doit refuser les caractères non-valides', () => {
    const expression = "12 + 3 * (7 - 2) / 2 ^ 3; a='test'";
    expect(validerExpression(expression)).toBe(false);
  });
});

describe('evaluerExpression', () => {
  test('Doit calculer les expressions correctement', () => {
    const expression = '12 + 3.5 * (7 - 2) / 2 ^ 3';
    expect(evaluerExpression(expression)).toBeCloseTo(12.34375);
  });

  test('Doit lancer une exception pour une expression invalide', () => {
    const expression = '12 + 3.5 * (7 - 2 / 2 ^ 3';
    expect(() => evaluerExpression(expression)).toThrow();
  });
});

describe('parenthesesEquilibrees', () => {
    test('Doit retourner true pour une expression avec des parenthèses équilibrées', () => {
      const expression = '(3*2)+(4-2)';
      expect(parenthesesEquilibrees(expression)).toBe(true);
    });
  
    test('Doit retourner false pour une expression avec des parenthèses non équilibrées', () => {
      const expression = '(3*2)+(4-2))))';
      expect(parenthesesEquilibrees(expression)).toBe(false);
    });
  });