const fs = require('fs');
function decodeValue(base, value) {
  return parseInt(value, base);
}

function lagrangeInterpolation(points) {
  let constantTerm = 0;

  for (let i = 0; i < points.length; i++) {
    let xi = points[i][0];
    let yi = points[i][1];
    let li = 1;

    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        li *= -points[j][0] / (xi - points[j][0]);
      }
    }

    constantTerm += li * yi;
  }

  return Math.round(constantTerm);
}

function findSecret(jsonFile) {

  const jsonData = fs.readFileSync(jsonFile, 'utf-8');
  const data = JSON.parse(jsonData);

  const points = [];
  const n = data.keys.n;
  const k = data.keys.k;

  for (let i = 1; i <= n; i++) {
    const key = i.toString();  
    if (data[key]) {
      const base = parseInt(data[key].base);
      const value = data[key].value;

      const decodedY = decodeValue(base, value);

      points.push([i, decodedY]);
    } else {
      console.error(`Key ${key} is missing in the data.`);
    }
  }

  const secret = lagrangeInterpolation(points.slice(0, k)); 
  return secret;
}

const secret1 = findSecret('testcase1.json'); 
const secret2 = findSecret('testcase2.json'); 

console.log('Secret for Test Case 1:', secret1);
console.log('Secret for Test Case 2:', secret2);
