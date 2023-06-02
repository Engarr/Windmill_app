import { useState, useEffect } from 'react';
import classes from './DeliveryMethod.module.scss';
import { shippingCost } from '../../util/db';

interface PropsType {
  totalSum: number;
}

interface ShippingType {
  name: string;
  price: number;
  option: number;
}

const DeliveryMethod = ({ totalSum }: PropsType) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const ShippingMethodTable: ShippingType[] = shippingCost;

  const [deliveryCost, setDeliveryCost] = useState(
    ShippingMethodTable[selectedOption].price || 0
  );

  const handleDeliveryOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(e.target.value));
  };
  useEffect(() => {
    setDeliveryCost(shippingCost[selectedOption].price);
  }, [selectedOption]);
  return (
    <div className={classes.summary__container}>
      <div>
        <h4>Podsumowanie:</h4>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Koszt produktów:</td>
            <td>{totalSum.toFixed(2)}zł</td>
          </tr>
          <tr>
            <td>Wybierz formę dostawy:</td>
            <td>
              <label>
                {ShippingMethodTable.map((method) => (
                  <li key={method.option}>
                    <div>
                      <input
                        type="radio"
                        id={method.name}
                        name={method.name}
                        value={method.option}
                        checked={selectedOption === method.option}
                        onChange={handleDeliveryOption}
                      />
                      <label htmlFor={method.name}>{method.name}</label>
                      <p>
                        <span>{method.price} zł</span>
                      </p>
                    </div>
                  </li>
                ))}
              </label>
            </td>
          </tr>
          <tr>
            <td>Łączny koszt:</td>
            <td>{(totalSum + deliveryCost).toFixed(2)} zł</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryMethod;
