function validerExpression(expression) {
    const regex = /^[\d\+\-\*/\^\(\)\.\s]+$/;
    return regex.test(expression);
  }

  function calculer() {
    const inputCalc = document.getElementById('inputCalc');
    const resultat = document.getElementById('resultat');
  
    const expression = inputCalc.value;
  
    if (!parenthesesEquilibrees(expression)) {
      resultat.textContent = "Erreur : Les parenthèses ne sont pas équilibrées.";
      return;
    }
  
    if (!validerExpression(expression)) {
      resultat.textContent = "Erreur : L'expression contient des caractères non-autorisés.";
      return;
    }
  
    try {
      const valeur = evaluerExpression(expression);
      resultat.textContent = `Résultat : ${valeur}`;
    } catch (error) {
      resultat.textContent = `Erreur : ${error.message}`;
    }
  }
  
  

  function evaluerExpression(expression) {
    const expr = expression.replace(/\s+/g, '');
    const exprAvecMultiplications = expr.replace(/(\d)\(/g, '$1*('); 
    const exprAvecMultiplicationsEtNegatifs = exprAvecMultiplications.replace(/\((-\d)/g, '(0$1');
    const tokens = exprAvecMultiplicationsEtNegatifs.split(/([\+\-\*/\^\(\)])/).filter(t => t.length > 0);
    return evaluerTokens(tokens);
}

function parenthesesEquilibrees(expression) {
    const parenthesesOuvrantes = (expression.match(/\(/g) || []).length;
    const parenthesesFermantes = (expression.match(/\)/g) || []).length;
    return parenthesesOuvrantes === parenthesesFermantes;
  }
  

function evaluerTokens(tokens) {
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '^': (a, b) => Math.pow(a, b),
    };
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3,
    };

    const output = [];
    const opStack = [];

    tokens.forEach(token => {
        if (token.match(/\d/)) {
            output.push(parseFloat(token));
        } else if (token.match(/[\+\-\*/\^]/)) {
            while (opStack.length > 0 && precedence[opStack[opStack.length - 1]] >= precedence[token]) {
                const op = opStack.pop();
                const b = output.pop();
                const a = output.pop();
                output.push(ops[op](a, b));
            }
            opStack.push(token);
        } else if (token === '(') {
            opStack.push(token);
        } else if (token === ')') {
            let op = opStack.pop();
            while (op !== '(') {
                const b = output.pop();
                const a = output.pop();
                output.push(ops[op](a, b));
                op = opStack.pop();
            }
        }
    });

    while (opStack.length > 0) {
        const op = opStack.pop();
        const b = output.pop();
        const a = output.pop();
        output.push(ops[op](a, b));
    }

    return output[0];
}
