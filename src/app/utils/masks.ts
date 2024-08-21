export const priceValueMask = (value: string) => {
  if (!value) return "";

  //   se a string n tiver , ou . colocar .00
  // /[^\d.]/g pega somente numeros e pontos

  return value.replace(/[^0-9.]+|(?<=\..*)\./g, "").replace(/(\d+?)/, "R$ $1");
};

export const onlyNumbers = (value: string) => {
  if (!value) return "";

  return value.replace(/[\D]/g, "");
};

export const priceMask = (e: string) => {
  // let inputValue = e.replace(/\D/g, ""); // Remove tudo que não é dígito
  // inputValue = (+inputValue / 100).toFixed(2); // Formata para duas casas decimais
  // inputValue = inputValue.replace(".", ","); // Substitui o ponto por vírgula
  // inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona os separadores de milhar
  // setValue('R$ ' + inputValue); // Adiciona o prefixo de moeda

  //////////////////////////

  let inputValue = e.replace(/[^\d,-]/g, ""); // Remove tudo que não é dígito, vírgula ou hífen
  let isNegative = inputValue.includes("-"); // Verifica se o valor é negativo
  inputValue = inputValue.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  if (inputValue) {
    inputValue = (parseFloat(inputValue) / 100).toFixed(2); // Formata para duas casas decimais
    inputValue = inputValue.replace(".", ","); // Substitui o ponto por vírgula
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Adiciona os separadores de milhar
  }

  if (isNegative && inputValue !== "0,00") {
    inputValue = "-" + inputValue; // Adiciona o sinal de negativo se aplicável
  }

  return `R$ ${inputValue}`;
};
// const saleValueValue = watch("saleValue");

// useEffect(() => {
//     setValue("costValue", costValueMask(costValueValue));
//     setValue("profitMargin", profitMarginMask(profitMarginValue));
//     setValue("saleValue", saleValueMask(saleValueValue));
//     setValue("stockMin", stockMinMask(stockMinValue));
//     setValue("stockMax", stockMaxMask(stockMaxValue));
//   }, [
//     costValueValue,
//     profitMarginValue,
//     saleValueValue,
//     stockMinValue,
//     stockMaxValue,
//   ]);

const correctNum = (num: string) => {
  // console.log(values);
  let numSale = num.split(" ")[1];
  const dotTrue = numSale.includes(".");
  let cents;
  if (dotTrue) cents = numSale.split(".")[1].length;

  if (!dotTrue) {
    numSale = `${numSale}.00`;
  } else if (cents == 1) {
    numSale = `${numSale}0`;
  } else if (cents == 0) {
    numSale = `${numSale}00`;
  }
  return numSale;
};
