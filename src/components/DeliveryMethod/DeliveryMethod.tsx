import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './DeliveryMethod.module.scss';
import { shippingCost } from '../../util/db';
import { RootState } from '../../store/store';
import { uiActions } from '../../store/ui-slice';

interface PropsType {
  totalSum: number;
  setDeliveryMehtod?: React.Dispatch<
    React.SetStateAction<{ name: string; price: number }>
  >;
}

interface ShippingType {
  name: string;
  price: number;
  option: number;
}

const DeliveryMethod = ({ totalSum, setDeliveryMehtod }: PropsType) => {
  const dispatch = useDispatch();
  const selectedMethod = useSelector(
    (state: RootState) => state.ui.deliveryMethod
  );

  const ShippingMethodTable: ShippingType[] = shippingCost;

  const [deliveryCost, setDeliveryCost] = useState(
    ShippingMethodTable[selectedMethod].price || 0
  );

  const handleDeliveryOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiActions.selectDeliveryMethod(Number(e.target.value)));
  };
  useEffect(() => {
    setDeliveryCost(shippingCost[selectedMethod].price);
    if (setDeliveryMehtod) {
      setDeliveryMehtod({
        name: shippingCost[selectedMethod].name,
        price: shippingCost[selectedMethod].price,
      });
    }
  }, [ShippingMethodTable, selectedMethod, setDeliveryMehtod]);
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
                        checked={selectedMethod === method.option}
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
