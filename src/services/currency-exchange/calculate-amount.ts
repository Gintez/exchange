interface AmountCalculate {
  amount: number;
  exchangeRate: number;
}

function calculateAmount(amount: number, calculation: number) {
  return typeof amount === 'number' ? Math.floor(calculation * 100) / 100 : null;
}

export const calculateBuyAmount = ({ amount, exchangeRate }: AmountCalculate) =>
  calculateAmount(amount, amount * exchangeRate);

export const calculateSellAmount = ({
  amount,
  exchangeRate,
}: AmountCalculate) => calculateAmount(amount, amount / exchangeRate);
